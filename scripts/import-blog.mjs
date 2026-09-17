// One-time content import. Production builds consume content/blog.json and need no React dependencies.
import { createServer } from '../nmit-design-2/node_modules/vite/dist/node/index.js';
import React from '../nmit-design-2/node_modules/react/index.js';
import { renderToStaticMarkup } from '../nmit-design-2/node_modules/react-dom/server.node.js';
import { StaticRouter } from '../nmit-design-2/node_modules/react-router/dist/development/index.mjs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('nmit-design-2');
const server = await createServer({ root, configFile:false, server:{middlewareMode:true,hmr:false}, appType:'custom' });
const components = {
  monitoring:'IntegrationMonitoring', handover:'IntegrationHandover', modernization:'LegacyModernization',
  'payment-testing':'PaymentApiTesting', 'hybrid-migration':'HybridCloudMigration', 'integration-cost':'ApiIntegrationCost',
  'integration-patterns':'IntegrationPatterns', 'erp-crm':'ErpCrmIntegration', 'legacy-integration':'LegacySystemIntegration',
  'payment-integration':'PaymentApiIntegration',
};
try {
  const { posts } = await server.ssrLoadModule('/src/data/posts.ts');
  const output=[];
  const images=[];
  for (const post of posts) {
    const name=components[post.contentKey];
    const module=await server.ssrLoadModule(`/src/content/${name}.tsx`);
    const html=renderToStaticMarkup(React.createElement(StaticRouter,{location:`/blog/${post.slug}`},React.createElement(module[name])));
    output.push({...post,html});
    for (const img of html.matchAll(/<img\b[^>]*src="(\/images\/articles\/[^\"]+)-1536.webp"[^>]*alt="([^\"]*)"/g)) images.push({path:img[1],alt:img[2],post:post.slug});
  }
  await mkdir('content',{recursive:true});
  await writeFile('content/blog.json',JSON.stringify(output,null,2)+'\n');
  await writeFile('content/blog-images.json',JSON.stringify(images,null,2)+'\n');
  await mkdir('content/blog-source',{recursive:true});
  for (const name of [...Object.values(components),'ArticleGuide']) await writeFile(`content/blog-source/${name}.tsx`,await readFile(`${root}/src/content/${name}.tsx`));
  await writeFile('content/blog-source/posts.ts',await readFile(`${root}/src/data/posts.ts`));
  await writeFile('content/blog-source/Blog.tsx',await readFile(`${root}/src/pages/Blog.tsx`));
  console.log(`Imported ${output.length} complete articles and ${images.length} image slots.`);
} finally { await server.close(); }

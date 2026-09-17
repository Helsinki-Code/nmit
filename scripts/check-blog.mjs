import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { posts } from './blog.mjs';
const slots=JSON.parse(await readFile('content/blog-images.json','utf8'));
assert.equal(posts.length,10);
assert.equal(slots.length,30);
// Image and link changes are allowed; visible article text must remain the source text.
const text=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
let sections=0, anchors=0;
for(const post of posts){
 const html=await readFile(`site/blog/${post.slug}/index.html`,'utf8');
 const article=html.match(/<article class="architecture-article">[\s\S]*?<\/article>/)?.[0];
 assert(article,`${post.slug}: full article`);
 assert.equal(text(article),text(post.html),`${post.slug}: exact source article text`);
 for(const id of [...post.html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1])) { assert(article.includes(`id="${id}"`)); sections++; }
 const figures=[...article.matchAll(/<img\b[^>]*src="(\/images\/articles\/[^\"]+)"[^>]*>/g)];
 assert.equal(figures.length,3,`${post.slug}: cover and two inline images`);
 for(const m of figures){ assert((await stat('site'+m[1])).size>10000,`${post.slug}: real image`); assert(/alt="[^"]{20,}"/.test(m[0]),`${post.slug}: descriptive alt`); }
 for(const m of article.matchAll(/href="(\/blog\/[^\"#]+)#([^\"]+)"/g)){
  const target=await readFile(`site${m[1]}/index.html`,'utf8');assert(target.includes(`id="${m[2]}"`),`Broken cross-article anchor ${m[1]}#${m[2]}`);anchors++;
 }
 assert(html.includes('"@type":"BlogPosting"'),`${post.slug}: article schema`);
 assert(html.includes(`property="og:image" content="https://nmit-solutions.com${post.featuredImage.replace('-768.webp','.png')}"`));
}
console.log(`PASS: 10 exact source articles, ${sections} sections, 30 new image slots, ${anchors} cross-article anchors, article metadata.`);

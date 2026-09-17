// Optional asset preparation; production builds use the committed derivatives.
// Pass the path to an installed sharp entry point as the only argument.
import { readFile, stat, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
if (!process.argv[2]) throw new Error('Usage: node scripts/optimize-blog-images.mjs /absolute/path/to/sharp/lib/index.js');
const { default:sharp } = await import(pathToFileURL(path.resolve(process.argv[2])));
const slots=JSON.parse(await readFile('content/blog-images.json','utf8'));
let original=0, optimized=0;
for(const slot of slots){
 const base='site'+slot.path;
 original+=(await stat(base+'.png')).size;
 await sharp(base+'.png').resize({width:1536,withoutEnlargement:true}).webp({quality:86}).toFile(base+'-1536.webp');
 await sharp(base+'.png').resize({width:768,withoutEnlargement:true}).webp({quality:83}).toFile(base+'-768.webp');
 optimized+=(await stat(base+'-1536.webp')).size;
}
await sharp('site/assets/nodi/character-sheet.png').webp({lossless:true}).toFile('site/assets/nodi/character-sheet.webp');
await writeFile('website-review/nodi/image-optimization.json',JSON.stringify({images:slots.length,sourceBytes:original,fullWidthWebpBytes:optimized,reductionPercent:Math.round((1-optimized/original)*100),note:'Original generated PNGs retained; WebP derivatives preserve composition and alpha.'},null,2)+'\n');
console.log(`Prepared ${slots.length*2} responsive article images; ${Math.round((1-optimized/original)*100)}% smaller at full width.`);

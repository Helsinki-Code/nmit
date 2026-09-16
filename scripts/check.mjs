import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('site');
const routes=JSON.parse(await readFile('website-review/build-routes.json','utf8'));
let links=0;
const titles=new Set();
for(const route of routes){
 const html=await readFile(path.join(root,route,'index.html'),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: one primary heading`);
 const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`${route}: distinct title`);titles.add(title);
 assert(html.includes('name="description"'),`${route}: description`);
 const ids=Array.from(html.matchAll(/\bid="([^"]+)"/g),m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${route}: unique IDs`);
 assert(!/href="#"|lorem ipsum|coming soon|trusted by|seamless|cutting-edge|world-class|unlock your/i.test(html),`${route}: no placeholder links or filler`);
 for(const match of html.matchAll(/\b(?:href|src)="(\/[^"#]*)"/g)){
  const url=new URL(match[1],'http://localhost');let file=path.join(root,url.pathname);
  const info=await stat(file).catch(()=>null);assert(info,`${route}: missing ${match[1]}`);
  if(info.isDirectory())await stat(path.join(file,'index.html'));links++;
 }
 for(const match of html.matchAll(/<img\b[^>]*>/g))assert(/alt="[^"]+"/.test(match[0]),`${route}: named image`);
}
const luminance=hex=>{const rgb=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const css=await readFile('site/assets/style.css','utf8');
const environments=Array.from(css.matchAll(/:root(?:\[data-theme=dark\])?\{([^}]+)\}/g),m=>Object.fromEntries(Array.from(m[1].matchAll(/--([\w-]+):(#[a-f\d]{6})/gi),v=>[v[1],v[2]])));
const contrastResults=[];
const heroCss=await readFile('site/assets/hero.css','utf8');
const modelEnvironments=Array.from(heroCss.matchAll(/:root(?:\[data-theme=dark\])?\{([^}]+)\}/g),m=>Object.fromEntries(Array.from(m[1].matchAll(/--([\w-]+):(#[a-f\d]{6})/gi),v=>[v[1],v[2]])));
for(const [i,e]of environments.entries()){
 for(const text of ['ink','muted','blue'])for(const background of ['paper','surface','panel','hub','sheet']){
  const ratio=contrast(e[text],e[background]);assert(ratio>=4.5,`${i?'Dark':'Light'} ${text} on ${background}: ${ratio.toFixed(2)}`);contrastResults.push({theme:i?'dark':'light',text,background,ratio:Number(ratio.toFixed(2))});
 }
 assert(contrast(e['button-ink'],e.button)>=4.5,'Button contrast');
 const model=modelEnvironments[i];
 for(const text of ['ink','muted','blue']){
  const ratio=contrast(e[text],model['model-top']);assert(ratio>=4.5,`Model ${text} contrast`);
  contrastResults.push({theme:i?'dark':'light',text,background:'model-top',ratio:Number(ratio.toFixed(2))});
 }
 const coreRatio=contrast(model['model-core-ink'],model['model-core']);assert(coreRatio>=4.5,'Model core contrast');
 contrastResults.push({theme:i?'dark':'light',text:'model-core-ink',background:'model-core',ratio:Number(coreRatio.toFixed(2))});
}
const contact=await readFile('site/contact/index.html','utf8');
for(const id of ['name','email','company','service','message'])assert(contact.includes(`for="${id}"`),`Contact field ${id} is labeled`);
const js=await readFile('site/assets/app.js','utf8');assert(!/fetch\(|XMLHttpRequest/.test(js),'Contact drafts stay on the device');
await import('node:fs/promises').then(fs=>fs.writeFile('website-review/contrast-check.json',JSON.stringify(contrastResults,null,2)));
console.log(`PASS: ${routes.length} pages; ${links} local links/assets; unique titles/headings/IDs; contact labels; ${contrastResults.length+2} AA text/button contrast checks.`);

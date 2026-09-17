import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin='https://nmit-solutions.com';
const routes=JSON.parse(await readFile('website-review/build-routes.json','utf8'));
const sitemap=await readFile('site/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.deepEqual(urls,routes.map(route=>origin+route));
assert.equal(new Set(urls).size,urls.length);
assert(!urls.some(url=>url.includes('404')||url.includes('127.0.0.1')));
for(const match of sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g))await stat('site'+new URL(match[1]).pathname);
const robots=await readFile('site/robots.txt','utf8');
assert(robots.includes('User-agent: *\nAllow: /'));
assert(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
const llms=await readFile('site/llms.txt','utf8');
assert(llms.startsWith('# NMIT Solutions\n\n> '));
for(const match of llms.matchAll(/\]\((https:[^)]+)\)/g)){
 const url=new URL(match[1]);assert.equal(url.origin,origin);
 const file='site'+url.pathname+(url.pathname.endsWith('/')?'index.html':'');await stat(file);
}
for(const route of ['/privacy/','/terms/','/cookies/','/accessibility/','/disclaimer/','/sitemap/'])assert(routes.includes(route));
console.log(`PASS: ${urls.length} canonical sitemap URLs, image entries, robots rules, llms links, and six policy/navigation pages.`);

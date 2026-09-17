import { readFile } from 'node:fs/promises';
export const posts = JSON.parse(await readFile(new URL('../content/blog.json', import.meta.url),'utf8'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const remapLink=href=>href==='/contact/workshop'?'/workshop/':href.startsWith('/contact/')?'/contact/?service='+({api:'api-integration',cloud:'cloud-services'}[href.split('/')[2]]||href.split('/')[2]):href;
const imageAlt=alt=>alt.replace(/two NMIT engineers|NMIT engineers/g,'Nodi, NMIT’s mascot,').replace(/the same two engineers/g,'Nodi').replace(/with engineers/g,'with Nodi').replace(/teal, sage, and amber|teal, amber, and sage/g,'cobalt blue, steel, and brass').replace(/(Nodi, NMIT’s mascot, )([a-z]+) /g,(_,name,verb)=>name+({investigate:'investigates',inspect:'inspects',correlate:'correlates',exchange:'presents',consult:'consults',assign:'assigns',measure:'measures',route:'routes',review:'reviews',check:'checks',discuss:'discusses',compare:'compares',coordinate:'coordinates',isolate:'isolates',disconnect:'disconnects',reconcile:'reconciles'}[verb]||verb)+' ');
export function nodi(pose='explain') {
 const labels={welcome:'welcoming you with an open hand',explain:'pointing out the next step',investigate:'examining evidence with a magnifying lens',plan:'thinking through a checklist',success:'acknowledging a verified result',listen:'listening attentively'};
 return `<span class="nodi-sprite" data-pose="${pose}" role="img" aria-label="Nodi, NMIT’s N-shaped mascot, ${labels[pose]}"></span>`;
}
export function articleBody(post){
 let placement=0;
 const scenes={
  'api-integration-monitoring':{'monitor-outcomes':'explain','monitor-correlation':'investigate','monitor-handover':'plan'},
  'integration-handover-checklist':{'handover-documents':'plan','handover-drill':'investigate','handover-acceptance':'success'},
  'incremental-legacy-modernization':{'strangler-slice':'plan','strangler-routing':'explain','strangler-retire':'investigate'},
  'payment-api-testing-checklist':{'test-environments':'plan','lost-response-tests':'investigate','test-evidence':'explain'},
  'hybrid-cloud-migration-checklist':{'dependency-inventory':'investigate','migration-waves':'plan','migration-gates':'explain'},
  'api-integration-project-cost':{'scope-drivers':'investigate','quote-brief':'plan','proposal-comparison':'explain'},
  'api-vs-event-driven-vs-batch-integration':{'pattern-decision-table':'plan','hybrid-example':'explain','ordering-recovery':'investigate'},
  'erp-crm-integration':{'field-ownership':'plan','conflicting-records':'investigate','sync-operations':'explain'},
  'legacy-system-integration':{'integration-inventory':'plan','failure-handling':'investigate','readiness-checklist':'explain'},
  'partner-payment-apis':{'payment-state':'explain','timeout-example':'investigate','payment-checklist':'plan'}
 };
 return post.html.replace(/<link rel="preload"[^>]*>/g,'')
  .replace(/href="([^\"]*)"/g,(_,href)=>`href="${remapLink(href)}"`)
  .replace(/src="\/brand\/nmit-concept.png"/g,'src="/assets/nmit-logo-reference.png"')
  .replace(/<img[^>]*src="\/images\/characters\/([^\"]+)"[^>]*>/g,'')
  .replace(/(<section id="([^"]+)"[^>]*><h2[^>]*>[\s\S]*?<\/h2>)/g,(_,heading,id)=>{
   const pose=scenes[post.slug]?.[id];
   if(!pose || placement>=3)return heading;
   return heading+`<span class="nodi-scene nodi-article ${placement++%2?'nodi-left':'nodi-right'}" data-nodi-scene>${nodi(pose)}</span>`;
  })
  .replace(/alt="([^\"]*)"/g,(_,alt)=>`alt="${imageAlt(alt).replace(/amber/g,'brass').replace('Nodi, NMIT’s mascot, reviewing','Nodi reviewing').replace('Nodi, NMIT’s mascot, reviews an old module and its remaining dependency before retiring it beside a validated replacement capability.','Nodi reviews a legacy module with one remaining dependency; retirement is blocked despite a validated replacement.')}"`);
}
export function blogIndex(){
 return `<section class="page-heading wrap"><div class="breadcrumb"><a href="/">Home</a><span>/</span><span>Engineering guides</span></div><h1>Engineering guides</h1><p>Practical reading for the systems you connect, the changes you plan, and the workflows you operate.</p></section><aside class="wrap blog-guide">${nodi("explain")}<div><span class="mono">A useful next step</span><h2>Start with the decision in front of you.</h2><p>Planning an integration? Begin with architecture and scope. Operating one? Read the testing, monitoring, and handover guides together.</p><a class="text-link" href="/blog/api-vs-event-driven-vs-batch-integration/">Compare integration patterns →</a></div></aside><section class="wrap blog-list" aria-label="Engineering articles">${posts.map(p=>`<article class="blog-row"><a class="blog-thumbnail" href="/blog/${p.slug}/" tabindex="-1" aria-hidden="true"><img src="${p.featuredImage}" width="1536" height="1024" alt="${esc(imageAlt(p.featuredImageAlt))}" loading="lazy" decoding="async"></a><div><span class="article-category">${esc(p.articleSection)} · <time datetime="${p.publishedAt}">${esc(p.date)}</time></span><h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p><a class="text-link" href="/blog/${p.slug}/">Read the guide →</a></div></article>`).join('')}</section>`;
}

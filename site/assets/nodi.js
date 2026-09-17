const guides = document.querySelectorAll('[data-nodi-scene]');
const visibility = new IntersectionObserver(entries => {
  for (const entry of entries) entry.target.dataset.visible = String(entry.isIntersecting && !document.hidden);
}, { threshold: .2 });
guides.forEach(guide => visibility.observe(guide));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) guides.forEach(guide => { guide.dataset.visible = 'false'; });
  else guides.forEach(guide => { visibility.unobserve(guide); visibility.observe(guide); });
});

// Nodi follows the section being read; no timer switches expressions under the reader.
if (document.querySelector('.article-sidebar')) {
  const sectionObserver = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if (!current) return;
    const id = current.target.id;
    document.querySelectorAll('.article-sidebar a[href^="#"]').forEach(link => {
      if (link.hash === '#'+id) link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin:'-10% 0px -65% 0px' });
  document.querySelectorAll('.article-body > section[id]').forEach(section => sectionObserver.observe(section));
}

const contact = document.querySelector('#enquiry-form');
const contactNodi = document.querySelector('.nodi-form .nodi-sprite');
if (contact && contactNodi) {
  contact.addEventListener('focusin', () => { contactNodi.dataset.pose = 'listen'; });
  contact.addEventListener('submit', () => {
    if (contact.checkValidity()) {
      contactNodi.dataset.pose = 'success';
      contactNodi.setAttribute('aria-label','Nodi gives a thumbs up for your prepared enquiry draft');
    }
  });
}

const faqNodi=document.querySelector('.faq-host .nodi-sprite');
document.querySelectorAll('[data-nodi-answer]').forEach(answer=>{
 answer.addEventListener('toggle',()=>{
  if(!faqNodi)return;
  const open=document.querySelector('[data-nodi-answer][open]');
  faqNodi.dataset.pose=open?'explain':'listen';
  faqNodi.setAttribute('aria-label',open?'Nodi explains the answer to your project question':'Nodi listens to your project questions');
 });
});

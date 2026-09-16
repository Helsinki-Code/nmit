const html = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const preference = window.matchMedia('(prefers-color-scheme: dark)');
function updateThemeButton() {
  if (themeButton) themeButton.setAttribute('aria-label', `Switch to ${html.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
}
themeButton?.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('nmit-theme', html.dataset.theme); } catch {}
  updateThemeButton();
});
preference.addEventListener('change', event => {
  let saved;
  try { saved = localStorage.getItem('nmit-theme'); } catch {}
  if (saved !== 'dark' && saved !== 'light') {
    html.dataset.theme = event.matches ? 'dark' : 'light';
    updateThemeButton();
  }
});
updateThemeButton();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 621px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const diagramNotes = {
  apps: 'APIs connect the applications and data you rely on.',
  cloud: 'Cloud infrastructure gives those applications a foundation.',
  people: 'Technology staffing connects the work with the right skills.',
  delivery: 'DevOps brings development and operations into the same plan.'
};
document.querySelectorAll('.system-node').forEach(node => {
  node.setAttribute('aria-pressed', 'false');
  node.addEventListener('click', () => {
    document.querySelectorAll('.system-node').forEach(n => n.setAttribute('aria-pressed', String(n === node)));
    document.querySelector('.diagram-note').textContent = diagramNotes[node.dataset.focus];
  });
});

const form = document.querySelector('#enquiry-form');
const service = document.querySelector('#service');
if (service) {
  const selected = new URLSearchParams(location.search).get('service');
  if (Array.from(service.options).some(option => option.value === selected)) service.value = selected;
}
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const chosen = service.options[service.selectedIndex].text;
  const body = `Hello NMIT team,\n\nI would like to discuss: ${chosen}\n\n${String(values.get('message')).trim()}\n\nName: ${String(values.get('name')).trim()}\nEmail: ${String(values.get('email')).trim()}\nCompany: ${String(values.get('company')).trim() || 'Not specified'}\n`;
  const subject = `NMIT enquiry: ${chosen}`;
  document.querySelector('#email-draft').value = `To: info@nmit-solutions.com\nSubject: ${subject}\n\n${body}`;
  document.querySelector('#form-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  location.href = `mailto:info@nmit-solutions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.querySelector('#copy-enquiry')?.addEventListener('click', async () => {
  const draft = document.querySelector('#email-draft');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(draft.value);
    status.textContent = 'Copied.';
  } catch {
    draft.focus(); draft.select();
    status.textContent = 'Select and copy the highlighted enquiry.';
  }
});

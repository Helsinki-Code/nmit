# NMIT Solutions website

A responsive, 17-page company site with a custom interactive integration diagram, light and dark themes, individual service pages, company and client information, workshop, careers, insights, and contact.

## Preview

Run `npm run build`, then `npm run dev`. Open http://localhost:4173.

The project uses Node's standard library and has no package dependencies. Generated static files are in `site/`; deploy that directory on a static web host. Clean page URLs map to directories containing `index.html`. The local server binds only to the loopback interface.

## Update

Page templates and content: `scripts/build.mjs`.

Styling and themes: `site/assets/style.css`.

Navigation, interactive diagram, and enquiry drafting: `site/assets/app.js`.

Run `npm run build` after content/template changes. CSS/JavaScript changes are served directly. Run `npm run check` to verify the generated page inventory, internal destinations, headings, metadata, image names, contact labels, and both palettes' body-text/button contrast.

## Content and contact

Source information is documented in `website-review/NMIT-WEBSITE-REVIEW.md`. Expanded service copy and insights are editorial drafts, not independently verified project or vendor claims. The original article topics and archive dates are retained without suggesting that the newly written pages are the original articles. Team figures are qualified as existing-website figures. No vacancies, leadership biographies, case studies, or testimonials are fabricated.

The contact form prepares a `mailto:` draft and a copyable fallback. Visitors must send that email from their email application. The site has no enquiry backend, upload facility, analytics, or payment flow. Connecting a CRM, transactional email, or the old Apps Script requires an agreed backend and corresponding privacy notice updates.

Privacy and website terms describe this build's behavior. They are draft company copy for review before publishing. Canonical URLs, organization metadata, robots.txt, and sitemap.xml target nmit-solutions.com. The public website has not been modified or deployed.

## Design rationale

See `DESIGN.md`. The cool paper and steel palette, ultramarine inherited from the original website, Plex typography, ruled service rows, and off-axis workshop sheet follow the requested no-ai-slop-web-design skill.

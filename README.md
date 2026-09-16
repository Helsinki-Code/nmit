# NMIT Solutions website

A responsive, 17-page company site with an interactive 3D service assembly, animated hero headline, light and dark themes, individual service pages, company and client information, workshop, careers, insights, and contact.

## Preview

Run `npm run build`, then `npm run dev`. Open http://localhost:4173.

The project uses Node's standard library and has no package dependencies. Generated static files are in `site/`; deploy that directory on a static web host. Clean page URLs map to directories containing `index.html`. The local server binds only to the loopback interface.

## Update

Page templates and content: `scripts/build.mjs`.

Styling and themes: `site/assets/style.css`.

Hero markup: `scripts/hero.mjs`. The CSS 3D model and headline sequence use `site/assets/hero.css` and `site/assets/hero.js`, loaded only on the homepage. The model starts facing the screen and gently sways through ±4° of yaw and ±2° of tilt on a roughly 15-second cycle. Hover holds the idle motion; moving across the viewer background adds a softly eased, small pointer response. Service buttons hold still for selection. Dragging or arrow keys take ownership of the view until Reset view resumes the sway. Opening an explanation freezes the model while keeping its board upright. Drag or arrow keys adjust its view within gentle limits; Reset view or Home restores the front view. Clicking a service block or selector opens an upright explanation board in the same viewing area, preserving the layout and camera. Other service selectors remain available. Close or Escape restores the model and focus to the opener; dragging never opens a board.

All three headline lines transition together between complete service-related messages every 6.2 seconds, with a staggered vertical reveal rather than a rotating single word. Context, description, actions, and service notation reveal once on load. Pause motion freezes the model and cancels text animation immediately and leaves the complete current headline readable. Reduced-motion preferences disable automatic animation; it also stops offscreen and in hidden tabs. Model interaction works independently of headline motion. No 3D library, external model, or WebGL is required.

Navigation and enquiry drafting: `site/assets/app.js`.

Run `npm run build` after content/template changes. CSS/JavaScript changes are served directly. Run `npm run check` to verify the generated page inventory, internal destinations, headings, metadata, image names, contact labels, and both palettes' body-text/button contrast.

## Content and contact

Source information is documented in `website-review/NMIT-WEBSITE-REVIEW.md`. Expanded service copy and insights are editorial drafts, not independently verified project or vendor claims. The original article topics and archive dates are retained without suggesting that the newly written pages are the original articles. Team figures are qualified as existing-website figures. No vacancies, leadership biographies, case studies, or testimonials are fabricated.

The contact form prepares a `mailto:` draft and a copyable fallback. Visitors must send that email from their email application. The site has no enquiry backend, upload facility, analytics, or payment flow. Connecting a CRM, transactional email, or the old Apps Script requires an agreed backend and corresponding privacy notice updates.

Privacy and website terms describe this build's behavior. They are draft company copy for review before publishing. Canonical URLs, organization metadata, robots.txt, and sitemap.xml target nmit-solutions.com. The public website has not been modified or deployed.

## Design rationale

See `DESIGN.md`. The cool paper and steel palette, ultramarine inherited from the original website, Plex typography, ruled service rows, and off-axis workshop sheet follow the requested no-ai-slop-web-design skill.

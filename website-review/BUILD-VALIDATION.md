# Build validation

The build contains 17 HTML pages plus a custom 404 page, sitemap, robots file, company metadata, local client logos, custom mark, shared stylesheet, and interaction script.

`npm run check` passed: 17 page inventories, 425 local link/asset destinations, distinct titles, one H1 per page, unique IDs, descriptions, meaningful image alternatives, labeled enquiry fields, and 32 AA contrast comparisons across both themes.

Browser inspection covered the desktop home banner in both themes, service rows and workshop inset, a service detail page, mobile home diagram and client logos, Services navigation, and Contact. All 17 pages were additionally navigated at 320px: document width matched viewport width for every page, every page had one H1, and the theme preference persisted across navigation.

The mobile menu opened and closed through navigation. Empty contact submission focused the required name field, left the draft hidden, and identified name, email, and message as invalid. The workshop query parameter selected the correct option.

A sandboxed JavaScript execution of the real enquiry handler confirmed the recipient, topic, encoded ampersands, multiline text, copied draft content, and invalid-form guard. No email was sent and no enquiry backend was invoked.

The mobile diagram was adjusted after visual inspection to eliminate overlapping system nodes. Final editorial changes removed repeated internal-link arrows and corrected API capitalization.

Google Fonts is an external font dependency; the site uses system fallbacks when unavailable. Page content, styling, scripts, and client logos are otherwise in the deployment directory. Service expansion, insights, and policy copy are drafts for company review before public deployment; no public deployment occurred in this task.

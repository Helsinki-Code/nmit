# NMIT design direction

NMIT serves businesses whose applications, cloud infrastructure, delivery teams, and staffing need to work together. Its free onsite integration workshop is a specific, useful first conversation. The design makes those connections visible and makes contact straightforward.

Three directions considered:
1. A blue photographic technology landing page. Discarded: too close to the existing template and too easy to reuse for another business.
2. An engineering field sheet: connection diagrams, numbered service rows, restrained blue, precise sans-serif typography, and generous white space.
3. A Bengaluru company journal: quieter typography, a location-led company page, and plain-language service articles.

The build combines the field sheet with the company journal. A custom integration diagram is the memorable motif. Service information uses ruled rows, not interchangeable cards. The workshop receives an asymmetric inset because it is the company's clearest published entry offer.

Light tokens: cool paper #f5f7f9, ink #202a38, secondary ink #596574, ultramarine #274bd1, pale steel #e9eef4, brass #806529. These reference the original website's blue and the restrained multicolor bar mark.

Dark tokens: blue graphite #17222e, warm grey text #edf0f2, secondary text #b6c2ce, softened blue #aabcf8, deep steel panels #223140, pale brass #d4bf89. The diagram uses different line and surface colors; its hierarchy changes from blue on pale paper to light ink on layered steel. This is not a neon-on-black environment.

IBM Plex Sans is the reading/display face: clear, slightly human technical lettering for integration services. IBM Plex Mono is reserved for diagram labels, service numbering, and tiny operational details. System fallbacks keep the site usable without the font provider.

Published facts come from the saved website review. Expanded service descriptions are editorial drafts describing topics to discuss, not evidence of specific vendor partnerships, certification, contracts, or project results. No personnel, vacancies, testimonials, or customer case studies are invented. Client logos are retained as the source site's displayed relationships; no endorsement language is added. The enquiry form opens a prepared email in the visitor's email application rather than claiming an unverified backend delivery.

## Hero assembly

Three directions considered for the hero update: (1) an abstract rotating technology orb, rejected because it says nothing about NMIT; (2) a physical assembly of the four actual service areas, connected on an engineering board; (3) an exploded miniature of the website's pages. Direction 2 continues the field-sheet concept and explains the business at a glance.

The model uses native CSS perspective and five solid modules, with cloud, applications, delivery, and people surrounding NMIT. It starts facing the screen, with readable labels and a deliberately quieter central connection. Cool metal tops (#e7edf5), blue connections, and an ultramarine hub reference the existing palette in light mode. Dark mode uses layered steel (#2b4055), subdued edges, and a pale blue hub. Plex Sans carries the headline; Plex Mono is reserved for model notation and controls. Both themes' model text colors are included in the contrast checks.

Each service opens a screen-facing board that occupies the existing viewer, with a small offset edge to suggest depth. Explanation text has no perspective rotation or entrance animation. The viewer's size and the camera remain fixed during selection. Close or Escape returns to the assembly; selectors switch directly between services. Manual rotation is bounded to keep labels legible and has no inertia. A slow idle sway stays within four degrees horizontally and two vertically; hover suspends it, service buttons remain steady, and manual interaction holds the chosen view until Reset view. The slight pointer response is confined to the model, leaving text and actions still.

The entire three-line headline transitions between complete messages, using clipped vertical reveals with a short stagger. Supporting text and actions enter once, then stay still. The accessible heading remains “Build a more connected business.” A pause control stops headline motion, and reduced-motion preferences produce a static hero. There are no particles, gradients, stock 3D objects, unsupported claims, or moving calls to action after the initial reveal.

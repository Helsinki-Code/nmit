# Nodi and the NMIT engineering guides

## Delivered assets

- `site/assets/nodi/character-sheet.png`: full transparent six-pose character sheet. Nodi's structural N torso remains part of the character; the loose N prop is not required.
- `site/assets/nodi/character-sheet.webp`: lossless, alpha-preserving website sprite sheet. Poses: welcome, explain, investigate, plan, success, listen.
- `site/images/articles/`: 30 separately generated illustrations, comprising ten covers and twenty contextual article figures. PNG originals plus 768px and 1536px WebP derivatives.
- `content/blog-source/`: snapshots of the 13 supplied source files. All match the originals from `nmit-design-2` byte for byte at import verification.
- `content/blog.json`: complete imported article content. The production build does not depend on React or the separate design project.

## Art direction and generation records

Images use the original Nodi reference and the NMIT logo reference, with cobalt blue, steel, graphite, and brass. NMIT branding appears in each composition. The diagrams are conceptual illustrations of systems and workflows; they do not portray a named vendor interface or imply a vendor endorsement.

`prompts.json`, individual article JSON files, and `*-refinement.json` files in this directory retain generation prompts and selected output paths. All generation and visual corrections used the built-in image generator. WebP conversion only changes delivery encoding and resolution.

## Contextual placement revision

Three directions were considered: repeated mascot cards (rejected), a character guiding specific workflow decisions, and an illustrated technical reading room. The final design combines the latter two with the site's existing Plex typography and paper/cobalt/steel palette.

The global footer mascot strip has been removed. `scripts/mascot-scenes.mjs` places different poses beside specific marketing content: workshop planning, service questions, team introductions, career preparation, and enquiry fields. Article-specific placement maps put three transparent poses beside relevant sections in every imported guide. No visible article prose was rewritten.

The homepage adds a large illustrated architecture feature, a three-guide reading list, four question-based topic links, a business-workflow explainer, and eight service FAQs. FAQ interaction changes Nodi from listening to explaining. Contact focus uses the listening pose. Scene entrances respect reduced motion and visibility. There are no timer-driven expression changes while reading.

## Verification

- `npm run build`: 28 pages generated.
- `npm run check`: 1,044 local links/assets, unique headings/titles/IDs, contact labels, 40 AA contrast checks; ten exact source articles, 95 sections, 30 illustrations, 18 cross-article anchors, and article metadata.
- `placement-audit.json`: mascot poses present on every generated route, with no repeated footer strip.
- `image-optimization.json`: responsive full-width images reduced by 95% relative to original PNGs.
- Character-sheet WebP has four channels and a genuine alpha channel.
- Browser checks: desktop homepage reading section and FAQ; 390px homepage, FAQ, payment article, and contact form have no horizontal overflow. FAQ open/close changes the mascot's pose. Contact focus keeps the listening pose.

No deployment or commit was performed.

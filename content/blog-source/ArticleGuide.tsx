import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { Character } from '../components/CharacterGuide';

export function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`}>{title}</h2>{children}</section>;
}
export function Table({ caption, headings, rows }: { caption: string; headings: string[]; rows: ReactNode[][] }) {
  return <div className="article-table-wrap" role="region" aria-label={caption} tabIndex={0}><table><caption>{caption}</caption><thead><tr>{headings.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return <div className="article-note"><strong>{title}</strong><p>{children}</p></div>;
}
export function Diagram({ title, steps, caption }: { title: string; steps: { label: string; detail: string }[]; caption: string }) {
  return <figure className="article-diagram"><div className="diagram-brand"><img src="/brand/nmit-concept.png" width={32} height={32} alt="NMIT logo" loading="lazy" /><span>NMIT · {title}</span></div><ol className="diagram-steps">{steps.map((step, i) => <li key={step.label}><span className="diagram-index">0{i + 1}</span><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol><figcaption>{caption}</figcaption></figure>;
}
export function ContentImage({ article, name, alt, caption }: { article: string; name: string; alt: string; caption: string }) {
  const base = `/images/articles/${article}/${name}`;
  return <figure id={`${name}-illustration`} className="article-figure article-content-image"><img src={`${base}-1536.webp`} srcSet={`${base}-768.webp 768w, ${base}-1536.webp 1536w`} sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 960px) calc(100vw - 246px), (max-width: 1120px) calc(100vw - 306px), 760px" width={1536} height={1024} alt={alt} loading="lazy" decoding="async" /><figcaption>{caption}</figcaption></figure>;
}
export function ArticleGuide({ slug, deck, category, minutes, contents, coverCaption, enquiry, children }: { slug: string; deck: string; category: string; minutes: number; contents: readonly (readonly [string, string])[]; coverCaption: string; enquiry?: { title: string; text: string; href: string; label: string }; children: ReactNode }) {
  const post = posts.find(p => p.slug === slug)!;
  const base = post.featuredImage!.replace('-768.webp', '');
  const related = posts.filter(p => p.contentKey && p.slug !== slug);
  return <article className="architecture-article">
    <header className="article-header"><Link className="article-back" to="/blog">← All articles</Link><div className="eyebrow-mono">Implementation guide · {category}</div><h1>{post.title}</h1><p className="article-deck">{deck}</p><div className="article-meta"><span>Published by <Link to="/about">NMIT</Link></span><span>Published <time dateTime={post.publishedAt}>{post.date}</time></span>{post.modifiedAt && <span>Updated <time dateTime={post.modifiedAt}>17 September 2026</time></span>}<span>{minutes} min read</span></div></header>
    <figure className="article-figure article-cover"><img src={`${base}-1536.webp`} srcSet={`${base}-768.webp 768w, ${base}-1536.webp 1536w`} sizes="(max-width: 1120px) calc(100vw - 48px), 980px" width={1536} height={1024} alt={post.featuredImageAlt} loading="eager" fetchPriority="high" decoding="async" /><figcaption>{coverCaption}</figcaption></figure>
    <div className="article-layout"><aside className="article-sidebar"><nav aria-label="Article contents"><span className="eyebrow-mono">On this page</span><ol>{contents.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ol></nav><div className="article-character"><Character pose={post.contentKey==='handover'?'man-runbook':post.contentKey==='monitoring'||post.contentKey==='payment-testing'?'man-investigate':post.contentKey==='integration-cost'||post.contentKey==='hybrid-migration'?'woman-plan':post.contentKey==='modernization'?'woman-review':'woman-explain'} /><p>Bring the workflow, its owners, and a clear definition of completion.</p></div></aside><div className="article-body prose">
      {children}
      <div className="article-cta"><div className="eyebrow-mono">Plan your integration</div><h2>{enquiry?.title ?? 'Give the workflow a clear operating plan.'}</h2>{enquiry ? <p>{enquiry.text}</p> : <p>Discuss interfaces, data ownership, recovery paths, and rollout boundaries with NMIT. Start with <Link to="/services">our API integration services</Link> or bring one workflow to a workshop.</p>}<Link className="btn btn-primary" to={enquiry?.href ?? '/contact/api'}>{enquiry?.label ?? 'Discuss an API integration'}</Link><Link className="article-secondary-cta" to="/contact/workshop">Enquire about a workshop →</Link></div>
      <section className="article-related" aria-labelledby="related-heading"><h2 id="related-heading">Continue reading</h2><ul>{related.map(p => <li key={p.slug}><Link to={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul></section>
      <div className="article-editorial-note"><h2>Editorial note</h2><p>Published by NMIT from the primary technical references linked beside the relevant claims. Examples, field ownership, timings, and operating choices are illustrative design proposals, not customer results or universal provider behavior. Vendor documentation governs the behavior of its own APIs. This guide does not imply a vendor partnership. Contact <Link to="/contact">NMIT</Link> with a correction.</p></div>
    </div></div>
  </article>;
}

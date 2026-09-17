import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const legacyArticleSlug = 'legacy-system-integration';
export const legacyArticleTitle = 'Legacy System Integration: Connect ERP, CRM, and Partner Systems Without a Full Rewrite';
export const legacyArticleDescription = 'Connect legacy ERP, CRM, and partner systems with APIs, adapters, events, and batch flows. Plan data ownership, failure handling, and a phased rollout.';
export const legacyImageBase = '/images/articles/legacy-system-integration';

const contents = [
  ['integration-or-replacement', 'Integrate or replace?'],
  ['integration-inventory', 'Map the current landscape'],
  ['integration-patterns', 'Choose the right pattern'],
  ['data-contracts', 'Define ownership and contracts'],
  ['failure-handling', 'Plan for partial failure'],
  ['security-boundaries', 'Secure each boundary'],
  ['worked-example', 'An ERP–CRM–partner example'],
  ['phased-rollout', 'Roll out in controlled phases'],
  ['production-ownership', 'Own the production workflow'],
  ['readiness-checklist', 'Readiness checklist'],
  ['common-questions', 'Common questions'],
] as const;

function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

export function ArticleImage({ name, alt, caption, featured = false }: { name: string; alt: string; caption?: ReactNode; featured?: boolean }) {
  return <figure className={`article-figure${featured ? ' article-cover' : ''}`}>
    <img src={`${legacyImageBase}/${name}-1536.webp`} srcSet={`${legacyImageBase}/${name}-768.webp 768w, ${legacyImageBase}/${name}-1536.webp 1536w`} sizes={featured ? '(max-width: 1120px) calc(100vw - 48px), 1072px' : '(max-width: 800px) calc(100vw - 48px), 760px'} width={1536} height={1024} alt={alt} loading={featured ? 'eager' : 'lazy'} fetchPriority={featured ? 'high' : 'auto'} decoding="async" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function ArticleSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-heading`}><h2 id={`${id}-heading`}>{title}</h2>{children}</section>;
}

export function LegacySystemIntegration() {
  return <article className="architecture-article">
    <header className="article-header">
      <Link className="article-back" to="/blog">← All articles</Link>
      <div className="eyebrow-mono">Architecture guide · Integration</div>
      <h1>{legacyArticleTitle}</h1>
      <p className="article-deck">Keep the systems that work. Give them clear contracts, reliable connections, and an owner for every workflow.</p>
      <div className="article-meta"><span>Published by <Link to="/about">NMIT</Link></span><span><time dateTime="2026-09-17">17 September 2026</time></span><span>12 min read</span></div>
    </header>

    <ArticleImage name="cover" featured alt="Legacy system documents connect through an amber contract boundary to shared interfaces, with two NMIT engineers reviewing the architecture." caption="Connect through defined boundaries while retaining useful existing systems. Conceptual illustration; the integration layer can have several independently deployed components." />

    <div className="article-layout">
      <aside className="article-sidebar"><nav aria-label="Article contents"><span className="eyebrow-mono">On this page</span><ol>{contents.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ol></nav></aside>
      <div className="article-body prose">
        <div className="article-introduction">
          <p>Legacy system integration connects existing applications with other business systems without immediately replacing their core functionality. An ERP can remain the financial system of record while a CRM, partner portal, or payment service accesses selected capabilities through controlled interfaces.</p>
          <p>The practical challenge is keeping those connections correct when records disagree, endpoints slow down, or only part of a workflow succeeds. A new API does not resolve those problems by itself. The design needs data ownership, stable contracts, explicit failure states, and a rollout plan.</p>
          <p>This guide explains how to make those decisions. The worked example is hypothetical, not an NMIT customer case study. For the commercial scope behind this work, see <Link to="/services">NMIT’s API integration and cloud services</Link>.</p>
        </div>

        <ArticleSection id="integration-or-replacement" title="1. Decide whether to integrate or replace">
          <p>Begin with the business capability you need, rather than a technology preference. Perhaps a partner needs order status, or an account team needs customer balances in the CRM. Neither requirement automatically means replacing the ERP.</p>
          <p>Integration is worth evaluating when the existing application still performs its core job and has a supported way to expose the required data or operation. It can preserve working business rules while giving newer applications a narrower, documented interface.</p>
          <p>Replacement deserves closer consideration when the application cannot meet essential requirements, has no viable supported interface, or creates unacceptable security and maintenance risks. An adapter can translate a protocol; it cannot restore vendor support or correct broken accounting logic.</p>
          <div className="article-table-wrap" role="region" aria-label="Integration versus replacement considerations" tabIndex={0}><table><caption>Choose based on the constraint you need to remove</caption><thead><tr><th>Situation</th><th>Direction to evaluate</th></tr></thead><tbody>
            <tr><td>Core workflow works; another application needs access</td><td>A narrow API or adapter boundary</td></tr>
            <tr><td>One capability needs change; the rest remains useful</td><td>Incremental modernization with coexistence</td></tr>
            <tr><td>Data definitions are inconsistent</td><td>Ownership and mapping before additional connections</td></tr>
            <tr><td>The application cannot meet essential operating requirements</td><td>Replacement or retirement, with an integration transition plan</td></tr>
          </tbody></table></div>
          <p>For incremental replacement, the <Source href="https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/strangler-fig.html">AWS Strangler Fig guidance</Source> describes coexistence between old and new functionality. Its limitations matter: traffic must be routable, the intermediary can become a bottleneck, and each migrated capability needs a rollback plan.</p>
        </ArticleSection>

        <ArticleSection id="integration-inventory" title="2. Map the current landscape before designing a new layer">
          <p>Inventory the interfaces involved in one business flow. Record the application owner, consuming team, protocol, data exchanged, expected frequency, and consequence of failure. A diagram showing only application names leaves out the decisions that determine delivery scope.</p>
          <p>Ask about end-of-day jobs, month-end processing, maintenance windows, and manual corrections. A flow that looks healthy during an ordinary test may behave differently during a scheduled batch run.</p>
          <div className="article-table-wrap" role="region" aria-label="Illustrative integration inventory" tabIndex={0}><table><caption>Hypothetical inventory for a partner-onboarding flow</caption><thead><tr><th>Interface</th><th>Ownership to establish</th><th>Behavior to verify</th></tr></thead><tbody>
            <tr><td>CRM → customer registration</td><td>Customer operations and integration engineering</td><td>Duplicate requests and rejected records</td></tr>
            <tr><td>ERP → account status</td><td>Finance and ERP support</td><td>Freshness, access rules, and maintenance windows</td></tr>
            <tr><td>Integration → partner endpoint</td><td>Partner operations and delivery engineering</td><td>Timeouts, rate limits, and status lookup</td></tr>
            <tr><td>ERP → reconciliation report</td><td>Finance operations</td><td>Missing records and correction approval</td></tr>
          </tbody></table></div>
          <p>Prefer documented APIs, supported messaging, or approved file interfaces. If direct database access is considered, establish vendor support, access boundaries, and schema-change responsibilities first. Treat undocumented writes to an application database as a separate risk decision.</p>
        </ArticleSection>

        <ArticleSection id="integration-patterns" title="3. Choose APIs, events, or batch for each workflow">
          <p>A business landscape often needs more than one integration pattern. Match the pattern to the required response, data freshness, and failure tolerance.</p>
          <p>For a deeper comparison of latency, coupling, ordering, and operating cost, use our <Link to="/blog/api-vs-event-driven-vs-batch-integration">API vs event-driven vs batch integration decision guide</Link>.</p>
          <div className="article-table-wrap" role="region" aria-label="Comparison of API event and batch integration" tabIndex={0}><table><caption>Three patterns and the operating questions they create</caption><thead><tr><th>Pattern</th><th>Useful when</th><th>Plan for</th></tr></thead><tbody>
            <tr><td>Request–response API</td><td>A caller needs a result before proceeding</td><td>Timeouts, downstream availability, and load limits</td></tr>
            <tr><td>Events or queued messages</td><td>Work can continue asynchronously or reach several consumers</td><td>Duplicates, ordering, replay, and delayed consistency</td></tr>
            <tr><td>Scheduled batch or file exchange</td><td>The business accepts a defined delay</td><td>Missing files, partial processing, and reconciliation</td></tr>
          </tbody></table></div>
          <p>For example, a customer eligibility check may require an immediate API response. Updating a reporting copy may tolerate asynchronous events. A daily settlement comparison may be better suited to a controlled batch job.</p>
          <p>Asynchronous design adds its own responsibilities. <Source href="https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven">Microsoft’s event-driven architecture guidance</Source> discusses delivery, ordering, eventual consistency, and recovery challenges. A queue should not be presented as an automatic guarantee that every business operation completes once.</p>
          <p>Keep protocol translation near the system it serves. Microsoft calls this an <Source href="https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer">anti-corruption layer</Source>: a boundary between systems with different semantics. It can be an application component or a separate service. The added latency and operating burden still need evaluation.</p>
          <p>A shared integration architecture describes agreed contracts and responsibilities. It does not require one central server or a microservice for every connection.</p>
        </ArticleSection>

        <ArticleSection id="data-contracts" title="4. Define data ownership and contracts before mapping fields">
          <p>Our <Link to="/blog/erp-crm-integration">ERP–CRM data mapping, synchronization, and error-handling guide</Link> works through stable keys, field authority, conflicting updates, and failed-record recovery.</p>
          <p>Decide which application owns each fact. The CRM might own relationship notes, while the ERP owns an approved account status. Allowing both systems to overwrite the same field without a conflict rule makes synchronization unpredictable.</p>
          <p>Then define identity mappings. In this fictional example, the ERP’s <code>CUST_NO</code> and the CRM’s <code>contact_id</code> refer to related records but are different identifiers. A contract exposes a stable <code>customerId</code>, with a maintained cross-reference to each system. Renaming a field is insufficient if records do not have a reliable identity relationship.</p>
          <ArticleImage name="data-mapping" alt="Field-mapping illustration connects ERP CUST_NO, a shared customerId contract, and CRM contact_id through a verified translation boundary." caption={<>Illustrative names, not a vendor schema. The drawing shows the mapping relationship; ownership, identifier lookup, and conflict rules must also be defined.</>} />
          <p>For each interface, document required fields, allowed values, formats, null handling, error responses, pagination, and version compatibility. For HTTP APIs, the <Source href="https://spec.openapis.org/oas/latest.html">OpenAPI Specification</Source> provides a standard way to describe the interface. A specification documents the contract; implementation tests must still verify that the service follows it.</p>
          <p>Agree how changes will be introduced. Adding an optional field is different from changing an identifier’s meaning. Identify consumers, set a notice period, and test supported versions before retiring an old contract.</p>
        </ArticleSection>

        <ArticleSection id="failure-handling" title="5. Design for partial failure, not just successful calls">
          <p>A successful workflow in a test environment proves only one path. Define what happens when a dependency responds slowly, accepts a request but loses the response, or rejects one record in a larger batch.</p>
          <p>A timeout means the caller stopped waiting. It does not, by itself, establish whether the remote operation completed. Where the outcome is unknown, preserve a pending or unresolved state and use the partner’s documented status or reconciliation mechanism.</p>
          <ul>
            <li><strong>Retries:</strong> identify which failures are retryable, cap attempts, and avoid overwhelming a recovering dependency.</li>
            <li><strong>Idempotency:</strong> use a stable operation identifier where the receiving interface supports it, and verify its scope and retention behavior.</li>
            <li><strong>Failed messages:</strong> quarantine records with a reason and a controlled recovery process.</li>
            <li><strong>Reconciliation:</strong> compare business records across systems and assign an owner to unresolved differences.</li>
          </ul>
          <p><Source href="https://docs.stripe.com/api/idempotent_requests">Stripe’s idempotent request documentation</Source> is a useful concrete example: repeated requests with the same key can return a saved result, subject to documented conditions. Those semantics belong to Stripe’s interface. They should not be assumed for every partner, and idempotency alone does not guarantee end-to-end settlement correctness.</p>
          <p>For a closer look at the payment-specific decisions, read <Link to="/blog/partner-payment-apis">payment API integration: timeouts, retries, and reconciliation</Link>. Apply the same discipline to account creation and other operations with external side effects.</p>
        </ArticleSection>

        <ArticleSection id="security-boundaries" title="6. Secure each boundary and limit what it exposes">
          <p>Authenticate the caller, authorize the requested operation, and check access to the specific record. An authenticated partner should not be able to retrieve another partner’s customer by changing an identifier.</p>
          <p><Source href="https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/">OWASP’s object-level authorization guidance</Source> explains this distinction. Include negative authorization tests, rather than testing only requests with valid credentials.</p>
          <p>Expose only the fields needed for the workflow. Agree credential storage and rotation, network restrictions, encrypted transport, audit retention, and access to operational tools. Avoid placing secrets or unnecessary personal data in logs. Existing systems and new interfaces both belong in the threat review.</p>
          <p>Industry or jurisdiction-specific controls need a separate assessment. Connecting a banking system through an API does not establish regulatory compliance.</p>
        </ArticleSection>

        <ArticleSection id="worked-example" title="7. A worked example: ERP, CRM, and a partner onboarding service">
          <p>Consider a fictional organization with customer relationship records in a CRM, approved account records in an ERP, and an external partner that registers eligible customers. The ERP remains in place; only this onboarding flow is changed.</p>
          <ol>
            <li>The CRM requests onboarding using a business operation ID and a customer reference.</li>
            <li>A contract boundary validates the request and resolves the CRM-to-ERP identity mapping.</li>
            <li>An ERP adapter reads the approved account status through a supported interface.</li>
            <li>The integration calls the partner using the partner’s documented duplicate-prevention mechanism, if available.</li>
            <li>The workflow records a confirmed, rejected, or unresolved result. It updates the CRM only with a state justified by evidence.</li>
            <li>An operations process investigates overdue unresolved requests and compares partner records with internal records.</li>
          </ol>
          <p>Suppose the partner accepts the request but the response is lost. The CRM should not immediately show a confirmed registration, and a new blind submission could duplicate the operation. The recovery path depends on the partner’s contract: query status, process an authenticated callback, reconcile records, or escalate for manual investigation.</p>
          <div className="article-note"><strong>The boundary to keep clear</strong><p>The illustration and workflow are design examples. They do not describe a deployed NMIT product, a customer implementation, or a guaranteed result.</p></div>
          <p>The useful outcome is an explicit responsibility map: the ERP retains account authority, the CRM owns the customer-facing view, and the integration owner handles cross-system states. Discuss the relevant boundaries through <Link to="/contact/workshop">NMIT’s integration-modernization workshop enquiry</Link>.</p>
        </ArticleSection>

        <ArticleSection id="phased-rollout" title="8. Roll out one bounded workflow before expanding">
          <p>Choose a pilot with understandable dependencies and a measurable business outcome. Record the existing behavior, agree acceptance tests, and identify the team that can stop or reverse the rollout.</p>
          <ArticleImage name="phased-rollout" alt="Phased legacy integration roadmap progresses from map to pilot to expand, with an amber rollback path and the same two engineers reviewing the plan." caption="Progress through validation gates, not a promised timeline. Expand only after the pilot’s data, failure handling, and operating responsibilities are accepted." />
          <h3>Map and test</h3>
          <p>Use representative records, unusual field values, permission failures, and dependency outages. Verify contract behavior as well as business results. Where possible, compare read-only outputs before routing production requests through the new path.</p>
          <h3>Pilot with a defined rollback gate</h3>
          <p>Limit the initial scope to an agreed group or workflow. Track errors, unresolved records, and downstream load. Define who authorizes rollback and how in-flight work will be reconciled. Switching traffic back does not undo an external side effect.</p>
          <h3>Expand and retire redundant paths</h3>
          <p>Increase scope only after the receiving team accepts the pilot. Remove superseded connections deliberately, with documentation and a recovery plan. Keeping both write paths active indefinitely can produce conflicts and hide which application owns an update.</p>
          <p>If the rollout also changes hosting, bring the dependency inventory into <Link to="/services">cloud migration and infrastructure planning</Link>. Application connectivity, identity, and scheduled processing still need attention after a workload moves.</p>
        </ArticleSection>

        <ArticleSection id="production-ownership" title="9. Monitor the business workflow and name its owner">
          <p>Technical monitoring should tell you where a request failed. Business monitoring should tell you whether the intended operation reached a justified final state. An endpoint can be available while onboarding records remain unresolved.</p>
          <p><Source href="https://opentelemetry.io/docs/concepts/signals/">OpenTelemetry’s signal documentation</Source> describes traces, metrics, and logs. Use those signals to connect activity across boundaries, then add workflow-specific checks such as unresolved record age and reconciliation differences.</p>
          <p>Agree alert thresholds with the owning team. Include a runbook, escalation route, credential process, deployment and rollback instructions, and a controlled method for correcting or replaying records. Business IDs used for investigation should not expose unnecessary personal data.</p>
          <p>This operating scope belongs alongside <Link to="/services">DevOps and embedded engineering support</Link>. Specify responsibilities and support hours in the engagement; do not assume the delivery team remains the permanent incident owner.</p>
        </ArticleSection>

        <ArticleSection id="readiness-checklist" title="10. A legacy integration readiness checklist">
          <p>Before approving implementation, check that the team can answer each of these questions:</p>
          <ul className="article-checklist">
            <li>Which business capability is changing, and which systems remain?</li>
            <li>Who owns each record, field, interface, and unresolved operation?</li>
            <li>Are the interfaces supported and accessible in a representative test environment?</li>
            <li>Are identity mapping, contracts, access rules, and version changes documented?</li>
            <li>What happens after duplicates, timeouts, partial writes, and partner outages?</li>
            <li>What evidence confirms success, and who reconciles conflicting records?</li>
            <li>How is the pilot stopped, and how are side effects handled after rollback?</li>
            <li>Can the receiving team operate, diagnose, and recover the workflow?</li>
          </ul>
          <p>Unanswered questions belong in discovery scope. They should not disappear into a fixed estimate that assumes every interface behaves as expected.</p>
        </ArticleSection>

        <ArticleSection id="common-questions" title="Common questions about legacy system integration">
          <h3>Can a legacy application be integrated if it has no REST API?</h3>
          <p>Sometimes. A supported SOAP interface, message queue, file exchange, or approved data-access mechanism may provide a boundary. The choice depends on vendor support, required behavior, and acceptable delay. An adapter cannot create a safe write operation where none exists.</p>
          <h3>Do we need microservices to connect ERP and CRM?</h3>
          <p>No. A bounded adapter inside an application may be sufficient. Separate services are useful when independent deployment, scaling, or ownership justifies their operating complexity.</p>
          <h3>How long does a legacy integration project take?</h3>
          <p>There is no useful universal duration. Scope depends on interface quality, mappings, security review, test access, failure handling, and rollout constraints. Estimate after a bounded discovery exercise, with assumptions stated explicitly.</p>
          <h3>Does integration remove the need for a future replacement?</h3>
          <p>No. It can give consumers stable boundaries during a transition. The legacy application’s support status, business fit, and maintenance needs still determine whether it should eventually be replaced.</p>
        </ArticleSection>

        <div className="article-cta"><span className="eyebrow-mono">Your next architecture decision</span><h2>Start with one workflow and its boundaries.</h2><p>Bring the systems involved, the business outcome, and the failure states you need to understand. Explore <Link to="/services">NMIT’s integration services</Link> or send a scoped enquiry.</p><Link className="btn btn-primary" to="/contact/api">Discuss your integration</Link><Link className="article-secondary-cta" to="/contact/workshop">Ask about the workshop →</Link></div>

        <footer className="article-editorial-note"><h2>About this guide</h2><p>Published by NMIT. This is a source-based architecture guide with a hypothetical example, not original customer research. Illustrations were generated for NMIT using its teal, amber, and sage palette. The two recurring engineers are fictional characters. Linked product documentation illustrates specific patterns; it does not imply a partnership or deployment of those products.</p><p>Technical references were checked on 17 September 2026. To flag an error or discuss your own constraints, <Link to="/contact">contact NMIT</Link>.</p></footer>
      </div>
    </div>
  </article>;
}

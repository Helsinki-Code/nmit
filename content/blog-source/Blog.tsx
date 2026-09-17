import { Link, useParams } from 'react-router-dom';
import { PostItem } from '../components/Content';
import { posts } from '../data/posts';
import { LegacySystemIntegration } from '../content/LegacySystemIntegration';
import { PaymentApiIntegration } from '../content/PaymentApiIntegration';
import { ErpCrmIntegration } from '../content/ErpCrmIntegration';
import { IntegrationPatterns } from '../content/IntegrationPatterns';
import { PaymentApiTesting } from '../content/PaymentApiTesting';
import { HybridCloudMigration } from '../content/HybridCloudMigration';
import { ApiIntegrationCost } from '../content/ApiIntegrationCost';
import { IntegrationMonitoring } from '../content/IntegrationMonitoring';
import { IntegrationHandover } from '../content/IntegrationHandover';
import { LegacyModernization } from '../content/LegacyModernization';
import { ContextGuide } from '../components/CharacterGuide';
export function Blog() { return <><section><h1>Engineering guides</h1><p className="lede">Practical reading for the systems you connect, the changes you plan, and the workflows you operate.</p></section><ContextGuide pose="man-investigate" title="Start with the decision in front of you." text="Planning an integration? Begin with architecture and scope. Operating one? Read the testing, monitoring, and handover guides together." href="/blog/api-vs-event-driven-vs-batch-integration" label="Compare integration patterns" /><section className="tight"><div className="post-list">{posts.map(post => <PostItem key={post.slug} post={post} />)}</div></section></>; }
export function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(item => item.slug === slug);
  if (!post) return <section><h1>Post not found</h1><p><Link to="/blog">Back to blog</Link></p></section>;
  if (post.contentKey === 'legacy-integration') return <LegacySystemIntegration />;
  if (post.contentKey === 'payment-integration') return <PaymentApiIntegration />;
  if (post.contentKey === 'erp-crm') return <ErpCrmIntegration />;
  if (post.contentKey === 'integration-patterns') return <IntegrationPatterns />;
  if (post.contentKey === 'payment-testing') return <PaymentApiTesting />;
  if (post.contentKey === 'hybrid-migration') return <HybridCloudMigration />;
  if (post.contentKey === 'integration-cost') return <ApiIntegrationCost />;
  if (post.contentKey === 'monitoring') return <IntegrationMonitoring />;
  if (post.contentKey === 'handover') return <IntegrationHandover />;
  if (post.contentKey === 'modernization') return <LegacyModernization />;
  return <><article className="post prose"><section><div className="date">{post.date}</div><h1>{post.title}</h1>{post.body.map((paragraph,index) => <p key={index}>{paragraph}</p>)}<p style={{ marginTop:24 }}><Link to="/blog">← Back to blog</Link></p></section></article><ContextGuide pose="man-investigate" title="Connect the change to the operating plan." text="Infrastructure changes affect dependencies, compatibility, monitoring, and recovery. Map the workflow and its owners before moving a workload or changing a shared interface." href="/blog/hybrid-cloud-migration-checklist" label="Review migration dependencies" /></>;
}

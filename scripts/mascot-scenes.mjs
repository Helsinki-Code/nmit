import { nodi } from './blog.mjs';

const scene=(pose,side='right')=>`<span class="nodi-scene nodi-${side}" data-nodi-scene>${nodi(pose)}</span>`;
// Each insertion is tied to a specific piece of content, never the global footer.
export function placeMascots(slug,body){
 const insert=(anchor,pose,side='right')=>{body=body.replace(anchor,anchor+scene(pose,side));};
 if(slug===''){
  insert('<div class="workshop-sheet">','plan','sheet');
  insert('<h2>From infrastructure to<br>the people behind it.</h2>','explain','inline');
 } else if(slug==='services'){
  insert('<h2>Integration is a<br>business conversation.</h2>','explain','inline');
  insert('<section class="wrap services-index">','plan','lead');
 } else if(slug.startsWith('services/')){
  const poses={'cloud-services':['plan','investigate'],'api-integration':['explain','investigate'],devops:['investigate','success'],staffing:['welcome','listen']}[slug.split('/')[1]];
  insert('<div class="detail-content">',poses[0],'lead');
  insert('<div class="service-question">',poses[1],'right');
 } else if(slug==='about'){
  insert('<h2>Technology work<br>starts with people.</h2>','welcome','right');
  insert('<h2>A practical first<br>conversation.</h2>','listen','inline');
 } else if(slug==='clients'){
  insert('<h2>Talk about the work<br>you have in mind.</h2>','listen','inline');
  insert('<section class="wrap client-directory">','success','lead');
 } else if(slug==='workshop'){
  insert('<div class="workshop-summary">','plan','inline');
  insert('<h3>Identify useful improvements</h3>','explain','right');
 } else if(slug==='careers'){
  insert('<h2>Start a conversation<br>about your experience.</h2>','welcome','inline');
  insert('<div class="career-note">','plan','right');
 } else if(slug==='contact'){
  insert('<div class="form-intro">','listen','form');
  insert('<div class="office">','welcome','right');
 } else if(slug==='privacy'){
  insert('<h2>Email enquiries</h2>','listen','right');
  insert('<h2>Your theme preference</h2>','explain','left');
 } else if(slug==='terms'){
  insert('<h2>Project and staffing arrangements</h2>','plan','right');
  insert('<h2>Contact</h2>','listen','left');
 } else if(slug==='insights'){
  insert('<section class="wrap insights-index">','investigate','lead');
 } else if(slug.startsWith('insights/')){
  insert('<div class="article-body">','explain','right');
  insert('<div class="article-next">','plan','left');
 }
 return body;
}

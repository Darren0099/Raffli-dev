import {randomBytes} from 'node:crypto';
import type {Project} from '@/data/projectsData';

// The repository is intentionally fixed to the owner's public portfolio.
// Never accept repository, branch, file path or token from a browser request.
const REPO='Darren0099/Raffli-dev';
const PATH='data/projects.cms.json';
const BRANCH=()=>process.env.GITHUB_CMS_BRANCH || 'main';
const TOKEN=()=>process.env.GITHUB_TOKEN || '';
export type ProjectStatus='draft'|'published'|'archived'|'deleted';
export type CmsProjectRecord={id:number;slug:string;status:ProjectStatus;data:Project;created_at:string;updated_at:string};
type FileSnapshot={records:CmsProjectRecord[];sha?:string};

export function githubCmsConfigured(){return Boolean(TOKEN());}
function endpoint(path:string){return 'https://api.github.com/repos/'+REPO+'/'+path;}
function headers():Record<string,string>{
 return {Authorization:'Bearer '+TOKEN(),Accept:'application/vnd.github+json',
  'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json','User-Agent':'raffli-portfolio-cms'};
}
async function gh(path:string,init:RequestInit={}):Promise<Response>{
 if(!TOKEN())throw Error('GITHUB_TOKEN missing in server environment');
 return fetch(endpoint(path),{...init,headers:{...headers(),...(init.headers||{})},cache:'no-store'});
}
function errorFor(res:Response,action:string){
 // Report permission error without exposing token, response body, or secrets.
 if(res.status===401||res.status===403)
  return new Error(action+' denied by GitHub ('+res.status+'). Check fine-grained token: repository Contents → Read and write, expiration and branch rules.');
 return new Error(action+' failed (GitHub '+res.status+').');
}
async function fileSnapshot():Promise<FileSnapshot>{
 const response=await gh('contents/'+PATH+'?ref='+encodeURIComponent(BRANCH()));
 if(response.status===404)return {records:[]};
 if(!response.ok)throw errorFor(response,'Read CMS file');
 const body=await response.json() as {sha?:string;content?:string;encoding?:string;size?:number};
 if(!body.content||body.encoding!=='base64'||!body.sha)throw Error('CMS content is too large or malformed');
 const parsed:unknown=JSON.parse(Buffer.from(body.content.replace(/\s/g,''),'base64').toString('utf8'));
 if(!Array.isArray(parsed)||!parsed.every(x=>x&&typeof x==='object'&&
  Number.isSafeInteger(x.id)&&typeof x.slug==='string'&&
  ['draft','published','archived','deleted'].includes(x.status)&&x.data&&typeof x.data==='object'))
  throw Error('Invalid CMS JSON document');
 return {records:parsed as CmsProjectRecord[],sha:body.sha};
}
export async function readCmsProjects(){return (await fileSnapshot()).records;}
export async function mutateCmsProjects(
 transform:(rows:CmsProjectRecord[])=>CmsProjectRecord[],
 message:string
):Promise<CmsProjectRecord[]>{
 // Retry stale-file conflicts; every retry re-runs the transformation on the latest SHA.
 for(let attempt=0;attempt<3;attempt++){
  const current=await fileSnapshot();
  const rows=transform(current.records);
  const json=JSON.stringify(rows,null,2)+'\n';
  if(Buffer.byteLength(json)>800_000)throw Error('CMS JSON storage limit exceeded. Consider separating records.');
  const response=await gh('contents/'+PATH,{
   method:'PUT',
   body:JSON.stringify({message,content:Buffer.from(json).toString('base64'),branch:BRANCH(),
    ...(current.sha?{sha:current.sha}:{})})
  });
  if(response.ok)return rows;
  if(response.status===409||response.status===422)continue;
  throw errorFor(response,'Write CMS file');
 }
 throw Error('GitHub CMS write conflict. Retry saving your changes.');
}
function detectImage(buffer:Buffer):'png'|'jpg'|'webp'|null{
 if(buffer.length>12&&buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'png';
 if(buffer.length>12&&buffer[0]===255&&buffer[1]===216&&buffer[2]===255)return 'jpg';
 if(buffer.length>12&&buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP')return 'webp';
 return null;
}
export async function uploadProjectImage(file:File):Promise<string>{
 if(!file.size||file.size>2_500_000)throw Error('Image size must be under 2.5 MB');
 const buffer=Buffer.from(await file.arrayBuffer());
 const ext=detectImage(buffer);
 if(!ext)throw Error('Only real JPG, PNG, or WebP files are accepted');
 const path='public/uploads/projects/'+Date.now().toString(36)+'-'+randomBytes(8).toString('hex')+'.'+ext;
 const response=await gh('contents/'+path,{
  method:'PUT',body:JSON.stringify({
   message:'cms(images): upload project asset',content:buffer.toString('base64'),branch:BRANCH()
  })
 });
 if(!response.ok)throw errorFor(response,'Upload image');
 // Relative asset URL works on Vercel once the GitHub push is deployed.
 return '/'+path.replace(/^public\//,'');
}

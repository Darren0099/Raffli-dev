'use client';
import {useEffect,useState} from 'react';
import {projectsData, type Project} from '@/data/projectsData';

// Legacy data stays available while the CMS is being configured and imported.
// The server only returns published records once PORTFOLIO_CMS_ENABLED=true.
export function usePortfolioProjects(){
 const [projects,setProjects]=useState<Project[]>(projectsData);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  let alive=true;
  const controller=new AbortController();
  fetch('/api/portfolio/projects',{signal:controller.signal,cache:'no-store'})
   .then(async r=>{if(!r.ok)throw Error('Portfolio data unavailable');return r.json() as Promise<{projects:Project[]}>;})
   .then(result=>{if(alive&&Array.isArray(result.projects))setProjects(result.projects);})
   .catch(()=>{})
   .finally(()=>{if(alive)setLoaded(true);});
  return()=>{alive=false;controller.abort();};
 },[]);
 return {projects,loaded};
}

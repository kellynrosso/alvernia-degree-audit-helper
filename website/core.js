(function(root){
  'use strict';
  const categories=['Learning','Wellbeing','Food & essentials','Community','Technology','Other'];
  function youtubeId(input){
    try {
      const u=new URL(String(input).trim());
      if(!['https:','http:'].includes(u.protocol))return null;
      const h=u.hostname.toLowerCase().replace(/^www\./,'');
      let id=null;
      if(h==='youtu.be')id=u.pathname.split('/')[1];
      else if(['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(h)){
        if(u.pathname==='/watch')id=u.searchParams.get('v');
        else if(/^\/(embed|shorts|live)\//.test(u.pathname))id=u.pathname.split('/')[2];
      }
      return /^[A-Za-z0-9_-]{11}$/.test(id||'')?id:null;
    } catch { return null; }
  }
  function safeUrl(value){try{const u=new URL(String(value));return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:null;}catch{return null;}}
  function number(value,min,max,label){
    if(value===null||value===undefined||String(value).trim()==='')throw Error(label+' is required.');
    const n=Number(value);if(!Number.isFinite(n)||n<min||n>max)throw Error(label+' must be between '+min+' and '+max+'.');return n;
  }
  function cleanText(value,max,label){const v=String(value??'').trim();if(!v||v.length>max)throw Error(label+' is required (maximum '+max+' characters).');return v;}
  function validateResource(raw,campuses){
    if(!raw||typeof raw!=='object')throw Error('Each resource must be an object.');
    const r={id:String(raw.id||'resource-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)),name:cleanText(raw.name,90,'Name'),description:cleanText(raw.description,600,'Description'),campus:String(raw.campus||''),category:String(raw.category||''),lat:number(raw.lat,-90,90,'Latitude'),lon:number(raw.lon,-180,180,'Longitude'),source:safeUrl(raw.source),accessibility:cleanText(raw.accessibility||'Not verified',300,'Access notes'),verifiedOn:cleanText(raw.verifiedOn,10,'Date checked'),kind:'student'};
    if(!campuses.some(c=>c.id===r.campus))throw Error('Choose a listed campus or partner location.');
    if(!categories.includes(r.category))throw Error('Choose a listed category.');
    if(!r.source)throw Error('Add a complete http or https source link.');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(r.verifiedOn)||Number.isNaN(Date.parse(r.verifiedOn+'T12:00:00Z'))||new Date(r.verifiedOn+'T12:00:00Z').toISOString().slice(0,10)!==r.verifiedOn)throw Error('Use a valid date checked.');
    return r;
  }
  function mergeResources(existing,incoming,campuses){
    if(!Array.isArray(incoming)||incoming.length>100)throw Error('Import an array of up to 100 resources.');
    const parsed=incoming.map(r=>validateResource(r,campuses));
    const out=existing.slice();
    for(const r of parsed){const i=out.findIndex(a=>a.name.toLowerCase()===r.name.toLowerCase()&&a.campus===r.campus);if(i>=0)out[i]={...r,id:out[i].id};else out.push({...r,id:'student-'+Date.now()+'-'+out.length});}
    if(out.length>100)throw Error('This starter supports up to 100 student resources.');
    return out;
  }
  function filterResources(resources,term,category='all'){
    const q=String(term).trim().toLowerCase();return resources.filter(r=>(category==='all'||r.category===category)&&[r.name,r.description,r.category,r.address,r.city].join(' ').toLowerCase().includes(q));
  }
  const api={categories,youtubeId,safeUrl,number,validateResource,mergeResources,filterResources};root.CampusCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);

(function(root){
'use strict';
// This is a deterministic, bounded simulation. It does not call a language model.
const MAX_STEPS=6;
function makeEngine(data,request,options={}){
 const state={phase:'search',candidates:[],index:0,current:null,status:'running',reason:'',count:0,trace:[],lastAction:null};
 const cap=options.maxSteps??MAX_STEPS;
 const tools={
  search_resources:({category})=>data.filter(r=>r.category===category).map(r=>r.id),
  get_details:({id})=>{const r=data.find(x=>x.id===id);if(!r)throw Error('Sample record unavailable');return r;},
  check_fit:({id,day,after,mode,access})=>{const r=data.find(x=>x.id===id);if(!r)throw Error('Sample record unavailable');const issues=[];if(!r.days.includes(day))issues.push('not listed on '+day);if(r.end<=after)issues.push('closes before or at the requested time');if(mode!=='any'&&!r.modes.includes(mode))issues.push('requested format is not listed');if(access&&!r.stepFree)issues.push('sample step-free access is not recorded');return {fits:issues.length===0,issues};}
 };
 function step(){
  if(state.status!=='running')return state;
  if(state.count>=cap){state.status='stopped';state.reason='Stopped at the '+cap+'-tool-call limit. No recommendation was confirmed.';return state;}
  let tool,args,why;
  if(state.phase==='search'){tool='search_resources';args={category:request.category};why='Find sample entries for the requested category.';}
  else if(state.phase==='details'){tool='get_details';args={id:state.candidates[state.index]};why='Read the next candidate before checking its fit.';}
  else{tool='check_fit';args={id:state.current.id,day:request.day,after:request.after,mode:request.mode,access:request.access};why='Check this candidate against the stated constraints.';}
  const signature=JSON.stringify({tool,args});
  if(signature===state.lastAction){state.status='stopped';state.reason='Stopped because the same action was repeated.';return state;}
  state.lastAction=signature;state.count++;
  try{
   const value=tools[tool](args);let observation,check;
   if(tool==='search_resources'){state.candidates=value;observation=value.length?value.length+' sample candidate(s): '+value.join(', '):'No sample candidates found.';if(value.length){state.phase='details';check='Continue with the first candidate.';}else{state.status='no-match';state.reason='No sample options were found. Ask a person or change the request.';check='Stop: no candidates.';}}
   else if(tool==='get_details'){state.current=value;state.phase='fit';observation=value.name+'; '+value.days.join(', ')+'; closes '+formatTime(value.end)+'; '+value.modes.join(' / ')+'.';check='Continue to check fit.';}
   else{observation=value.fits?'All selected conditions match this fictional entry.':'Does not match: '+value.issues.join('; ')+'.';if(value.fits){state.status='done';state.reason='Sample match: '+state.current.name+'. This result is fictional and must not be used for real campus support.';check='Stop: sample goal met.';}else if(state.index+1<state.candidates.length){state.index++;state.current=null;state.phase='details';check='Try another sample candidate.';}else{state.status='no-match';state.reason='No verified sample match for these constraints. Ask a person or change the request.';check='Stop: no candidates remain.';}}
   state.trace.push({step:state.count,why,tool,args,observation,check});
  }catch(e){state.status='error';state.reason='Tool error. Stop and ask a person to check the data.';state.trace.push({step:state.count,why,tool,args,observation:'Tool failed.',check:'Stop safely.'});}
  if(state.status==='running'&&state.count>=cap){state.status='stopped';state.reason='Stopped at the '+cap+'-tool-call limit. No recommendation was confirmed.';}
  return state;
 }
 return {step,state};
}
function formatTime(n){let h=Math.floor(n/60),m=n%60;return (h%12||12)+':'+String(m).padStart(2,'0')+' '+(h>=12?'PM':'AM');}
root.FinderEngine={makeEngine,formatTime,MAX_STEPS};if(typeof module!=='undefined')module.exports=root.FinderEngine;
})(typeof window!=='undefined'?window:globalThis);

(function(root){
// FICTIONAL DATA: no real campus service, schedule, location, or accessibility claim.
const data=[
{id:'tut-early',name:'Learning Studio',category:'tutoring',description:'Sample drop-in help with writing and assignments.',days:['Monday','Tuesday','Wednesday','Thursday','Friday'],start:540,end:900,modes:['in-person'],stepFree:false,place:'Sample North Hall',lat:40.31225,lon:-75.93443},
{id:'tut-late',name:'Evening Study Desk',category:'tutoring',description:'Sample study help with an evening and online option.',days:['Monday','Tuesday','Wednesday','Thursday'],start:960,end:1140,modes:['online','in-person'],stepFree:true,place:'Sample Library Annex',lat:40.31285,lon:-75.93345},
{id:'food-early',name:'Pantry Pop-up',category:'food',description:'Sample pantry pickup window for basic needs.',days:['Monday','Wednesday','Friday'],start:600,end:900,modes:['in-person'],stepFree:false,place:'Sample West Center',lat:40.31196,lon:-75.93489},
{id:'food-late',name:'Evening Food Shelf',category:'food',description:'Sample evening food pickup option.',days:['Monday','Wednesday','Thursday'],start:960,end:1110,modes:['in-person'],stepFree:true,place:'Sample Student Center',lat:40.31247,lon:-75.93375},
{id:'tech-early',name:'Laptop Help Desk',category:'technology',description:'Sample technology troubleshooting and device support.',days:['Monday','Tuesday','Wednesday','Thursday','Friday'],start:540,end:1020,modes:['in-person'],stepFree:true,place:'Sample Tech Commons',lat:40.31202,lon:-75.93365},
{id:'tech-online',name:'Online Tech Help',category:'technology',description:'Sample remote help with common software problems.',days:['Monday','Tuesday','Wednesday','Thursday'],start:960,end:1140,modes:['online'],stepFree:true,place:'Online sample',lat:40.31257,lon:-75.9346},
{id:'well-early',name:'Wellbeing Connections',category:'wellbeing',description:'Sample information on student wellbeing resources.',days:['Tuesday','Thursday'],start:600,end:900,modes:['in-person'],stepFree:true,place:'Sample Welcome Center',lat:40.31299,lon:-75.93417},
{id:'well-online',name:'Evening Check-in',category:'wellbeing',description:'Sample wellbeing information with a remote option.',days:['Tuesday','Thursday'],start:960,end:1080,modes:['online'],stepFree:true,place:'Online sample',lat:40.31179,lon:-75.9341}
];root.RESOURCE_DATA=data;if(typeof module!=='undefined')module.exports=data;
})(typeof window!=='undefined'?window:globalThis);

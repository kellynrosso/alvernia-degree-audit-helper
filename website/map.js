/* Cesium is loaded only when requested. All external data is streamed, never copied. */
(function(root){
'use strict';
class CampusMap {
  constructor({container,fallback,status,onSelect}){
    this.container=container;this.fallback=fallback;this.status=status;this.onSelect=onSelect;
    this.viewer=null;this.pins=[];this.mode='2d';this.token='';this.tileset=null;this.model=null;this.loading=null;
  }
  say(text){this.status.textContent=text;}
  async library(){
    if(root.Cesium)return root.Cesium;
    if(!this.loading)this.loading=new Promise((resolve,reject)=>{
      const base='https://cesium.com/downloads/cesiumjs/releases/'+root.CAMPUS_CONFIG.cesiumVersion+'/Build/Cesium/';
      const css=document.createElement('link');css.rel='stylesheet';css.href=base+'Widgets/widgets.css';document.head.append(css);
      root.CESIUM_BASE_URL=base;
      const js=document.createElement('script');js.src=base+'Cesium.js';
      const timeout=setTimeout(()=>reject(Error('The map library did not load. Check your connection and try again.')),20000);
      js.onload=()=>{clearTimeout(timeout);resolve(root.Cesium);};js.onerror=()=>{clearTimeout(timeout);reject(Error('The map library could not load. Check your connection.'));};document.head.append(js);
    }).catch(e=>{this.loading=null;throw e;});
    return this.loading;
  }
  canRender(){
    if(this.supported!==undefined)return this.supported;
    try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');this.supported=!!gl;if(gl)gl.getExtension('WEBGL_lose_context')?.loseContext();}catch{this.supported=false;}
    return this.supported;
  }
  async init(token=this.token){
    if(this.starting){await this.starting;if(token===this.token)return !!this.viewer;}
    this.starting=this.start(token);
    try{return await this.starting;}finally{this.starting=null;}
  }
  async start(token){
    if(!this.canRender()){this.token=token;this.fail('Interactive map unavailable: this browser cannot initialize WebGL 2. The directory and project editor still work.');return false;}
    if(this.viewer&&token===this.token)return true;
    this.say('Loading the interactive campus map…');
    try{
      const C=await this.library();this.token=token;
      if(this.viewer){this.viewer.destroy();this.viewer=null;this.tileset=null;this.model=null;}
      this.container.replaceChildren();
      C.Ion.defaultAccessToken=token||'';
      this.viewer=new C.Viewer(this.container,{animation:false,timeline:false,baseLayerPicker:false,baseLayer:false,geocoder:token?C.IonGeocodeProviderType.GOOGLE:false,homeButton:false,sceneModePicker:false,navigationHelpButton:false,fullscreenButton:false,infoBox:false,selectionIndicator:false,requestRenderMode:true,sceneMode:C.SceneMode.SCENE2D});
      this.viewer.imageryLayers.addImageryProvider(new C.OpenStreetMapImageryProvider({url:'https://tile.openstreetmap.org/'}));
      this.viewer.scene.globe.depthTestAgainstTerrain=false;
      this.viewer.scene.renderError.addEventListener(()=>this.fail('This browser could not render the 3D scene. Use the directory or try a WebGL-enabled browser.'));
      this.viewer.selectedEntityChanged.addEventListener(entity=>{if(entity?.campusRecord)this.onSelect(entity.campusRecord,false);});
      this.fallback.hidden=true;this.mode='2d';this.setPins(this.pins);this.showAll();
      this.say('2D map · OpenStreetMap · address pins are approximate.');return true;
    }catch(e){this.fail(e.message?.includes('library')?e.message:'Interactive map unavailable: this device or browser may not support WebGL. The directory and project editor still work.');return false;}
  }
  fail(message){
    if(this.viewer){try{this.viewer.destroy();}catch{}this.viewer=null;}
    this.tileset=null;this.model=null;this.container.replaceChildren();this.fallback.hidden=false;
    document.getElementById('fallback-message').textContent=message;
    document.getElementById('load-map').textContent='RETRY INTERACTIVE MAP ↗';this.say(message);
  }
  setPins(records){
    this.pins=records;
    if(!this.viewer)return;
    const C=root.Cesium;
    for(const e of [...this.viewer.entities.values])if(e.campusRecord)this.viewer.entities.remove(e);
    for(const r of records){
      const color=r.kind==='student'?'#25776c':r.status==='Planned'?'#d59a00':r.status==='Partner'?'#307a9c':'#94243f';
      const e=this.viewer.entities.add({id:'pin-'+r.id,name:r.name,position:C.Cartesian3.fromDegrees(r.lon,r.lat,2),point:{pixelSize:13,color:C.Color.fromCssColorString(color),outlineColor:C.Color.WHITE,outlineWidth:3,disableDepthTestDistance:Number.POSITIVE_INFINITY,heightReference:C.HeightReference.CLAMP_TO_GROUND},label:{text:r.name,font:'600 12px sans-serif',fillColor:C.Color.WHITE,outlineColor:C.Color.fromCssColorString('#15252a'),outlineWidth:3,style:C.LabelStyle.FILL_AND_OUTLINE,pixelOffset:new C.Cartesian2(0,-24),distanceDisplayCondition:new C.DistanceDisplayCondition(0,12000),disableDepthTestDistance:Number.POSITIVE_INFINITY,heightReference:C.HeightReference.CLAMP_TO_GROUND}});
      e.campusRecord=r;
    }
    this.viewer.scene.requestRender();
  }
  showAll(){
    if(!this.viewer)return;const C=root.Cesium;
    const p=this.pins.length?this.pins:root.CAMPUS_LOCATIONS;
    const west=Math.min(...p.map(r=>r.lon))-.06,east=Math.max(...p.map(r=>r.lon))+.06,south=Math.min(...p.map(r=>r.lat))-.04,north=Math.max(...p.map(r=>r.lat))+.04;
    this.viewer.camera.flyTo({destination:C.Rectangle.fromDegrees(west,south,east,north),duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:1.2});
  }
  flyTo(r){
    if(!this.viewer){this.say(r.name+' selected. Load the campus map to fly to its approximate address.');return;}
    const C=root.Cesium;this.viewer.camera.flyTo({destination:C.Cartesian3.fromDegrees(r.lon,r.lat,this.mode==='2d'?2300:950),orientation:{heading:0,pitch:C.Math.toRadians(this.mode==='2d'?-90:-45),roll:0},duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:1.3});
  }
  async setMode(mode){
    if(mode==='photo'&&!this.token){this.say('Connect your Cesium token and enable Google Photorealistic 3D Tiles first.');return false;}
    if(!this.viewer&&!await this.init())return false;
    const C=root.Cesium,viewer=this.viewer;
    if(mode==='photo'){
      this.say('Requesting Google Photorealistic 3D Tiles…');viewer.scene.morphTo3D(0);
      try{
        if(!this.tileset){
          const tiles=await C.createGooglePhotorealistic3DTileset({onlyUsingWithGoogleGeocoder:true});
          if(viewer!==this.viewer||viewer.isDestroyed()){tiles.destroy();return false;}
          tiles.showCreditsOnScreen=true;this.tileset=viewer.scene.primitives.add(tiles);
          tiles.tileFailed.addEventListener(()=>this.say('Some photorealistic tiles could not load. Check token permissions, quota, network, and coverage. Switch to 2D map if needed.'));
        }
        this.tileset.show=true;viewer.scene.globe.show=false;this.mode='photo';
        this.say('Google Photorealistic 3D Tiles · streaming coverage varies · provider credits remain visible.');
      }catch{
        viewer.scene.globe.show=true;this.mode='3d';this.say('Photorealistic tiles could not load. Check your ion token, Google tile access, allowed URLs, and quota. Showing the basic 3D globe.');return false;
      }
    }else{
      if(this.tileset)this.tileset.show=false;viewer.scene.globe.show=true;
      if(mode==='2d')viewer.scene.morphTo2D(0);else viewer.scene.morphTo3D(0);
      this.mode=mode;this.say(mode==='2d'?'2D map · OpenStreetMap · approximate address pins.':'3D globe with a flat map layer · connect photorealistic tiles to see real-world building geometry.');
    }
    viewer.scene.requestRender();return true;
  }
  pickPoint(callback){
    if(!this.viewer){this.say('Load the interactive map first, or enter latitude and longitude in the form.');return false;}
    this.say('Click one point on the map to choose your resource location. Escape cancels.');
    const C=root.Cesium,handler=new C.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    const end=()=>{if(!handler.isDestroyed())handler.destroy();document.removeEventListener('keydown',cancel);};
    const cancel=e=>{if(e.key==='Escape'){end();this.say('Point selection cancelled.');callback(null);}};
    document.addEventListener('keydown',cancel);
    handler.setInputAction(e=>{
      let position;
      if(this.viewer.scene.pickPositionSupported){try{position=this.viewer.scene.pickPosition(e.position);}catch{}}
      if(!position)position=this.viewer.camera.pickEllipsoid(e.position,this.viewer.scene.globe.ellipsoid);
      if(position){const p=C.Cartographic.fromCartesian(position);end();callback({lat:C.Math.toDegrees(p.latitude),lon:C.Math.toDegrees(p.longitude)});}
      else this.say('Choose a point on the ground, not the sky.');
    },C.ScreenSpaceEventType.LEFT_CLICK);return true;
  }
  async placeModel(url,placement){
    if(!this.viewer&&!await this.init())return false;
    if(this.mode==='2d')await this.setMode('3d');
    const C=root.Cesium;this.removeModel();
    const position=C.Cartesian3.fromDegrees(placement.longitude,placement.latitude,placement.height);
    this.model=this.viewer.entities.add({id:'ai-center-concept',name:'AI Center — proposed student concept',position,orientation:C.Transforms.headingPitchRollQuaternion(position,new C.HeadingPitchRoll(C.Math.toRadians(placement.heading),0,0)),model:{uri:url,scale:placement.scale,heightReference:C.HeightReference.RELATIVE_TO_GROUND,minimumPixelSize:0},label:{text:'AI CENTER · PROPOSED CONCEPT',font:'600 12px sans-serif',fillColor:C.Color.WHITE,outlineColor:C.Color.BLACK,outlineWidth:3,style:C.LabelStyle.FILL_AND_OUTLINE,pixelOffset:new C.Cartesian2(0,-65),disableDepthTestDistance:Infinity,distanceDisplayCondition:new C.DistanceDisplayCondition(0,2500)}});
    this.viewer.camera.flyTo({destination:C.Cartesian3.fromDegrees(placement.longitude,placement.latitude-.0016,400),orientation:{heading:0,pitch:C.Math.toRadians(-42),roll:0},duration:1.3});
    this.viewer.scene.requestRender();this.say('AI Center model requested at your selected position. Inspect its loading, scale, ground contact, and orientation. This placement is a student proposal.');return true;
  }
  removeModel(){if(this.viewer&&this.model)this.viewer.entities.remove(this.model);this.model=null;}
}
root.CampusMap=CampusMap;
})(window);

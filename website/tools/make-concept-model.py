"""Build a simple, inspectable GLB massing model. This is not image reconstruction."""
import json,struct
from pathlib import Path
project=Path(__file__).resolve().parents[1]
root=project/'dist' if (project/'dist').is_dir() else project
# Unit cube, separate vertices per face for flat normals; glTF uses Y up.
faces=[([1,0,0],[(.5,-.5,-.5),(.5,.5,-.5),(.5,.5,.5),(.5,-.5,.5)]),([-1,0,0],[(-.5,-.5,.5),(-.5,.5,.5),(-.5,.5,-.5),(-.5,-.5,-.5)]),([0,1,0],[(-.5,.5,-.5),(-.5,.5,.5),(.5,.5,.5),(.5,.5,-.5)]),([0,-1,0],[(-.5,-.5,.5),(-.5,-.5,-.5),(.5,-.5,-.5),(.5,-.5,.5)]),([0,0,1],[(.5,-.5,.5),(.5,.5,.5),(-.5,.5,.5),(-.5,-.5,.5)]),([0,0,-1],[(-.5,-.5,-.5),(-.5,.5,-.5),(.5,.5,-.5),(.5,-.5,-.5)])]
pos=[];norm=[];indices=[]
for i,(n,vs) in enumerate(faces):
 for v in vs:pos.extend(v);norm.extend(n)
 indices.extend([4*i,4*i+1,4*i+2,4*i,4*i+2,4*i+3])
p=struct.pack('<%sf'%len(pos),*pos);n=struct.pack('<%sf'%len(norm),*norm);ix=struct.pack('<%sH'%len(indices),*indices);binary=p+n+ix
colors=[('brick',[.55,.24,.16,1],.86),('limestone',[.76,.72,.63,1],.8),('glass',[.19,.35,.38,1],.16),('frame',[.20,.13,.14,1],.6),('roof',[.28,.29,.29,1],.9),('solar',[.10,.18,.28,1],.25),('plants',[.25,.38,.20,1],1),('walkway',[.65,.64,.59,1],.9)]
g={'asset':{'version':'2.0','generator':'AI 101 deterministic example massing model; not photogrammetry'},'scene':0,'scenes':[{'nodes':[]}],'nodes':[],'meshes':[],'materials':[],'buffers':[{'byteLength':len(binary)}],'bufferViews':[{'buffer':0,'byteOffset':0,'byteLength':len(p),'target':34962},{'buffer':0,'byteOffset':len(p),'byteLength':len(n),'target':34962},{'buffer':0,'byteOffset':len(p)+len(n),'byteLength':len(ix),'target':34963}],'accessors':[{'bufferView':0,'componentType':5126,'count':24,'type':'VEC3','min':[-.5,-.5,-.5],'max':[.5,.5,.5]},{'bufferView':1,'componentType':5126,'count':24,'type':'VEC3'},{'bufferView':2,'componentType':5123,'count':36,'type':'SCALAR'}]}
for name,color,rough in colors:
 g['materials'].append({'name':name,'pbrMetallicRoughness':{'baseColorFactor':color,'metallicFactor':.25 if name in ['glass','solar'] else 0,'roughnessFactor':rough}})
 g['meshes'].append({'primitives':[{'attributes':{'POSITION':0,'NORMAL':1},'indices':2,'material':len(g['materials'])-1}]})
def box(name,x,y,z,w,h,d,mat):
 idx=len(g['nodes']);g['nodes'].append({'name':name,'mesh':mat,'translation':[x,y,z],'scale':[w,h,d]});g['scenes'][0]['nodes'].append(idx)
box('Courtyard paving',0,-.15,4,59,.3,42,7)
for side in [-1,1]:
 x=side*19
 box('Brick wing',x,5,0,18,10,30,0)
 box('Roof',x,10.15,0,18.6,.4,30.5,4)
 box('Stone roof fascia',x,9.8,0,18.6,.5,30.5,1)
 for y in [1,5,9.1]:box('Stone horizontal band',x,y,0,18.2,.35,30.2,1)
 for y in [3,7]:
  for xx in [-5.5,0,5.5]:
   box('Window frame',x+xx,y,15.06,3.5,2.9,.15,3);box('Window glass',x+xx,y,15.16,3.1,2.5,.13,2)
   box('Window mullion',x+xx,y,15.26,.1,2.5,.12,3)
  for z in [-11,-5.5,0,5.5,11]:
   box('Side window frame',side*28.06,y,z,.15,2.9,3.5,3);box('Side glass',side*28.16,y,z,.13,2.5,3.1,2)
   box('Courtyard window frame',side*9.94,y,z,.15,2.9,3.5,3);box('Courtyard glass',side*9.84,y,z,.13,2.5,3.1,2)
 for xx in [-4,4]:
  for z in [-9,-3,3,9]:box('Solar roof module',x+xx,10.5,z,5.8,.3,4.5,5)
box('Central glass atrium',0,5.5,-6,20,11,16,2)
box('Central roof',0,11.2,-6,21,.5,17,1)
for x in [-10,-6.7,-3.3,0,3.3,6.7,10]:box('Atrium mullion',x,5.5,2.06,.16,11,.2,3)
for y in [1,5.5,10.8]:box('Atrium horizontal',0,y,2.07,20,.18,.2,3)
box('Entry canopy',0,3.5,4,10,.3,5,1)
for x in [-4.6,4.6]:box('Canopy support',x,1.7,6,.18,3.4,.18,3)
for x in [-5.5,5.5]:
 box('Stone planter',x,.4,11,2.2,.8,7,1);box('Planting',x,.95,11,1.8,.5,6.5,6)
raw=json.dumps(g,separators=(',',':')).encode();raw+=b' '*((-len(raw))%4);binary+=b'\0'*((-len(binary))%4)
total=12+8+len(raw)+8+len(binary)
(root/'models'/'ai-center-concept.glb').write_bytes(struct.pack('<III',0x46546c67,2,total)+struct.pack('<II',len(raw),0x4e4f534a)+raw+struct.pack('<II',len(binary),0x004e4942)+binary)
print(f'GLB created: {len(g["nodes"])} components, {total} bytes')

import React from 'react';
import {AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,.72,.2,1)};
const mono = '"IBM Plex Mono", monospace';
const ink = '#e5efde';
function Pane({label,icon,id,detail,x,y,width,height,opacity=1,angle=0,reviewer=false}) {
  const compact=height/width<.75;
  return <div style={{position:'absolute',left:x,top:y,width,height,opacity,transform:`translate(-50%,-50%) perspective(1200px) rotateY(${angle}deg)`,padding:width*(compact?.06:.11),display:'flex',flexDirection:'column',color:ink,background:'linear-gradient(130deg, #c8e4c52e, #23483fbb 36%, #10292bc9)',border:'1px solid #d6efc9a6',boxShadow:'inset 0 0 32px #d8f3c51c, 0 18px 50px #0005, 0 0 16px #bdd4b32a',backdropFilter:'blur(8px)',borderRadius:2,boxSizing:'border-box'}}>
    <span style={{fontFamily:mono,fontSize:Math.max(9,width*.044),letterSpacing:'.14em'}}>{label}</span>
    {!compact&&<svg fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" width={width*.14} height={width*.14} style={{marginTop:height*.12,flexShrink:0}}><use href={staticFile('brand/icons/sprite.svg')+'#'+icon}/></svg>}
    {!compact&&<div style={{marginTop:height*.08,display:'grid',gap:height*.035}}>{[.9,.72,.82].map((v,i)=><div key={i} style={{height:1,width:v*100+'%',background:'#b3c7ae70'}}/>)}</div>}
    <div style={{marginTop:'auto',fontFamily:mono,fontSize:Math.max(9,width*(compact?.033:.044)),lineHeight:1.8}}><strong style={{fontWeight:500}}>{id}</strong><div>{detail}</div></div>
    {reviewer&&<span style={{fontFamily:mono,fontSize:Math.max(8,width*.035),color:'#e8c887',marginTop:12}}>REVIEW REQUIRED · UNRESOLVED</span>}
  </div>;
}

// One continuous camera move. Presentation never changes the synthetic disposition.
export function HumanCheckpoint() {
  const frame=useCurrentFrame(); const {fps,width:w,height:h}=useVideoConfig();
  const t=frame/fps; const mobile=w<=700; const s=mobile?Math.min(w/390,1.2):w/1440;
  const key=(a,b,v1,v2)=>interpolate(t,[a,b],[v1,v2],clamp);
  const pull=key(8.1,10.4,0,1), reveal=key(1.8,3.3,0,1), human=key(5.7,6.7,0,1);
  const pw=mobile?Math.min(w*.38,h*.24)*(1-.18*human):Math.min(w*.23,h*.30), ph=pw*1.33;
  const finalW=mobile?w*.78:Math.min(230*s,w*.17), finalH=mobile?110*s:235*s;
  const panelW=pw+(finalW-pw)*pull,panelH=ph+(finalH-ph)*pull;
  const centerY=mobile?h*.50:h*.59;
  const y=centerY+(h*(mobile?.69:.79)-centerY)*pull;
  const sourceX=key(0,3,w*.5,mobile?w*.25:w*.32) - (mobile?0:w*.08*human);
  const finalGap=mobile?0:finalW+54*s;
  const leftX=sourceX+(w*.5-finalGap-sourceX)*pull;
  const codeX=mobile?w*.75:w*(.68-.18*human);
  const cx=codeX+(w*.5-codeX)*pull;
  const rx=mobile?w*.5:w*.78;
  const rightX=rx+(w*.5+finalGap-rx)*pull;
  const finalOpacity=key(9.5,10.4,1,0);
  const traceLeft=leftX+panelW*.46, traceWidth=Math.max(16,cx-leftX-panelW*.92);
  const sceneTitle=t<2.5?'Every claim begins with a record.':t<5.8?'Insufficient evidence.':'The evidence pauses.\nThe coder decides.';
  const titleIn=t<2.5?key(0,.7,0,1)*key(2.1,2.5,1,0):t<5.8?key(2.5,3.1,0,1)*key(5.4,5.8,1,0):key(5.8,6.5,0,1)*key(8.4,9.1,1,0);
  return <AbsoluteFill style={{background:'#0c191c',fontFamily:'Inter, sans-serif',overflow:'hidden',color:ink}}>
    <style>{`@font-face{font-family:Inter;src:url('${staticFile('brand/fonts/Inter.woff2')}');font-weight:100 900;}@font-face{font-family:Marcellus;src:url('${staticFile('brand/fonts/Marcellus.woff2')}');}@font-face{font-family:'IBM Plex Mono';src:url('${staticFile('brand/fonts/IBMPlexMono.woff2')}');}`}</style>
    <Img src={staticFile('assets/architecture.webp')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',scale:interpolate(t,[0,3,6,10.4],[1.22,1.12,1.08,1],clamp),objectPosition:'50% 50%'}}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,#07111488,#07111422 55%,#08171922)',opacity:key(8.1,10.4,1,.4)}}/>
    <div style={{position:'absolute',left:'8%',right:'8%',top:mobile?'15%':'13%',textAlign:'center',opacity:titleIn,translate:`0 ${key(0,1,14,0)}px`}}>
      <div style={{font: `${10*s}px ${mono}`,letterSpacing:'.25em',color:'#bad0b7',marginBottom:22*s}}>CODINGRECORD / THE HUMAN CHECKPOINT</div>
      <div style={{fontFamily:t>=2.5?'Marcellus,serif':'Inter,sans-serif',fontSize:mobile?35*s:63*s,lineHeight:1.08,letterSpacing:'-.035em',whiteSpace:'pre-line',color:t>=2.5&&t<5.8?'#f2dba7':ink}}>{sceneTitle}</div>
    </div>
    {/* The trace always retains a gap. The moving light stops before it. */}
    <div style={{position:'absolute',left:traceLeft,width:traceWidth,top:y+panelH*.08,height:2*s,opacity:reveal*finalOpacity,background:'linear-gradient(90deg,#d5eacc 0%,#d5eacc 38%,transparent 38%,transparent 62%,#d5eacc88 62%,#d5eacc88 100%)',boxShadow:'0 0 20px #cbecc333',scale:`${key(1,3.2,0,1)} 1`,transformOrigin:'left center'}}/>
    <div style={{position:'absolute',left:traceLeft+traceWidth*.5-5*s,top:y+panelH*.08-5*s,width:10*s,height:10*s,borderRadius:'50%',background:'#eac273',boxShadow:'0 0 24px #e5ac57',opacity:reveal*finalOpacity}}/>
    <div style={{position:'absolute',left:cx+panelW*.46,width:Math.max(0,rightX-cx-panelW*.92),top:y+panelH*.08,height:1,background:'#cce3c18a',opacity:mobile?0:human*finalOpacity}}/>
    <Pane label="SOURCE NOTE" icon="file-text" id="DEMO-NOTE-002" detail="Supporting detail: unresolved." x={leftX} y={mobile?y-130*s*pull:y} width={panelW} height={panelH} opacity={key(0,1,0,1)} angle={key(0,3,-18,12)*(1-pull)}/>
    <Pane label="PROPOSED CODE" icon="layout-columns" id="CODE-A" detail="Fictional · non-billable" x={cx} y={y} width={panelW} height={panelH} opacity={reveal} angle={-12*(1-pull)}/>
    <Pane label="HUMAN REVIEW" icon="user" id="Coder B · fictional role" detail="No code changed." reviewer x={rightX} y={mobile?y+Math.min(180,h*.19)*(1-pull):y} width={panelW} height={panelH+(mobile?55*s:0)} opacity={human*(1-pull)} angle={-16*(1-pull)}/>
    <Pane label="DATED RULE" icon="history" id="DEMO-RULE vB" detail="Effective 01 Oct 2026" x={rightX} y={mobile?y+130*s:y} width={panelW} height={panelH} opacity={pull} angle={0}/>
    <div style={{position:'absolute',bottom:mobile?'10%':'9%',left:'8%',right:'8%',textAlign:'center',fontSize:mobile?12*s:15*s,lineHeight:1.6,color:'#d9e4d1',opacity:human*key(8.4,9.3,1,0)}}>No code changed. No claim submitted.<br/><span style={{fontSize:mobile?10*s:12*s,color:'#becbb8'}}>Review still requires a click.</span></div>
    <div style={{position:'absolute',bottom:28*s,left:36*s,font:`${Math.max(8,9*s)}px ${mono}`,letterSpacing:'.15em',opacity:finalOpacity,color:'#d1deca'}}>DEMO / SYNTHETIC DATA · CONCEPT PREVIEW</div>
    <div style={{position:'absolute',bottom:0,left:0,height:2,width:`${t/10.5*100}%`,background:'#cfe2c1',opacity:.5}}/>
  </AbsoluteFill>;
}

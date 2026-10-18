import React, {useEffect, useRef, useState} from 'react';
import {Player} from '@remotion/player';
import {HumanCheckpoint} from './HumanCheckpoint';

export default function IntroPlayer({onEnded,paused,onProgress}) {
  const ref=useRef(null);
  const [size,setSize]=useState(()=>({width:window.innerWidth,height:window.innerHeight}));
  useEffect(()=>{const resize=()=>setSize({width:window.innerWidth,height:window.innerHeight});window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[]);
  useEffect(()=>{
    const player=ref.current;if(!player)return;
    const progress=e=>onProgress(Math.min(1,e.detail.frame/314));
    player.addEventListener('ended',onEnded);player.addEventListener('frameupdate',progress);
    return()=>{player.removeEventListener('ended',onEnded);player.removeEventListener('frameupdate',progress);};
  },[onEnded,onProgress]);
  useEffect(()=>{const p=ref.current;if(paused)p?.pause();else p?.play();},[paused]);
  useEffect(()=>{const visibility=()=>{if(document.hidden)ref.current?.pause();else if(!paused)ref.current?.play();};document.addEventListener('visibilitychange',visibility);return()=>document.removeEventListener('visibilitychange',visibility);},[paused]);
  return <Player ref={ref} component={HumanCheckpoint} durationInFrames={315} compositionWidth={size.width} compositionHeight={size.height} fps={30} autoPlay initiallyMuted controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} style={{width:'100%',height:'100%'}} errorFallback={()=> <div className="intro-error">The intro could not load. Select “Skip intro” to enter CodingRecord.</div>}/>;
}

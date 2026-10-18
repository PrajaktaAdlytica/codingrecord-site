import React,{lazy,Suspense,useState,useEffect,useCallback,useRef} from 'react';
const IntroPlayer=lazy(()=>import('./IntroPlayer'));
class IntroBoundary extends React.Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div className="intro-error">The intro could not load. Select “Skip intro” to enter CodingRecord.</div>:this.props.children;}
}
export function IntroOverlay({onPhase,onDone}) {
  const [paused,setPaused]=useState(false),[exiting,setExiting]=useState(false),[progress,setProgress]=useState(0);
  const finished=useRef(false),timer=useRef(null),skipRef=useRef(null);
  const finish=useCallback(()=>{
    if(finished.current)return;finished.current=true;setExiting(true);onPhase('exiting');
    timer.current=setTimeout(()=>{onDone();requestAnimationFrame(()=>document.getElementById('main')?.focus({preventScroll:true}));},520);
  },[onPhase,onDone]);
  useEffect(()=>{
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    skipRef.current?.focus({preventScroll:true});
    const key=e=>{if(e.key==='Escape'){e.preventDefault();finish();} if(e.key==='Tab'){
      const controls=[...document.querySelectorAll('.intro-controls button')];
      if(e.shiftKey&&(document.activeElement===controls[0]||!controls.includes(document.activeElement))){e.preventDefault();controls.at(-1)?.focus();}
      else if(!e.shiftKey&&(document.activeElement===controls.at(-1)||!controls.includes(document.activeElement))){e.preventDefault();controls[0]?.focus();}
    }};
    document.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key);clearTimeout(timer.current);};
  },[finish]);
  return <section className={'intro-overlay'+(exiting?' is-leaving':'')} role="dialog" aria-modal="true" aria-label="CodingRecord introduction" aria-describedby="intro-description">
    <p id="intro-description" className="sr-only">A ten-second synthetic evidence story. Evidence remains unresolved and requires a human coder. Escape or Skip intro opens the website.</p>
    <div aria-hidden="true" className="intro-film"><IntroBoundary><Suspense fallback={<div className="intro-loading"><span>The human checkpoint.</span></div>}><IntroPlayer onEnded={finish} onProgress={setProgress} paused={paused}/></Suspense></IntroBoundary></div>
    <div className="intro-controls">
      <span className="intro-counter" aria-hidden="true">{String(Math.min(10,Math.floor(progress*10.5))).padStart(2,'0')} / 10</span>
      <button onClick={()=>setPaused(v=>!v)} aria-label={paused?'Resume intro':'Pause intro'}>{paused?'Resume':'Pause'}</button>
      <button ref={skipRef} onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
  </section>;
}

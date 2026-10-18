import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {HumanCheckpoint} from './HumanCheckpoint';

registerRoot(() => <>
  <Composition id="HumanCheckpoint" component={HumanCheckpoint} durationInFrames={315} fps={30} width={1920} height={1080}/>
  <Composition id="HumanCheckpointMobile" component={HumanCheckpoint} durationInFrames={315} fps={30} width={390} height={844}/>
</>);

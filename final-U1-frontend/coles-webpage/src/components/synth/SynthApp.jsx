import React, { useState } from 'react';
import SynthTrack from './SynthTrack';
import '../synth/SynthTrack.css';

const SynthApp = () => {
    const [activeTrack, setActiveTrack] = useState(1);

    return (
        <div className='synth'>

        <h1>Syntheszier DAW</h1>

        <div>
            <p>Choose Keyboard</p>
            <button onClick={() => setActiveTrack(1)}>Track 1: Lead</button>
            <button onClick={() => setActiveTrack(2)}>Track 2: Bass</button>
        </div>

        <div>
            <h3>Lead</h3>
            <SynthTrack isActive={activeTrack === 1}/>
        </div>

        <div>
            <h3>Bass</h3>
            <SynthTrack isActive={activeTrack === 2} defaultOctave={-1} />
        </div>

        </div>
    );
};

export default SynthApp;
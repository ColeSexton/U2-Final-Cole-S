import React, { useState } from 'react';
import SynthTrack from './SynthTrack';
import '../synth/SynthTrack.css';
import Header from '../reuse/Header';
import Footer from '../reuse/Footer';

const SynthApp = () => {
    const [activeTrack, setActiveTrack] = useState(1);

    return (
        <div>
        <Header />
        <div className='synth'>

        <h1>Syntheszier DAW</h1>

        <div>
            <p>Choose Keyboard</p>
            <button onClick={() => setActiveTrack(1)}>Track 1: Lead</button>
            <button onClick={() => setActiveTrack(2)}>Track 2: Bass</button>
        </div>

        <div>
            <h3>Lead</h3>
            <SynthTrack isActive={activeTrack === 1} octaveShift={0}/>
        </div>

        <div>
            <h3>Bass</h3>
            <SynthTrack isActive={activeTrack === 2} octaveShift={-1} />
        </div>

        </div>
        
        </div>
    );
};

export default SynthApp;
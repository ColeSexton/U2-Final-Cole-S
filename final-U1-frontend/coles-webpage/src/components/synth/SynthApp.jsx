import React from 'react';
import SynthTrack from './SynthTrack';
import '../synth/SynthTrack.css';

const SynthApp = () => {
    return (
        <div className='synth'>

        <h1>Syntheszier DAW</h1>

        <div>
            <h3>Lead</h3>
            <SynthTrack />
        </div>

        <div>
            <h3>Bass</h3>
            <SynthTrack defaultWaveform='sine' defaultOctave={-1} />
        </div>

        </div>
    );
};

export default SynthApp;
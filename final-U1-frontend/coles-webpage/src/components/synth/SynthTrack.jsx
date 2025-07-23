import React, { useState, useRef, useEffect } from 'react';
import { createSynth } from '../utils/audioUtils';

const keyboardNotes = {
    a: 261.63, //c 
    w: 277.18, //c#
    s: 293.66, // d
    e: 311.13, //d#
    d: 329.63, //e
    f: 349.23, //f
    t: 369.99, //f#
    g: 392, //g
    y: 415.30, //g#
    h: 440, //a
    u: 466.16, //a#
    j: 493.88, //b
    k: 523.25 //c
}

const SynthTrack = () =>{
    const audioCtxRef = useRef(null);
    const [waveform, setWaveForm] = useState('sine');
    const activeOscillators = useRef({});

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if(!keyboardNotes[key] || activeOscillators.current[key]) return;

            if(!audioCtxRef.current){
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const {osc, gain} = createSynth(audioCtxRef.current, waveform, keyboardNotes[key]);
            osc.start();
            activeOscillators.current[key] = {osc, gain};
        };

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            const synth = activeOscillators.current[key];

            if (synth){
                synth.osc.stop();
                delete activeOscillators.current[key];
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };


    }, [waveform]);

    return (
            <div>
      <h2>🎹 Synth Keyboard</h2>

      <label>
        Waveform:
        <select value={waveform} onChange={(e) => setWaveForm(e.target.value)}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </label>

      <div>
        <p>Use keys <strong>A</strong> to <strong>K</strong> to play notes.</p>
      </div>
    </div>
  );
};

export default SynthTrack;
    


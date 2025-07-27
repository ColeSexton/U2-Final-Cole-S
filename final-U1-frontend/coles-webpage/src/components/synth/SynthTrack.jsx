import React, { useState, useRef, useEffect } from 'react';
import { createSynth } from '../utils/audioUtils';
import '../synth/SynthTrack.css'; 

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

//for UI piano 
const noteKeyFreq = [
    {note: "C4", key: "a", freq: 261.63},
    {note: "C#4", key: "w", freq: 277.18},
    {note: "D4", key: "s", freq: 293.66},
    {note: "D#4", key: "e", freq: 311.13},
    {note: "E4", key: "d", freq: 329.63},
    {note: "F4", key: "f", freq: 349.23},
    {note: "F#4", key: "t", freq: 369.99},
    {note: "G4", key: "g", freq: 392},
    {note: "G#4", key: "y", freq: 415.30},
    {note: "A4", key: "h", freq: 440},
    {note: "A#4", key: "u", freq: 466.16},
    {note: "B4", key: "j", freq: 493.88},
    {note: "C5", key: "k", freq: 523.25},

]

const SynthTrack = ({ defaultWaveform = 'sine', octaveShift = 0, isActive = false}) =>{
    const audioCtxRef = useRef(null);
    const [waveform, setWaveForm] = useState('sine');
    const activeOscillators = useRef({});

    //ADSR State variables
    const [attack, setAttack] = useState(0.1);
    const [decay, setDecay] = useState(0.2);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(0.3);

    const playNote = (baseFreq, keyId) => {

        const freq = baseFreq * Math.pow(2,octaveShift);
        const now = audioCtxRef.current?.currentTime || 0;
        
        if(!audioCtxRef.current){
            audioCtxRef.current = new(window.AudioContext)();
        }

        if(activeOscillators.current[keyId]) return;

        const {osc, gain} = createSynth(audioCtxRef.current, waveform, freq);

        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + attack) // (target value, endTime) ramp up to 1 over attack value.
        gain.gain.linearRampToValueAtTime(sustain, now + attack + decay)

    
        osc.start();
        activeOscillators.current[keyId] = {osc, gain};

    };

    const stopNote = (keyId) => {
        const synth = activeOscillators.current[keyId];
        if (synth){
            synth.osc.stop();
            delete activeOscillators.current[keyId];
        }
    };

    useEffect(() => {
        if(!isActive) return;

        const handleKeyDown = (e) => {
            const key = e.key;
            if(!keyboardNotes[key]) return;
            playNote(keyboardNotes[key], key)
        };

        const handleKeyUp = (e) => {
            stopNote(e.key);

        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };


    }, [isActive,waveform]);

    return (
            <div className='synth'>
    

      <label>
        Waveform:
        <select value={waveform} onChange={(e) => setWaveForm(e.target.value)}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </label>

      <div className='piano'>
        {noteKeyFreq.map(({note, key, freq})=>(
            <button
                className='pianoKeys'
                key={note}
                onMouseDown={() => playNote(freq, key)}
                onMouseUp={()=> stopNote(key)}
            >
            {note}
            <br />
            ({key})
            </button>
        ))}
      </div>
    </div>
  );
};

export default SynthTrack;
    


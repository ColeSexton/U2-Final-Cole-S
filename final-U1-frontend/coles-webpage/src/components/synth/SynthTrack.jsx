import React, { useState, useRef, useEffect } from 'react';
import { create3BandEQ, createSynth } from '../utils/audioUtils';
import '../synth/SynthTrack.css'; 
import ADSRControls from './ADSRControls';
import EchoControl from './EchoControl';
import EQControl from './EQControl';

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

    //echo state variables
    const [echoTime, setEchoTime] = useState(0.3);
    const [feedback, setFeedback] = useState(0.4);
    const [mix, setMix] = useState(0.5);

    const delayNodeRef = useRef(null);
    const feedbackGainRef = useRef(null);
    const wetGainRef = useRef(null);
    const dryGainRef = useRef(null);
    const finalMixGainRef = useRef(null);


    //eq state and ref

    const [lowGain, setLowGain] = useState(0);
    const [midGain, setMidGain] = useState(0);
    const [highGain, setHighGain] = useState(0);

    const eqRef = useRef(null);


    useEffect(()=>{
        if(!audioCtxRef.current){
            audioCtxRef.current = new (window.AudioContext)();
        }
        
        const audioCtx =audioCtxRef.current;
        
        const delayNode = audioCtx.createDelay();
        const feedbackGain = audioCtx.createGain();
        const wetGain = audioCtx.createGain();
        const dryGain = audioCtx.createGain();
        const finalMixGain = audioCtx.createGain();

        finalMixGain.gain.value = 1;

        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);

        delayNode.connect(wetGain);


        //storing refs
        delayNodeRef.current = delayNode;
        feedbackGainRef.current = feedbackGain;
        wetGainRef.current = wetGain;
        dryGainRef.current = dryGain;
        finalMixGainRef.current =finalMixGain;
    

        
        delayNode.delayTime.value = echoTime;
        feedbackGain.gain.value = feedback;
        wetGain.gain.value = mix;
        dryGain.gain.value = 1 - mix;


        if(!eqRef.current){
            const eq = create3BandEQ(audioCtx);
            eqRef.current = eq;

          }
   
            wetGain.connect(finalMixGain);
            dryGain.connect(finalMixGain);

            finalMixGain.connect(eqRef.current.input);
            eqRef.current.output.connect(audioCtx.destination);
       

    },[]);

    useEffect(()=>{
        if(!delayNodeRef.current) return;

        delayNodeRef.current.delayTime.setValueAtTime(echoTime, audioCtxRef.current.currentTime);
        feedbackGainRef.current.gain.setValueAtTime(feedback, audioCtxRef.current.currentTime);
        wetGainRef.current.gain.setValueAtTime(mix, audioCtxRef.current.currentTime);
        dryGainRef.current.gain.setValueAtTime(1 - mix, audioCtxRef.current.currentTime);


    },[echoTime, feedback, mix]);


    useEffect(()=>{
        if(!eqRef.current ) return;
  
        eqRef.current.setLowGain(lowGain);
        eqRef.current.setMidGain(midGain);
        eqRef.current.setHighGain(highGain);


    }, [lowGain, midGain, highGain]);



    const playNote = (baseFreq, keyId) => {
        if(!audioCtxRef.current){
            audioCtxRef.current = new(window.AudioContext)();
        }

        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }

        if(activeOscillators.current[keyId]) return;

        const audioCtx = audioCtxRef.current
        const freq = baseFreq * Math.pow(2,octaveShift);
        const now = audioCtx.currentTime
        
        
        const {osc, gain} = createSynth(audioCtx, waveform, freq);

        gain.connect(dryGainRef.current);
        gain.connect(delayNodeRef.current);

        //adsr
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + attack) // (target value, endTime) ramp up to 1 over attack value.
        gain.gain.linearRampToValueAtTime(sustain, now + attack + decay)

        osc.start(now);
        activeOscillators.current[keyId] = {osc, gain};

    };

    const stopNote = (keyId) => {
        const synth = activeOscillators.current[keyId];

        if (synth){

            const now = audioCtxRef.current.currentTime;

            synth.gain.gain.cancelScheduledValues(now);
            synth.gain.gain.setValueAtTime(synth.gain.gain.value, now);
            synth.gain.gain.linearRampToValueAtTime(0, now + release);


            synth.osc.stop(now + release);
            delete activeOscillators.current[keyId];
        }
    };

    useEffect(() => {
        if(!isActive) return;

        const resumeCtx = () => {
            if (audioCtxRef.current && audioCtxRef.current.state === 'suspended'){
                audioCtxRef.current.resume();
            }
        };

        window.addEventListener('keydown', resumeCtx,{once: true});
        window.addEventListener('mousedown', resumeCtx,{once: true});

        const handleKeyDown = (e) => {
            if(e.repeat) return;
            const key = e.key.toLowerCase();
            if(!keyboardNotes[key]) return;
            playNote(keyboardNotes[key], key)
        };

        const handleKeyUp = (e) => {
            stopNote(e.key.toLowerCase());

        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keydown', resumeCtx);
            window.removeEventListener('mousedown', resumeCtx);
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
       
        <ADSRControls 
            attack={attack} setAttack={setAttack}
            decay={decay} setDecay={setDecay}
            sustain={sustain} setSustain={setSustain}
            release={release} setRelease={setRelease}
        />
        <br />

        <EchoControl
            echoTime={echoTime}
            setEchoTime={setEchoTime}
            feedback={feedback}
            setFeedback={setFeedback}
            mix={mix}
            setMix={setMix}
            delayNodeRef ={delayNodeRef}
            feedbackGainRef ={feedbackGainRef}
            wetGainRef = {wetGainRef}
            dryGainRef ={dryGainRef}
        />
        <br />

        <EQControl
            lowGain={lowGain}
            setLowGain={setLowGain}
            midGain={midGain}
            setMidGain={setMidGain}
            highGain={highGain}
            setHighGain={setHighGain}
        />

      <div className='piano'>
        {noteKeyFreq.map(({note, key, freq})=>(
            <button
                className='pianoKeys'
                key={note}
                onMouseDown={() => {playNote(freq, key);
                    }}
                    
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
    


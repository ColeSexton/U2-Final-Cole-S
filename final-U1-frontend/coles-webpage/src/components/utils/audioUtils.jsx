export function createSynth(audioCtx, waveform ='sine', frequency= 440,){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = waveform;
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0, audioCtx.currentTime);


    osc.connect(gain);

    return {osc, gain};
    
}
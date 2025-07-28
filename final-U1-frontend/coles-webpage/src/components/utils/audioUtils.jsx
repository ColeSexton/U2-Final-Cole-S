export function createSynth(audioCtx, waveform ='sine', frequency= 440,){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = waveform;
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0, audioCtx.currentTime);


    osc.connect(gain);

    return {osc, gain};
    
}


export function create3BandEQ(audioCtx){
    
    //low shelf filter 
    const lowShelf = audioCtx.createBiquadFilter();
    lowShelf.type = 'lowshelf'
    lowShelf.frequency.value = 200;

    //mid
    const mid = audioCtx.createBiquadFilter();
    mid.type = 'peaking';
    mid.frequency.value = 1000;
    mid.Q.value = 1;

    //high shelf
    const highShelf = audioCtx.createBiquadFilter();
    highShelf.type = "highshelf";
    highShelf.frequency.value = 5000;

    lowShelf.connect(mid);
    mid.connect(highShelf);

    return{
        input: lowShelf,
        output: highShelf,
        lowShelf,
        mid,
        highShelf,

        setLowGain(db){
            lowShelf.gain.setValueAtTime(db, audioCtx.currentTime);
        },
        setMidGain(db){
            mid.gain.setValueAtTime(db, audioCtx.currentTime);
        },
        setHighGain(db){
            highShelf.gain.setValueAtTime(db, audioCtx.currentTime);
        },
    };

}
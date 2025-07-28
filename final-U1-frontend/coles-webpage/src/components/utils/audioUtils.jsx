export function createSynth(audioCtx, waveform ='sine', frequency= 440, echo = {time: 0, feedback: 0, mix: 0}){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = waveform;
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);

    const delayNode = audioCtx.createDelay();
    delayNode.delayTime.value = echo.time;

    const feedbackGain = audioCtx.createGain();
    feedbackGain.gain.value = echo.feedback;

    const wetGain = audioCtx.createGain();
    wetGain.gain.value = echo.feedback;

    const dryGain = audioCtx.createGain();
    dryGain.gain.value = 1 - echo.mix;

    delayNode.connect(feedbackGain);
    feedbackGain.connect(delayNode);

    gain.connect(dryGain);
    gain.connect(delayNode);
    delayNode.connect(wetGain);

    dryGain.connect(audioCtx.destination);
    wetGain.connect(audioCtx.destination);


    osc.connect(gain);

    return {osc, gain, feedbackGain, wetGain, dryGain };
    

}
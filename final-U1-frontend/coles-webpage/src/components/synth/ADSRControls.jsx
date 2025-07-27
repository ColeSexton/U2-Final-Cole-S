import React from 'react';

const ADSRControls =({attack, decay, sustain, release, setAttack, setDecay, setSustain, setRelease}) =>{

    return(
    <div className='adsrControls'>

        <label>
            Attack:
            <input type='range' min="0" max="4" step="0.1" value={attack} onChange={setAttack(parseFloat(e.target.value))}/>
            {attack}s
        </label>

        <label>
            Decay:
            <input type='range' min="0" max="3" step="0.1" value={decay} onChange={setDecay(parseFloat(e.target.value))} />
            {decay}s
        </label>

        <label>
            Sustain:
            <input type='range'  min="0" max="1" step="0.1" value={sustain} onChange={setSustain(parseFloat(e.target.value))}/>
            {sustain}
        </label>

        <label>
            Release:
            <input type='range' min="0" max="4" step="0.1" value={release} onChange={setRelease(parseFloat(e.target.value))}/>
            {release}s
        </label>
        
    </div>
    );
};

export default ADSRControls;
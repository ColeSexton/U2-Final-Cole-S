import React from 'react';

const ADSRControls =({attack, decay, sustain, release, setAttack, setDecay, setSustain, setRelease}) =>{

    return(
    <div className='adsrControls'>

        <label>
            Attack:
            <input type='range' min="0" max="2" step="0.01" value={attack} onChange={(e) => setAttack(parseFloat(e.target.value))}/>
            {attack}s
        </label>

        <label>
            Decay:
            <input type='range' min="0" max="2" step="0.01" value={decay} onChange={(e) => setDecay(parseFloat(e.target.value))} />
            {decay}s
        </label>

        <label>
            Sustain:
            <input type='range'  min="0" max="1" step="0.01" value={sustain} onChange={(e) => setSustain(parseFloat(e.target.value))}/>
            {sustain}
        </label>

        <label>
            Release:
            <input type='range' min="0" max="4" step="0.01" value={release} onChange={(e) => setRelease(parseFloat(e.target.value))}/>
            {release}s
        </label>
        
    </div>
    );
};

export default ADSRControls;
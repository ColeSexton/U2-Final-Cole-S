const EQControl = ({lowGain, setLowGain, midGain, setMidGain, highGain, setHighGain}) =>{

    return(
        <div className="eqControls">

            <label> 
                Low:
                <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={lowGain}
                    onChange={(e) => setLowGain(parseFloat(e.target.value))}
                 />
                 {lowGain}db
            </label>

            <label>
                Mid:
                <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={midGain}
                    onChange={(e) => setMidGain(parseFloat(e.target.value))}
                />
                {midGain}db
            </label>

            <label>
                High:
                <input 
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"   
                    value={highGain}
                    onChange={setHighGain(parseFloat(e.target.value))}                 
                />
                {highGain}db
            </label>

        </div>
    );


};

export default EQControl;
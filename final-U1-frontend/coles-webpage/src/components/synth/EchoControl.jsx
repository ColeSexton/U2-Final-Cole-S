const EchoControl =({echoTime, setEchoTime, feedback, setFeedback, mix, setMix, delayNodeRef, feedbackGainRef, wetGainRef, dryGainRef}) =>{
    return(
        <div className="echoControls">
            <label>
                Echo Time:
                <input type="range" min="0" max="1" step="0.01" 
                value={echoTime}

                onChange={(e) => {
                const value = parseFloat(e.target.value);
                setEchoTime(value);
                if (delayNodeRef.current){
                    delayNodeRef.current.delayTime.setValueAtTime(value, delayNodeRef.current.context.currentTime);
                    }
                }}
                />
                {echoTime}s
            </label>

            <label>
                Feedback:
                <input type="range" min="0" max="0.9" step="0.01" 
                value={feedback} 
                onChange={(e)=> {
                const value = parseFloat(e.target.value)
                setFeedback(value);
                if(feedbackGainRef.current){
                    feedbackGainRef.current.gain.value = value;
                } 
                }}/>
                {feedback}
            </label>

            <label>
                Mix:
                <input type="range" min="0" max="1" step="0.01" 
                value={mix} 
                onChange={(e)=> {
                const value = parseFloat(e.target.value);
                setMix(value);
                if (wetGainRef.current && dryGainRef.current){
                    wetGainRef.current.gain.value = value;
                    dryGainRef.current.gain.value = 1 -value;
                }
                }}/>
                {mix}
            </label>

        </div>
    );

};

export default EchoControl;
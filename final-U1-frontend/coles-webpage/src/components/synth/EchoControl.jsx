const EchoControl =({echoTime, setEchoTime, feedback, setFeedback, mix, setMix}) =>{
    return(
        <div className="echoControls">
            <label>
                Echo Time:
                <input type="range" min="0" max="1" step="0.01" 
                value={echoTime}

                onChange={(e) => setEchoTime(parseFloat(e.target.value))}/>
                {echoTime}s
            </label>

            <label>
                Feedback:
                <input type="range" min="0" max="0.9" step="0.01" 
                value={feedback} 
                onChange={(e)=> setFeedback(parseFloat(e.target.value))}/>
                {feedback}
            </label>

            <label>
                Mix:
                <input type="range" min="0" max="1" step="0.01" 
                value={mix} 
                onChange={(e)=> setMix(parseFloat(e.target.value))}/>
                {mix}
            </label>

        </div>
    );

};

export default EchoControl;
import { useEffect, useRef, useState } from 'react';
import '../synth/SynthTrack.css'
const SynthFader =({audioCtx, inputNode}) =>{

    const gainNodeRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [level, setLevel] = useState(0);


    useEffect(() =>{

        if(!audioCtx || !inputNode) return;


        const gainNode = audioCtx.createGain();
        const analyser = audioCtx.createAnalyser();

        analyser.fftSize = 256;

        inputNode.connect(gainNode);
        gainNode.connect(analyser);
        //analyser.connect(audioCtx.destination);

        gainNodeRef.current = gainNode;
        analyserRef.current = analyser;

        gainNode.connect(audioCtx.destination);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);


        //calculate RMS to determine loudness for metering 
        const updateMeter = () =>{
            analyser.getByteTimeDomainData(dataArray);
            const rms = Math.sqrt(dataArray.reduce((sum, v) =>{
                const normalized = (v - 128) / 128;
                return sum + normalized * normalized;

            }, 0)/ dataArray.length);

            setLevel(Math.min(rms,1));
            animationFrameRef.current = requestAnimationFrame(updateMeter);
        };

            updateMeter();

            return () => cancelAnimationFrame(animationFrameRef.current);

    }, [audioCtx, inputNode]);


    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);

        if(gainNodeRef.current){
            gainNodeRef.current.gain.setValueAtTime(val, audioCtx.currentTime);
        }
    };

    return(
        <div className='synthFader'>

            <input
                type='range'
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className='volumeSlider'            
            />

            <div className='meterContainer'>
                <div
                    className='meterFill'
                    style={{height: `${level * 100}%`}} 
                ></div>

            </div>

        </div>
    );


};

export default SynthFader;
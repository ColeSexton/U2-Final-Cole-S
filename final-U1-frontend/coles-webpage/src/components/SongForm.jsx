import { useEffect, useState } from "react";
import { FaGuitar, FaMicrophone } from "react-icons/fa";
import { GiDrumKit, GiGuitarBassHead, GiGuitar, GiGrandPiano, GiPianoKeys, GiTambourine  } from "react-icons/gi";
import { BiSolidPiano } from "react-icons/bi";
import { LuGuitar } from "react-icons/lu";
import "./SongForm.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./reuse/Header";


const SongForm = () =>{
const location =useLocation();
const [formData, setFormData] = useState({
    id: "",
    songFormId:"",
    name: "",
    email:  "",
    phone: "",
    title:  "",
    genre: "",
    style: "",
    instruments: [],
    lyricsIncluded:  "no",
    lyricsText:"",
    length:  "",
    forSomeone:  "no",
    forSomeoneExplain: "",
    emotions: "",
    extraInfo: "",
    bounce:[]

});

const bounceOptions = ["mp3", "wav", ".logix", "cd", "tape"];
const formatLabels = {
  "mp3": "MP3",
  "wav": "WAV",
  ".logix": "Logic File",
  "cd": "CD",
  "tape": "Cassette Tape"
};

const instrumentIcons ={
    acoustic: <FaGuitar size={40} />,
    electric: <GiGuitar size={40} />,
    bass: <GiGuitarBassHead size={40} />,
    mandolin: <LuGuitar size={40} />,
    piano: <GiGrandPiano size={40} />,
    keyboard: <GiPianoKeys size={40} />,
    synth: <BiSolidPiano size={40} />,
    drums: <GiDrumKit size={40}/>,
    percussion: <GiTambourine size={40}/>,
    vocal: <FaMicrophone size={40} />
}

//new
useEffect(() => {
    if(location.state){
        setFormData(location.state);
    }
}, [location.state]);


const handleChange = (e) =>{
    const {name, value, type, checked} = e.target;

    if(name === "instruments" || name === "bounce"){
        setFormData((formData) =>{
            const updated = checked 
            ? [...formData[name], value]
            : formData[name].filter((item) => item !== value);
            return{
                ...formData,
                [name]: updated
            };

        });
    } else {

    setFormData((formData) => ({
        ...formData,
        [name]: type === "checkbox" ? checked : value
    }));
    }
}

const navigate =useNavigate();


const handleSubmit = async (event) => {
    event.preventDefault();

    //new
    const url = formData.id
    ? `http://localhost:8080/api/submit/${formData.id}`
    :"http://localhost:8080/api/submit";

    const method = formData.id ? "PUT" : "POST";

    const payload ={
        personalInfo:{
            id: formData.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        },
        songFormInfo:{
            id: formData.songFormId,
            title: formData.title,
            genre:formData.genre,
            style: formData.style,
            instruments: formData.instruments,
            lyricsIncluded: formData.lyricsIncluded === "yes",
            lyricsText: formData.lyricsText,
            length: formData.length,
            forSomeone: formData.forSomeone === "yes",
            forSomeoneExplain: formData.forSomeoneExplain,
            emotions: formData.emotions,
            extraInfo: formData.extraInfo,
            bounce: formData.bounce
        }
    };

    try{
        const response = await fetch(url, {
            method,
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Failed to ${method === 'POST'?'submit':'update'} form `);
        }

        const result = await response.json();

        setFormData({
            id:result.personalInfo.id,
            songFormId:result.songFormInfo.Id,
            name: result.personalInfo.name,
            email: result.personalInfo.email,
            phone: result.personalInfo.phone,
            title: result.songFormInfo.title,
            genre: result.songFormInfo.genre,
            style: result.songFormInfo.style,
            instruments: result.songFormInfo.instruments,
            lyricsIncluded: result.songFormInfo.lyricsIncluded ? "yes" : "no",
            lyricsText: result.songFormInfo.lyricsText,
            length: result.songFormInfo.length,
            forSomeone: result.songFormInfo.forSomeone ? "yes" : "no",
            forSomeoneExplain: result.songFormInfo.forSomeoneExplain,
            emotions: result.songFormInfo.emotions,
            extraInfo: result.songFormInfo.extraInfo,
            bounce: result.songFormInfo.bounce

        });

        
    navigate(`/Submission`,{state:{personalInfoId: result.personalInfo.id}});


    } catch (error){
        console.error(error);
        alert(error.message);
        
    }



};



    return(
        <>
        <Header />
        <div className="songForm"> 

            <h1>{formData.id ? "Edit Song Form" : "New Song Form"}</h1>

            <form className="formSelection" onSubmit={handleSubmit}>

            <label for="name"> Name: 
            <input type="text" id="name" name="name" placeholder= "John Doe" value={formData.name} onChange={handleChange} required></input>
            </label>
            <br />

            <label for="email"> Email:
            <input type="email" id="email" name="email" placeholder="example@example.com" value={formData.email} onChange={handleChange} required></input>
            </label>
            <br />

            <label for="phone">Phone:
            <input type="tel" id="phone" name="phone" placeholder="(555) 555-5555" value={formData.phone} onChange={handleChange} required></input>
            </label>

            <hr/>

            <label for="title">Title:
            <textarea type="text" id="title" name="title" rows="1" cols="30" maxLength="100" placeholder="Enter a title or put working" value={formData.title} onChange={handleChange} required></textarea>
            </label>
            <br />

            <label for="genre">Genre:
                <select id="genre" name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">select genre</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="folk">Folk</option>
                <option value="country">Country</option>
                <option value="blues">Blues</option>
                <option value="any">Any</option>               
                </select>
            </label>
            <br />

            <label for="style">Style: <br />
            <textarea type="text" id="style" name="style" rows="4" cols="40" maxLength="400" placeholder="Eleborate on more specific genres. Feel free to use standards like Classic Rock, or create your own and be descriptive " value={formData.style} onChange={handleChange} required></textarea>
            </label>
            <br />
            
            <fieldset className="insBoxes" required>

            <legend>Instruments </legend>
            
            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="acoustic"
            checked={formData.instruments.includes("acoustic")} 
            onChange={handleChange} />
            Acousitc Guitar
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="electric"
            checked={formData.instruments.includes("electric")} 
            onChange={handleChange} />
            Electric Guitar
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="bass"
            checked={formData.instruments.includes("bass")} 
            onChange={handleChange} />
            Bass
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="mandolin"
            checked={formData.instruments.includes("mandolin")} 
            onChange={handleChange} />
            Mandolin
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="piano"
            checked={formData.instruments.includes("piano")} 
            onChange={handleChange} />
            Piano
            </label>
            <br />

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="keyboard"
            checked={formData.instruments.includes("keyboard")} 
            onChange={handleChange} />
            Electric Keyboard
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="synth"
            checked={formData.instruments.includes("synth")} 
            onChange={handleChange} />
            Synthesizer
            </label>
            

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="drums"
            checked={formData.instruments.includes("drums")} 
            onChange={handleChange} />
            Drum Kit
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="percussion"
            checked={formData.instruments.includes("percussion")} 
            onChange={handleChange} />
            Percussion
            </label>

            <label>
            <input 
            type="checkbox" 
            name="instruments" 
            value="vocal"
            checked={formData.instruments.includes("vocal")} 
            onChange={handleChange} />
            Vocal
            </label>
            </fieldset>

            <fieldset>
            <legend>Lyrics</legend>
                <label for="lyricsYes">
                <input type="radio" id="lyricsYes" name="lyricsIncluded" value="yes" checked={formData.lyricsIncluded === "yes"} onChange={handleChange}/>
                Yes
                </label>
               
                <label for="lyricsNo">
                <input type="radio" id="lyricsNo" name="lyricsIncluded" value="no" checked={formData.lyricsIncluded === "no"} onChange={handleChange}/>
                No
                </label>
                <br />

                {formData.lyricsIncluded === "yes" && (
                <textarea 
                type="text" 
                id="lyricsText"
                name="lyricsText" 
                rows="5" cols="50" 
                maxLength="400" 
                placeholder="Type ideas, poems, lyrics, or say that you want me to write lyrics about soemthing!"
                value={formData.lyricsText} 
                onChange={handleChange} required></textarea>
                )}
            </fieldset>

            <label for="length">
            Length: 
            <input type="number" id="length" name="length" placeholder="desired length in seconds" value={formData.length} onChange={handleChange} required ></input>
            </label>

            <fieldset>
                <legend>For Someone?</legend>

                    <label for="forSomeoneYes">
                    <input type="radio" id="forSomeoneYes" name="forSomeone" value="yes" checked={formData.forSomeone === "yes"} onChange={handleChange}/>
                    Yes
                    </label>

                    <label for="forSomeoneNo">
                    <input type="radio" id="forSomeoneNo" name="forSomeone" value="no" checked={formData.forSomeone === "no"} onChange={handleChange}/>
                    No
                    </label>
                    <br />

                    {formData.forSomeone === "yes" && (
                        <textarea 
                        type="text"
                        id="forSomeoneExplain"
                        name="forSomeoneExplain"
                        rows="5" cols="50" 
                        maxLength="400" 
                        placeholder="Who is this song for? this can be a person, group, or project. Please explain!"
                        value={formData.forSomeoneExplain}
                        onChange={handleChange}
                        required></textarea>
                    )}
            </fieldset>
            
            <label for="emotions">
                Emotions:
                <br />
              <textarea type="text" id="emotions" name="emotions" rows="6" cols="20" maxLength="500" placeholder="List some emotions you want to be conveyed" value={formData.emotions} onChange={handleChange} required></textarea>
            </label>
            <br />


            <label for="extraInfo">
                    Additional Information:
                    <br />
                    <textarea type="text" id="extraInfo" name="extraInfo" rows="6" cols="20" maxLength="500" placeholder="Enter any other information you want me to know, or any specifc instruments/sounds you want included."
                    value={formData.extraInfo} onChange={handleChange}></textarea>

            </label>
            
            <fieldset required>
                <legend>How would you like the song delivered to you?</legend>

                    {bounceOptions.map((option) => (
                    <label key={option}>  
                        <input
                        type="checkbox"
                        name="bounce"
                        value={option}
                        checked={formData.bounce.includes(option)}
                        onChange={handleChange}
                        />
                        {formatLabels[option] || option}
                         </label>
                    ))}
            </fieldset>

            <button type="submit" id="submitButton">{formData.id ? "Update" : "Submit"}</button>

            </form>

            <div className="previewSelection">
                <h3>Your Song:</h3>
                <p id="titleP">Title: {formData.title}</p>
                <p>Genre: {formData.genre}</p>
                <p>Style: {formData.style}</p>
                    
                    <div className="previewInstruments">
                    Instruments: <br />
                    {formData.instruments.map((instrument)=>(
                        <span className="instrumentIcon" key={instrument} style={{marginRight: "10px"}}>
                            {instrumentIcons[instrument] || instrument}
                             <div className="instrumentLabel">{instrument}</div>
                        </span>
                    ))}

                    </div>

                {formData.lyricsIncluded === "yes" && <p>Lyrics: {formData.lyricsText}</p> }

                <p>Length: {formData.length} seconds</p>

                {formData.forSomeone === "yes" && <p>This is for: {formData.forSomeoneExplain}</p>}

                <p>Emotions: {formData.emotions}</p>
                <p>Additional Info: {formData.extraInfo}</p>
                <p>Deliverable: {formData.bounce.join(" ")}</p>

            </div>
        </div>
        </>
    )   

}  

export default SongForm;
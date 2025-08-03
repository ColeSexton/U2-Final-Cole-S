import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./reuse/Header";
import Footer from "./reuse/Footer";
const MainPage = () =>{


    return(
        <div className="mainPage">
    
        
            <div id="welcome">
                <h1>Welcome!</h1>
            </div>
    

                <section id="mainButtons">

                    <Link to={'/Bio'} className="navLink">
                    <div className="buttonContainer">
                        <button id="aboutMe">About Me</button>
                        <span className="hide">Learn more about me and this page!</span>
                    </div>
                    </Link>

                    <Link to={'/SongForm'} className="navLink">
                    <div className="buttonContainer">
                        <button id="song">Song</button>
                        <span className="hide">I will write you a song, click me!</span>
                    </div>
                    </Link>

                    <Link to={'/Generator'} className="navLink">
                    <div className="buttonContainer">
                        <button id="gen">Generator</button>
                        <span className="hide">Stuck creatively? I can help!</span>
                    </div>
                    </Link>

                    <Link to={'/synth'} className="navLink">
                    <div className="buttonContainer">
                        <button id="synth">Synth</button>
                        <span className="hide">Play me!</span>
                    </div>
                    </Link>

                </section>


                <div className="mainGif"><img src="https://media1.giphy.com/media/4VWs1GcTDQLtXPuqxM/source.gif" alt="Bass guitar gif"></img>
                </div>

            
        
        </div>
    )


}

export default MainPage;
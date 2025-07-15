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
                    <button id="aboutMe"><Link to={'/Bio'} style={{textDecoration: 'none', color: 'black'}}>About Me</Link></button>
                    <span className="hide">Learn more about me and this page!</span>

                    <button id="song"><Link to={'/SongForm'} style={{textDecoration: 'none', color: 'black'}}>Song</Link></button>
                    <span className="hide">I will write you a song, click me!</span>

                    <button id="gen"><Link to={'/Generator'} style={{textDecoration: 'none', color: 'black'}}>Generator</Link></button>
                    <span className="hide">Stuck creatively? I can help!</span>

                </section>

                <div className="mainGif"><img src="https://media1.giphy.com/media/4VWs1GcTDQLtXPuqxM/source.gif" alt="Bass guitar gif"></img>
                </div>

            
        
        </div>
    )


}

export default MainPage;
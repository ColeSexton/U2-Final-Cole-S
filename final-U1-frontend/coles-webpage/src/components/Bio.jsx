import { Link } from "react-router-dom";
import Footer from "./reuse/Footer";
import Header from "./reuse/Header";
import { FaYoutube } from "react-icons/fa";

const Bio = () =>{

    return(   
        <div>
            <Header/>

            <img id="profilePic" src= "/profilePIC.jpg" alt="Cole in Colorado, in front of mountains."/>
         

            <p id="bioP">
                Hello! I am Cole Sexton. I am Musician, Audio Engineer, and aspiring Developer.<br />
                I truly love everything about music: listening to it, playing it, creating it, you name it!<br />
                I'd be honored if you would check out my music at the links below. <br />
                I would also love to write you a song or soundscape. Whether its for a loved one, yourself,<br />
                or a project you are working on, I am eager to help! Find the Song Form below, let me know<br />
                the details, and you will have your own original song in no time! <br />
                Check out the Generator page for creative ideas for when you are feeling stuck!
            </p>

                <div id="bioLinks">
                    <p>
                        <h3>Links to my Music</h3>
                        <br />

                        <a href={'https://colesexton.bandcamp.com/album/before-the-people'} target="_blank">
                         <i className="fa-brands fa-bandcamp fa-2x" />   
                        </a> 

                        <a href={'https://open.spotify.com/artist/4ZsyQ1tTX0Fqz6PrUw2MsW'} target="_blank"><i className="fa-brands fa-spotify fa-2x" /></a>

                        <a href={'https://www.youtube.com/watch?v=LZc4Tk4U1_M&list=OLAK5uy_m34yo8HtKXGJtFsrj5ygXFrp4UA9RtRw0'} target="_blank"><i className="fa-brands fa-youtube fa-2x" /></a>
                    </p>

                   
                </div>

               
        </div>
    )

}

export default Bio;
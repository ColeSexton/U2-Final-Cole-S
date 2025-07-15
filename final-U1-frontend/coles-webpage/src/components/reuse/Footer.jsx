import './Footer.css'
const Footer = () =>{
    return(
         <footer >
            <div id="footerLeft"><img src="/b3.png"/></div>
            <div id="footerCenter"> &#169; Cole's Audio and Creative Services LLC </div>
            
            <div id="footerRight">
            <a href={'https://open.spotify.com/artist/4ZsyQ1tTX0Fqz6PrUw2MsW'} target="_blank"><i className="fa-brands fa-spotify fa-2x" id='bioLinks'/></a>
 
            <a href={'https://colesexton.bandcamp.com/album/before-the-people'} target="_blank"><i className="fa-brands fa-bandcamp fa-2x" id='bioLinks' /></a> 

             </div>
            
            
        </footer>
      
    )


}

export default Footer;
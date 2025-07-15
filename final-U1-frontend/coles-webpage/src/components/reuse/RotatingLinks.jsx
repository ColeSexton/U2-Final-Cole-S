import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const RotatingLinks = () =>{
    const links = [
        {label: "Cole", to: "https://colesexton.bandcamp.com/album/before-the-people"},
        {label: "p.e.r", to:"https://open.spotify.com/artist/4dxtoXSojWvQn4tGfx1PKn"},
        {label: "Rand", to: "https://open.spotify.com/artist/4CSdnvfcX1QnAyH1KyotCh"}
    ];

    const [index, setIndex] = useState(0);

    useEffect(() =>{ 
        const interval = setInterval(() =>{
            setIndex((prev) => (prev + 1) % links.length);

        }, 4000);
        return () => clearInterval(interval);

    }, []);

    return(

    <div className="rotating-link">

        <Link to={links[index].to} target='_blank'>{links[index].label}</Link>

    </div>

  );

}

export default RotatingLinks;
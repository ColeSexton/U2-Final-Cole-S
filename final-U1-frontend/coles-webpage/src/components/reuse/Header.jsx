import { Link } from "react-router-dom";
import "./Header.css" ;
import RotatingLinks from './RotatingLinks';
const Header = () =>{
    return(
        <nav className="navbar">

            <div className="navbar-left">
                <span className="headerLinks"><Link to={'/'}><i className="fa-solid fa-radio fa-4x navIcon"></i></Link></span>
            </div>
            
            <div className="navbar-center">
            <span className="headerLinks"><Link to={'/'}>Home</Link></span>
            <span className="headerLinks"><Link to={'/SongForm'}>Song Form</Link></span>
            <span className="headerLinks"><Link to={'/Bio'}>About Me</Link></span>
            <span className="headerLinks"><Link to={'/Generator'}>Generator</Link></span>
            
            </div>
            
            <div className="navbar-right">
            <span>Check out new music!</span>
            <RotatingLinks />

            </div>

        </nav>
    )


}

export default Header;
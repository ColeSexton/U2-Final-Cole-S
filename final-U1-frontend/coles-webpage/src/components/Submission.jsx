
import Header from "./reuse/Header";
import Footer from "./reuse/Footer"
import { useLocation, useNavigate } from "react-router-dom";

const Submission = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state || {};

    const handleEdit = () => {
        navigate('/SongForm', {
            state: formData
        });
    };

    return(
        <>
        <Header />
        <div className="submitPage">
        

            <div>
                <h2>SONG SUBMITTED SUCCESSFULLY</h2>
            </div>

            <p>
                Congrats, you submitted the Song Form!
            </p>
                <div>

                <table className="subTable">
                    <caption>Contact Details</caption>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <td>{formData.name}</td>
                        <td>{formData.email}</td>
                        <td>{formData.phone}</td>
                    </tr>
                </table>

                    <div className="editDetails">
                    Click to edit details  <i className="fas fa-arrow-right animatedArrow"></i>
                    <button onClick={handleEdit} className="editButton">Edit</button>
                    </div>

                </div>

                <div className="nextSteps">
                    <p>Next Steps</p>
                    <ul>
                        <li>I will email you with an invoice</li>
                        <li>I will write the song, and email you a copy to review</li>
                        <li>I will revise the song and give you the final copies</li>
                    </ul>
                    
                </div>

                


                
            
        </div>
        <Footer />
        </>
    )

}

export default Submission;
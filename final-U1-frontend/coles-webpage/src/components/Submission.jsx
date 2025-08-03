
import Header from "./reuse/Header";
import Footer from "./reuse/Footer"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const Submission = () =>{
    const location = useLocation();
    const personalInfoId = location.state?.personalInfoId;
    const navigate = useNavigate();
    //const formData = location.state || {};

    const [personalInfo, setPersonalInfo] = useState(null);
    const [songFormInfo, setSongFormInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function fetchSubmissionData(){
            try{
                const response = await fetch(`http://localhost:8080/api/submit/${personalInfoId}`);
                if(!response.ok) throw new Error("Failed to fetch submission data");

                const data = await response.json();
                setPersonalInfo(data.personalInfo);
                setSongFormInfo(data.songFormInfo);
            }catch (error){
                console.error(error);
                setPersonalInfo(null);
                setSongFormInfo(null);
            }finally {
                setLoading(false);
            }
        }

        if(personalInfoId) fetchSubmissionData();
    }, [personalInfoId]);




    const handleEdit = () => {
        if(!personalInfo || !songFormInfo) return;

        const formData ={
            id: personalInfo.id,
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            title: songFormInfo.title,
            genre: songFormInfo.genre,
            style: songFormInfo.style,
            instruments: songFormInfo.instruments,
            lyricsIncluded: songFormInfo.lyricsIncluded ? "yes" : "no",
            lyricsText: songFormInfo.lyricsText,
            length: songFormInfo.length,
            forSomeone: songFormInfo.forSomeone ? "yes" : "no",
            forSomeoneExplain: songFormInfo.forSomeoneExplain,
            emotions: songFormInfo.emotions,
            extraInfo: songFormInfo.extraInfo,
            bounce: songFormInfo.bounce || []
        };

        navigate('/SongForm', {
            state: formData
        });
    };

    const handleDelete = async () =>{
        if(!window.confirm("Are you sure you want to delete this submission?")) return;

        try{
            const deleteResponse = await fetch(`http://localhost:8080/api/submit/${personalInfoId}`,
                {method: "DELETE"});
            
            if(!deleteResponse.ok) throw new Error("Failed to delete submission");

            alert("Submission deleted successfully");
            navigate("/SongForm");
        }catch (error){
            console.error(error);
            alert(error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    if(!personalInfo) return <div>No Personal info found.</div>;

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
                        <td>{personalInfo.name}</td>
                        <td>{personalInfo.email}</td>
                        <td>{personalInfo.phone}</td>
                    </tr>
                </table>

                    <div className="editDetails">
                    <i className="fas fa-arrow-right animatedArrow"></i>
                    <button onClick={handleEdit} className="editButton">Edit</button>
                    <i className="fas fa-arrow-left animatedArrow"></i>
                    
                    <i className="fas fa-arrow-right animatedArrow"></i>
                    <button onClick={handleDelete} className="editButton">
                        Delete
                    </button>
                    <i className="fas fa-arrow-left animatedArrow"></i>
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
import Header from "./reuse/Header";
import Footer from "./reuse/Footer";
import {useState} from "react";
import AdviceBox from "./AdviceBox";

const Generator = () =>{
    const [selectedCategory, setSelectedCategory] = useState("");

    return(
        <div >
        <Header />
            <div className="generator">
            <h2 id="genH2">Choose a category for advice</h2>

                <div className="categoryButtons">
                    <button className={`categoryButton ${selectedCategory === 'music' ? 'active':''}`} onClick={()=> setSelectedCategory("music")}>Music</button>
                    <button className={`categoryButton ${selectedCategory === 'poems' ? 'active':''}`} onClick={() => setSelectedCategory("poems")}>Poems</button>
                    <button className={`categoryButton ${selectedCategory === 'creativity' ? 'active':''}`} onClick={() => setSelectedCategory("creativity")}>Creativity Quotes</button>
                </div>

                <span className="adviceDisplay"><AdviceBox category={selectedCategory}/></span>

            </div>
            <Footer />
        </div>
    )

}

export default Generator;
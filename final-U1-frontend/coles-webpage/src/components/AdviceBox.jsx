import {useEffect, useState} from "react";

const AdviceBox = ({category}) => {
    const [adviceList, setAdviceList] = useState([]);
    const [currentAdvice, setCurrentAdvice] = useState(null);

    useEffect(() =>{
        fetch("/advice.json")
        .then((response)=> response.json())
        .then((data)=>{
            const filtered = category ? data.filter((advice) => advice.category === category) : data;
            setAdviceList(filtered);
            setCurrentAdvice(null);

        });
    }, [category]);

    const showRandomAdvice = () =>{
        if (adviceList.length === 0) return;
        const randomIndex = Math.floor(Math.random() * adviceList.length);
        setCurrentAdvice(adviceList[randomIndex]);
    };

    return(
        <div className="adviceBox">
        {currentAdvice && <p>{currentAdvice.description}</p>}
        <button onClick={showRandomAdvice} className="adviceButton">Click Me!</button>
        

        </div>
    );
}

export default AdviceBox;
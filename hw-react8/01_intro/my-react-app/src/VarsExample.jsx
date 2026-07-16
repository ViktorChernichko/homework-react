import {useState} from "react";

export default function  VarsExample ()  {

    const a = 10;
    let b = 20;
    const [c, setC] = useState(0);


    const addB = () => {
        b++;
        console.log(b);
    }

    const addC = () => {
        let t = c+1;
        setC(t);
    }


    const addCNoSetter = () => {
        // c++;
        console.log(c)
    }

    console.log("Rerendering Component");

    return(
        <>
            <ul>
                <li> a = {a}</li>
                <li> b = {b}</li>
                <li> c = {c}</li>
            </ul>
            <button onClick={addB}> Add B </button>
            <button onClick={addC}> Add C </button>
            <button onClick={addCNoSetter}> Add C No Setter</button>
        </>
    )
}
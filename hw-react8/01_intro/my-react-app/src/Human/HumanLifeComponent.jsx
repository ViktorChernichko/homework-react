import {useEffect, useState} from "react";

export default function HumanLifeComponent() {
    const [isSleeping, setIsSleeping] = useState(false);
    const [disease, setDisease] = useState([]);
    const [action, setAction] = useState(null);

    useEffect(() => {
        let timerSleep;
        const slippingStatus = (goSleep) => {
            timerSleep = setTimeout(() => {
                setIsSleeping(goSleep);
                timerSleep = setTimeout(() => {
                    slippingStatus(!goSleep);
                })
            }, 5000)
        }

         slippingStatus(true);

        return () => clearTimeout(timerSleep);
    }, []);

    const handleSetAction = (action) => {
        setAction(action);
    }


    if (isSleeping) {
        return (<div>Human is sleeping</div>);
    }

    if (disease.length > 0 ) {
        return (<div>Human is sick: {disease.join(', ')}</div>);
    }

    return (<div>Human is alive
        <button onClick={() => handleSetAction('eat')}>Eat</button>
        <button onClick={() => handleSetAction('drink')}>Drink</button>
        <button onClick={() => handleSetAction(null)}>Nothing</button>
        {action && <div>Action: {action}</div>}
    </div>);

}
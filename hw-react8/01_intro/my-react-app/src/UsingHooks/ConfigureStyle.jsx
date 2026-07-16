import {useEffect, useState} from "react";
import t from './themes.module.css';

export  const ConfigureStyle = () => {

    const [mode, setMode] = useState('load');

    const [theme, setTheme] = useState('light');

    const [bgColor, setBgColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(16);
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        console.log("Я запускаюсь після кожного рендеру!");
    });

    useEffect(() => {
        console.log("Компонент з'явився на екрані (монтування)");
        // Ідеально для запитів до API
    }, []);

    useEffect(() => {
        document.title = `Сторинка перебуває у режімі: ${mode}`;
    }, [mode]);

    if (mode === 'load') {
        setTimeout(() => setMode('ready'), 3000);
    }

    if (mode === 'error') return <div>Error</div>;

    if (mode === 'load') return <div>Loading...</div>;

    // if (mode === 'ready')

    return(
        <div className={t[theme]}  style={{backgroundColor: bgColor}}>
            <h1 style={{fontSize: fontSize, color: color }}> Configure Styles</h1>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}/><br/>
            <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}/><br/>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/><br/>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
        </div>
    )
}
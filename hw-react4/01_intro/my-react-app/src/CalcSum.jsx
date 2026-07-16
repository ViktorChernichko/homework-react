import {useRef, useState} from "react";

const CalcSum = () => {
    // 1. Создаем рефы для доступа к DOM-элементам инпутов.
    // Изначально они null, React сам подставит туда элементы позже.
    const inputA = useRef(null);
    const inputB = useRef(null);

    // 2. Стейт для результата (нам нужна перерисовка, чтобы показать сумму)
    const [sum, setSum] = useState(0);

    const handleCalcSum = () => {
        // 3. Вытаскиваем значения прямо из инпутов через .current.value
        // Т.к. значение в инпуте — это всегда строка, переводим в числа.
        const valA = Number(inputA.current.value) || 0;
        const valB = Number(inputB.current.value) || 0;

        setSum(valA + valB); // Обновляем экран
    };

    console.log("Render Component");

    return (
        <div style={{ padding: '20px' }}>
            <h3>Калькулятор (Uncontrolled)</h3>
            <ul>
                <li>
                    <label>
                        a = <input
                        type="number"
                        ref={inputA} // Связываем реф с инпутом
                        placeholder="0"
                    />
                    </label>
                </li>
                <li>
                    <label>
                        b = <input
                        type="number"
                        ref={inputB} // Связываем реф с инпутом
                        placeholder="0"
                    />
                    </label>
                </li>
                <li><strong>Sum: {sum}</strong></li>
            </ul>

            {/* Кнопка, которая инициирует расчет */}
            <button onClick={handleCalcSum}>Calculate Sum</button>
        </div>
    );
};

export default CalcSum;

import logger from "../../utils/logger.js";
import {useRenderLogger} from "../../hooks/useRenderLogger.js";
import {useEffect, useRef, useState} from "react";


const RegisterForm = () => {
    useRenderLogger('RegisterForm');

    const formData = useRef({
        email: "",
        password: "",
        cf_password: "",
        policy: false
    });

    const [errors, setErrors] = useState([]);



    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        // Головна магія тут: дивимось на ТИП інпуту
        const finalValue = type === 'checkbox' ? checked : value;

        logger.info(`${name} = ${finalValue}`);

        // Записуємо правильні дані
        formData.current[name] = finalValue;

        const newErrors = [];
        if (formData.current['password'].length < 7 ) {
            newErrors.push(`Password must be at least 7 characters long`);
        }
        if (formData.current['cf_password'] !== formData.current['password']) {
            newErrors.push(`Confirm password`);
        }

        // setErrors(newErrors);
        setErrors(prevErrors => {
            // 1. Швидка перевірка на довжину
            if (prevErrors.length !== newErrors.length) {
                return newErrors;
            }

            // 2. Перевірка вмісту (чи всі елементи співпадають)
            const isSame = prevErrors.every((val, index) => val === newErrors[index]);

            // 3. Магія React: якщо повернути те саме посилання (prevErrors),
            // рендер скасовується.
            return isSame ? prevErrors : newErrors;
        });
    }

    const logFormData = (e) => {
        e.preventDefault();
        logger.info(formData.current);
    }


    return(
        <form>
            <input type="email" name='email'  onChange={handleChange} /><br />
            <input type="password" name='password'  onChange={handleChange} /><br />
            <input type="password" name='cf_password'  onChange={handleChange}  /><br />
            <input type="checkbox" name='policy' onChange={handleChange}   /><br />
            <ul>{
                errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))
            }
            </ul>
            <button type="submit" disabled={errors.length !== 0}>Register</button>
            <button onClick={logFormData}>Echo</button>
        </form>
    )
}

export default RegisterForm

// useRef -?
// useState -?
// useEffect -?


// let email = "";
// const [email, setEmail] = useState('');
// const email = useRef("");

// const [password, setPassword] = useState('');
// useEffect(() => {
//     logger.info('RegisterForm: Verify Password ' + password);
// }, [password]);
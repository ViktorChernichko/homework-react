import {useState} from "react";

const RegisterForm = () => {
    console.log("RegisterForm :: render");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email обов'язковий";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Некоректний email";
        }

        if (!password) {
            newErrors.password = "Пароль обов'язковий";
        } else if (password.length < 6) {
            newErrors.password = "Пароль має бути не менше 6 символів";
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = "Паролі не співпадають";
        }

        if (!agree) {
            newErrors.agree = "Потрібно погодитись з умовами";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("RegisterForm :: submit", {email, password});
            setSubmitted(true);
        } else {
            setSubmitted(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <input type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email"/>
                {errors.email && <div style={{color: "red"}}>{errors.email}</div>}
            </div>
            <br/>

            <div>
                <input type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"/>
                {errors.password && <div style={{color: "red"}}>{errors.password}</div>}
            </div>
            <br/>

            <div>
                <input type="password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       placeholder="Confirm password"/>
                {errors.confirmPassword && <div style={{color: "red"}}>{errors.confirmPassword}</div>}
            </div>
            <br/>

            <div>
                <label>
                    <input type="checkbox"
                           checked={agree}
                           onChange={(e) => setAgree(e.target.checked)}/>
                    {" "}Погоджуюсь з умовами
                </label>
                {errors.agree && <div style={{color: "red"}}>{errors.agree}</div>}
            </div>
            <br/>

            <button type="submit">Register</button>

            {submitted && <div style={{color: "green"}}>Реєстрація успішна!</div>}
        </form>
    )
}

export default RegisterForm

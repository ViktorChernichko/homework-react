import { useRef, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const passwordRef = useRef(null);

  const handleSubmit = () => {
    const password = passwordRef.current.value;

    if (password.length < 6) {
      setError("Пароль занадто короткий");
      return;
    }

    setError("");

    console.log({
      email,
      password,
    });
  };

  return (
    <div>
      <h1>Гібридна Форма</h1>

      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <p>Ви вводите email: {email}</p>

      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          ref={passwordRef}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>
        Увійти
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LoginForm;
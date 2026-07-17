import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function LoginInterface() {
  const [name, setName] = useState("");
  const { user, logIn } = useUser();

  if (user) {
    return null;
  }

  const handleLogin = () => {
    if (name.trim()) {
      logIn(name);
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введіть ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>
    </div>
  );
}
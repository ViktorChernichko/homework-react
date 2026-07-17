import { useUser } from "../context/UserContext";

export default function Header() {
  const { user, logOut } = useUser();

  return (
    <header>
      {user ? (
        <>
          <h2>Привіт, {user}</h2>
          <button onClick={logOut}>Вийти</button>
        </>
      ) : (
        <h2>Гість</h2>
      )}
    </header>
  );
}
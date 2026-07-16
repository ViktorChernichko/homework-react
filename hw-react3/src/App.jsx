import { useEffect, useState } from "react";

function App() {
  const [dogImage, setDogImage] = useState("");
  const [count, setCount] = useState(0);

  const getDog = async () => {
    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );
      const data = await response.json();

      setDogImage(data.message);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  useEffect(() => {
    document.title = `Побачено песиків: ${count}`;
  }, [count]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Генератор Собачок</h1>

      <h2>Переглянуто: {count}</h2>

      <button onClick={getDog}>Хочу ще!</button>
      <h2></h2>
      
      {dogImage && (
        <img
          src={dogImage}
          alt="Dog"
          style={{
            width: "400px",
            borderRadius: "10px",
          }}
        />
      )}

      <br />
      <br />
    </div>
  );
}

export default App;
import { useState } from "react";

const ClickCounter = () => {
  console.log("Render Counter");

  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Лічильник кліків</h2>
      <p>Кількість: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Клік
      </button>
    </div>
  );
};

export default ClickCounter;
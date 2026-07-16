import { useRef } from "react";

const QuickNote = () => {
  const textRef = useRef(null);

  const saveNote = () => {
    console.log(textRef.current.value);
  };

  return (
    <div>
      <h2>Quick Note</h2>

      <textarea
        ref={textRef}
        rows="5"
        cols="40"
        placeholder="Введіть текст..."
      ></textarea>

      <br />
      <button onClick={saveNote}>
        Зберегти в консоль
      </button>
    </div>
  );
};

export default QuickNote;
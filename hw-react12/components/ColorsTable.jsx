export default function ColorsTable({ colors }) {
  if (colors.length === 0) {
    return <p>Оберіть зображення для аналізу.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Колір</th>
          <th>HEX</th>
          <th>RGB</th>
        </tr>
      </thead>

      <tbody>
        {colors.map((color, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            <td>
              <div
                className="color-box"
                style={{
                  backgroundColor: color.hex,
                }}
              ></div>
            </td>

            <td>{color.hex}</td>

            <td>{color.rgb.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
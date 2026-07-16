import React, { Component } from "react";

class CityClass extends Component {
  render() {
    return (
      <div>
      <h2>Миколаїв</h2>
      <p><strong>Країна:</strong> Україна</p>
      <p><strong>Рік заснування:</strong>1789</p>

        <img src="/city1.png" alt="Пам'ятка 1" />
        <img src="/city2.png" alt="Пам'ятка 2" />
        <img src="/city3.png" alt="Пам'ятка 3" />
      </div>
    );
  }
}

export default CityClass;
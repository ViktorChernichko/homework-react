import React, { Component } from "react";

class BookClass extends Component {
  render() {
    return (
      <div>
        <h2>Гаррі Поттер і філософський камінь</h2>

        <p><strong>Автор:</strong> Джоан Роулінг</p>
        <p><strong>Жанр:</strong> Фентезі</p>
        <p><strong>Кількість сторінок:</strong> 320</p>

        <h3>Рецензії</h3>
        <ul>
          <li>Дуже цікава книга.</li>
          <li>Захоплюючий сюжет.</li>
          <li>Рекомендую до прочитання.</li>
        </ul>
      </div>
    );
  }
}

export default BookClass;
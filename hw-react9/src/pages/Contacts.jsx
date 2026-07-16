import { Link } from "react-router-dom";
import contacts from "../data/contacts";

function Contacts() {
  return (
    <div>
      <h1>Контакти</h1>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              {contact.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
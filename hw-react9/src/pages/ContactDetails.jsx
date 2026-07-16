import { useParams, useNavigate } from "react-router-dom";
import contacts from "../data/contacts";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find((item) => item.id === Number(id));

  if (!contact) {
    return <h2>Контакт не знайдено</h2>;
  }

  return (
    <div>
      <h1>{contact.name}</h1>

      <p>Телефон: {contact.phone}</p>
      <p>Email: {contact.email}</p>

      <button onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}

export default ContactDetails;
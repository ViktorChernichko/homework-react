import {usePageTitle} from "../hooks/usePageTitle.js";

export default function HomePage() {
    usePageTitle('Home Page');


  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our React Router app.</p>
    </div>
  );
}
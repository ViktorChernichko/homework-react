import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/">Головна</NavLink>
        <br/>
        <NavLink to="/contacts">Контакти</NavLink>
      </nav>

      <hr />

      <Outlet />
    </>
  );
}

export default Layout;
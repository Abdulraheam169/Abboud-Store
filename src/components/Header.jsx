import { NavLink } from "react-router";

export default function Header() {
  return (
    <>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "my-link" : undefined)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "my-link" : undefined)}
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "my-link" : undefined)}
          to="myCard"
        >
          My Cart
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "my-link" : undefined)}
          to="aboutUs"
        >
          About Me
        </NavLink>
      </nav>
    </>
  );
}

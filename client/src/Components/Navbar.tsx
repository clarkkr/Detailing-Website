import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full z-40">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
export default Navbar;

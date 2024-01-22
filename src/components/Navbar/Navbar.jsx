import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h3>Engiversity</h3>
      </Link>
      <div>
        <Link to={`/pavimentos`}>Pavimentos</Link>
        <Link to={`/hidraulica`}>Hidráulica</Link>
      </div>
    </nav>
  );
};

export default Navbar;

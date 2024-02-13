import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-lista">
        <li><Link to="/"><h1>Engiversity</h1></Link></li>
        <li><Link to={`/pavimentos`}>Pavimentos</Link></li>
        <li><Link to={`/suelos`}>Suelos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

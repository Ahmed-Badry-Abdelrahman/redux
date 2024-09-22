import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo">
        <p>Redux</p>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/post">Post</Link> {/* Added leading / for Post route */}
        </li>
      </ul>
    </header>
  );
}

export default Header;

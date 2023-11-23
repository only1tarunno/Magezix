import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink
          to="/addArticles
"
        >
          Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink
          to="/subscription
"
        >
          Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard
"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myArticles

"
        >
          My Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/premiumArticles
"
        >
          Premium Articles
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="container mx-auto px-5 lg:px-10 xl:px-0 py-3">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={logo} className="w-36" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn">Login/Register</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

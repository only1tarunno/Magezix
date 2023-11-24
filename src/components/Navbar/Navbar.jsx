import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "../shared/Button";
import Container from "../shared/Container";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addArticles">Add Articles</NavLink>
      </li>
      <li>
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/myArticles">My Articles</NavLink>
      </li>
      <li>
        <NavLink to="/premiumArticles">Premium Articles</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut().then(navigate("/")).catch();
  };

  return (
    <div className="fixed  w-full z-50 bg-white ">
      <Container>
        <div className=" py-3">
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
              <div>
                <img src={logo} className="w-36" alt="" />
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
              {user ? (
                <div className="flex flex-col lg:flex-row items-center gap-2">
                  <h2 className="text-white text-xl font-bold">
                    {user.displayName ? user.displayName : "User"}
                  </h2>
                  <img
                    className="w-10 rounded-[50%] h-10 object-cover"
                    src={user?.photoURL}
                    alt=""
                  />
                  <button
                    onClick={handleLogOut}
                    className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <Button text={"Login/Register"}></Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

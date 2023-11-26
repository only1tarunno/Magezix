import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";
// Icons
import { GrLogout } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { MdAddBox, MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import { FaHouse, FaUsers } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const isAdmin = false;

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} className="w-32" alt="" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineMenu className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img src={logo} className="w-32" alt="" />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* If a user is host */}

            <nav>
              {isAdmin ? (
                <>
                  <MenuItem
                    icon={BsGraphUp}
                    label="Statistics"
                    address="/dashboard"
                  />
                  <MenuItem
                    icon={FaUsers}
                    label="All Users"
                    address="allUsers"
                  />
                  <MenuItem
                    icon={MdLibraryBooks}
                    label="All Articles"
                    address="allArticles"
                  />
                  <MenuItem
                    icon={MdAddBox}
                    label="Add Publisher"
                    address="addPublisher"
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    icon={CgProfile}
                    label="My Profile"
                    address="myProfile"
                  />
                  <MenuItem
                    icon={MdLibraryBooks}
                    label="My Articles"
                    address="myArticles"
                  />
                  <MenuItem
                    icon={MdAddBox}
                    label="Add Article"
                    address="addArticle"
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem icon={FaHouse} label="Home" address="/" />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

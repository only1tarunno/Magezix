import { useState } from "react";

import logo from "../../assets/logo.svg";
// Icons

import { AiOutlineMenu } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

import { FaAddressCard, FaHouse, FaUsers } from "react-icons/fa6";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#BB9CC0]  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* If a user is host */}

            <nav>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 text-black transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-black" : "text-black"
                  }`
                }
              >
                <BsGraphUp className="w-5 h-5" />

                <span className="mx-4 font-medium">Dashboard</span>
              </NavLink>
              <NavLink
                to="allUsers"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 text-black transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-black" : "text-black"
                  }`
                }
              >
                <FaUsers className="w-5 h-5" />

                <span className="mx-4 font-medium">All Users</span>
              </NavLink>
              <NavLink
                to="allArticles"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 text-black transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-black" : "text-black"
                  }`
                }
              >
                <MdLibraryBooks className="w-5 h-5" />

                <span className="mx-4 font-medium">All Articles</span>
              </NavLink>
              <NavLink
                to="addPublisher"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 text-black transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-black" : "text-black"
                  }`
                }
              >
                <FaAddressCard className="w-5 h-5" />

                <span className="mx-4 font-medium">Add Publisher</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5 text-black transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-black" : "text-black"
              }`
            }
          >
            <FaHouse className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

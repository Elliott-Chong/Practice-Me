import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const hamRef = useRef();
  const ulRef = useRef();

  const toggleMenu = () => {
    hamRef.current.classList.toggle("active");
    ulRef.current.classList.toggle("active");
  };

  return (
    <nav className="bg-gray-900 fixed top-0 w-full md:flex flex-col md:space-y-0 md:flex-row space-y-4 justify-start items-center py-4 px-8">
      <Link to="/" id="logo" className="text-4xl font-karla font-bold">
        <span className="text-sp-red">practice</span>
        <span className="text-white">Me</span>
      </Link>
      <span
        onClick={toggleMenu}
        ref={hamRef}
        className="inline md:hidden absolute right-8 cursor-pointer"
        id="ham"
      ></span>
      <ul
        id="nav-content"
        ref={ulRef}
        className="md:flex flex-col md:flex-row md:space-x-8 text-xl text-white font-bold font-space ml-auto"
      >
        <li>
          <Link className="nav-item" onClick={toggleMenu} to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="nav-item" onClick={toggleMenu} to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className="nav-item" onClick={toggleMenu} to="/practice">
            Practice
          </Link>
        </li>
        <li>
          <Link className="nav-item" onClick={toggleMenu} to="/compete">
            Compete
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

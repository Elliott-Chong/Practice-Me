import React, { useRef, useState } from "react";
import "../custom.css";
import { Link } from "react-router-dom";

function Navbar() {
  const hamRef = useRef();
  const ulRef = useRef();

  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    hamRef.current.classList.toggle("active");
    ulRef.current.classList.toggle("active");
    setActive((active) => !active);
  };

  return (
    <nav className="bg-gray-700 md:flex flex-col space-y-4 justify-start items-center py-4 px-8">
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
        ref={ulRef}
        className="md:flex md:space-x-8 text-xl text-white font-bold font-space ml-auto"
      >
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="practice">Practice</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

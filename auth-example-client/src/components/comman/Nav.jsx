import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [dm, setdm] = useState(false);
  const drop = useRef();
  const bar = useRef();

  const token = localStorage.getItem("token");
  
  const dropdown = () => {
    bar.current.classList.add("flex");
    bar.current.classList.add("flex-col");
    if (dm) {
      setdm(false);
      bar.current.classList.add("flex");
      bar.current.classList.add("flex-col");
      bar.current.classList.add("hidden");
    } else {
      setdm(true);
      bar.current.classList.remove("hidden");
      bar.current.classList.reomve("flex");
      bar.current.classList.remove("flex-col");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="px-4 text-white fixed w-full top-0 z-10 h-16 backdrop-blur-lg backdrop-opacity-35 bg-blue-600 bg-opacity-75 flex items-center">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">
          <Link to="/" className="sm:inline hidden">
            Bharat Odedara
          </Link>
          <Link to="/" className="sm:hidden inline">
            BO
          </Link>
        </h1>
        <div className="mm space-x-4 md:inline hidden">
          <NavLink to="/" className="px-3">
            Home
          </NavLink>
          <NavLink to="/projects" className="px-3">
            Projects
          </NavLink>
          <NavLink to="/contact" className="px-3">
            Contact
          </NavLink>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-500 bg-black rounded p-2 font-semibold"
            >
              logout
            </button>
          ) : (
            <NavLink to="/signin" className="px-3">
              Sign in
            </NavLink>
          )}
        </div>
        <div
          className="inmenu hidden md:hidden w-full sm:w-[50%] absolute right-0 top-0 bg-neutral-700 h-screen items-end"
          ref={bar}
        >
          <div className="dd flex flex-col text-black w-full sm:w-[80%] justify-center rounded-l h-[50%]">
            <NavLink to="/" className="px-3 py-2 text-center lnk">
              Home
            </NavLink>
            <NavLink to="/projects" className="px-3 py-2 text-center lnk">
              Projects
            </NavLink>
            <NavLink to="/contact" className="px-3 py-2 text-center lnk">
              Contact
            </NavLink>
            {token ? (
              <button
                onClick={handleLogout}
                className="text-red-500 bg-black rounded p-2 font-semibold"
              >
                logout
              </button>
            ) : (
              <NavLink to="/signin" className="px-3 py-2 text-center lnk">
                Sign in
              </NavLink>
            )}
          </div>
        </div>
        <div
          className="menu md:hidden inline z-0"
          ref={drop}
          onClick={dropdown}
        >
          {!dm ? (
            <svg
              height="25px"
              className=""
              version="1.1"
              viewBox="0 0 25 25"
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title />
              <desc />
              <defs />
              <g
                fill="none"
                fill-rule="evenodd"
                id="TabBar-Icons"
                stroke="none"
                stroke-width="1"
              >
                <g fill="#ffffff" id="Hamburger-Round">
                  <path
                    d="M0,4 C0,2.8954305 0.889763236,2 2.00359486,2 L22.9964051,2 C24.10296,2 25,2.88772964 25,4 C25,5.1045695 24.1102368,6 22.9964051,6 L2.00359486,6 C0.897039974,6 0,5.11227036 0,4 L0,4 Z M0,12 C0,10.8954305 0.889763236,10 2.00359486,10 L22.9964051,10 C24.10296,10 25,10.8877296 25,12 C25,13.1045695 24.1102368,14 22.9964051,14 L2.00359486,14 C0.897039974,14 0,13.1122704 0,12 L0,12 Z M0,20 C0,18.8954305 0.889763236,18 2.00359486,18 L22.9964051,18 C24.10296,18 25,18.8877296 25,20 C25,21.1045695 24.1102368,22 22.9964051,22 L2.00359486,22 C0.897039974,22 0,21.1122704 0,20 L0,20 Z"
                    id="Hamburger"
                  />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              height="25"
              id="Layer_1"
              version="1.1"
              fill="white"
              viewBox="0 0 512 512"
              width="25"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;

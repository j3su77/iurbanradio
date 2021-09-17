import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import DropDownUser from "./DropDownUser";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(Context);



  return (
    <>
      <nav className={`md:relative flex flex-nowrap items-center justify-between px-2 py-3 bg-jdark sticky  z-50`} style={{zIndex:"1200"  /*,  boxShadow:"0px 3px 5px 0px rgb(0 0 0 / 75%)" */}}>
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:flex lg:justify-around">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
              to="/"
            >
              iUrban Radio
            </Link>

            {user && (
              <div className=" flex justify-self-center">
          
                <DropDownUser />
              </div>
            )}

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {!menuOpen ? <FaBars /> : <FaTimes />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (menuOpen ? " flex" : " hidden")
            }
            id="example-navbar-info"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!user && (
                <li className="nav-item py-2">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              <li className="nav-item py-2">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  Chat
                </Link>
              </li>
              <li className="nav-item py-2">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  Publicaciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

};


export default Navbar;

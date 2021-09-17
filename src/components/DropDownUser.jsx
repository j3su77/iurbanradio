import React, { useContext, useEffect, useRef, useState } from "react";

import { Context } from "../context/Context";
import { Link } from "react-router-dom";

const Dropdown = () => {
  // dropdown props
  const { user, apiUrlImg } = useContext(Context);
  const { dispatch } = useContext(Context);
  const [clickedOutside, setClickedOutside] = useState(true);
  const btnDropdownRef = useRef();

  const handleClickOutside = (e) => {
    if (!btnDropdownRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="flex flex-wrap text-white">
        <div className="relative inline-flex align-middle text-center ">
          <button
            className={" relative"}
            type="button"
            ref={btnDropdownRef}
            onClick={() => {
              setClickedOutside(!clickedOutside);
            }}
          >
            <img
              className="object-cover w-9 h-9 rounded-full "
              src={
                user && user.profilePic
                  ? apiUrlImg + user.profilePic
                  : "https://www.uic.mx/posgrados/files/2018/05/default-user.png"
              }
              alt=""
            />
          </button>

          <div
            ref={btnDropdownRef}
            className={
              (!clickedOutside ? "block " : "hidden ") +
              "bg-jdark absolute top-10 right-0 md:left-10 " 
            } 
            style={{ minWidth: "12rem" , zIndex: "3000"}}
          >
            <Link
              to="/write"
              className={
                "text-sm py-3 px-4 font-normal block w-full whitespace-nowrap   "
              }
            >
              Nuevo post
            </Link>
            <Link
              to="/mispublicaciones"
              className={
                "text-sm py-3 px-4 font-normal block w-full whitespace-nowrap "
              }
        
            >
              Mis Publicaciones
            </Link>
            <Link
              to="/configuracion"
              className={
                "text-sm py-3 px-4 font-normal block w-full whitespace-nowrap  "
              }
            
            >
              Configuraciones
            </Link>
            <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
            <button
              onClick={handleLogout}
              className={
                " py-3 px-4 font-medium text-md block w-full whitespace-nowrap  "
              }
            >
              {user && "Cerrar sesión"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown />
    </>
  );
}

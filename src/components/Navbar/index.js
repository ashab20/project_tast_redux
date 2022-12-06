import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import Search from "./Search";
import Avatar from "react-avatar";

import Logo from "../../assets/images/logo.png";

function Navbar() {
const dispatch = useDispatch()
const {user} = useSelector(state=>state.auth); 
const match = useMatch("/");
const [home, setHome] = useState(false);
useEffect(() => {
  if (!match) {
    setHome(true)
  }else{
    setHome(false);
  }
}, [match]);

const handleLogout = () => {
  dispatch(userLoggedOut())
  localStorage.clear();
}

  return home && (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img
        src={Logo}
        className="h-10 w-10"
        alt="Logo"
      />
      <Search />
      <div className="ml-10">
        <Link
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          to="/teams"
        >
          Team
        </Link>
        <button className="mx-2 text-sm font-semibold text-gray-600 hover:text-red-500"
        type="button" title="logout" onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
        
          {user.avatar !== "" ? (
          <img className="w-6 h-6 ml-auto rounded-full" src={`${user.avatar}`} alt="" />
        ) :
        <Avatar className="w-6 h-6 ml-auto rounded-full" size="50px" color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={user.email}  />}
      </button>
    </div>
  );
}

export default Navbar;

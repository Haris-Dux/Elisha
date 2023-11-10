import React from "react";
import Head from "./Head";
import LogoComponent from "./LogoComponent";
import Navbar from "./Navbar";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user === null || (user !== null && user.role !== "admin") ? (
        <>
          <Head />
          <LogoComponent />
          <Navbar />
        </>
      ) : null}
    </>
  );
};

export default Header;

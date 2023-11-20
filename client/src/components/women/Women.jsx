import React, { useEffect } from "react";
import WomenMainPage from "./WomenMainPage";
import WomenAllProducts from "./WomenAllProducts";
import WomenNewArrival from "./WomenNewArrival";
import "./Women.css";
import { useDispatch } from "react-redux";



const Women = () => {
  return (
    <>
      <WomenMainPage />
      <WomenAllProducts />    
    </>
  );
};

export default Women;

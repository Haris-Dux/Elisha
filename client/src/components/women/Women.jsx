import React, { useEffect } from "react";
import WomenMainPage from "./WomenMainPage";
import WomenAllProducts from "./WomenAllProducts";
import WomenNewArrival from "./WomenNewArrival";
import "./Women.css";
import { useDispatch } from "react-redux";
import { getCategoryAsync } from "../../features/categorySlice";

const Women = () => {
  return (
    <>
      <WomenMainPage />
      <WomenAllProducts />
      <WomenNewArrival />
    </>
  );
};

export default Women;

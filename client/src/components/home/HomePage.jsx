import React, { useEffect } from "react";
import MainPage from "./MainPage";
import TopBar from "./TopBar";
import ShopByType from "./ShopByType";
import NewArrivals from "./NewArrivals";
import BrandNameLogo from "./BrandNameLogo";
import DealsByCategory from "./DealsByCategory";
import PretStyles from "./PretStyles";
import { useDispatch } from "react-redux";
import { getProductAsync } from "../../features/ProductSlice";
import { getCategoryAsync } from "../../features/categorySlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAsync());
    dispatch(getCategoryAsync());
  }, [dispatch]);
  

  return (
    <>
      <MainPage />
      <TopBar />
      <ShopByType />
      <NewArrivals heading="NEW ARRIVALS" />
      <BrandNameLogo />
      <DealsByCategory />
      <PretStyles heading="PRET STYLE" slide={4} />
    </>
  );
};

export default HomePage;

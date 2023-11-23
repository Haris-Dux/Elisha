import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import TopBar from "./TopBar";
import ShopByType from "./ShopByType";
import NewArrivals from "./NewArrivals";
import BrandNameLogo from "./BrandNameLogo";
import DealsByCategory from "./DealsByCategory";
import PretStyles from "./PretStyles";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync } from "../../features/ProductSlice";
import {
  getCategoryAsync,
  getCategoryTypeAsync,
} from "../../features/categorySlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const extractIds = () => {
    return categories.map((item) => item.id);
  };
  const [limit, setLimit] = useState(20);
  // Effect for fetching category types
  useEffect(() => {
    if (categories && categories.length > 0) {
      const ids = extractIds();
      dispatch(getCategoryTypeAsync({ category: ids }));
    }
  }, [dispatch, categories]);

  // Effect for initial product and category fetch
  useEffect(() => {
    dispatch(getProductAsync({ limit }));
    dispatch(getCategoryAsync());
  }, [dispatch, limit]);


  return (
    <>
      <MainPage />
      <TopBar />
      <ShopByType heading="SHOP BY TYPE" slide={3} />
      <NewArrivals heading="NEW ARRIVALS" />
      <BrandNameLogo />
      <DealsByCategory />
      <PretStyles heading="PRET STYLE" slide={3} />
    </>
  );
};

export default HomePage;

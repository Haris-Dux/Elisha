import { configureStore } from "@reduxjs/toolkit";
import WomenSlice from "../features/WomenSlice";
import authSlice from "../features/authSlice";
import ProductSlice from "../features/ProductSlice";
import orderSlice from "../features/orderSlice";
import categorySlice from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    womenData: WomenSlice,
    auth: authSlice,
    product: ProductSlice,
    order: orderSlice,
    category: categorySlice
  },
});

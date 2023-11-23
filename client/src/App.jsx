import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer/Footer";
import Header from "./common/Header";
import Women from "./components/women/Women";
import Stitched from "./components/stitched/Stitched";
import UnStitched from "./components/unstitched/UnStitched";
import TopSales from "./components/topSales/TopSales";
import AboutUs from "./components/aboutus/AboutUs";
import HomePage from "./components/home/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./components/contact/Contact";
import SelectedItem from "./components/selectedItem/SelectedItem";
import AdminMainPage from "./admin/adminMainPage/AdminMainPage";
import CartPage from "./components/cart/CartPage";
import Checkout from "./components/checkout/Checkout";
import SuccessPage from "./components/successPage/SuccessPage";
import NewProductForm from "./admin/createNewProduct/NewProductForm";
import OrderList from "./components/orderList/OrderList";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
import { useEffect } from "react";
import { validateTokenAsync } from "./features/authSlice";
import { getProductAsync } from "./features/ProductSlice";
import AdminOrderList from "./admin/adminOrderList/AdminOrderList";
import UpdateProduct from "./admin/updateProduct/UpdateProduct";
import Category from "./admin/category/Category";
import CategoryType from "./admin/category/CategoryType";
import SubCategory from "./admin/category/SubCategory";
import { getCategoryTypeAsync } from "./features/categorySlice";
import ProductByCategory from "./components/home/ProductByCategory";
import ProductsByFabric from "./components/home/ProductsByFabric";
import AdminProtected from "./components/middleware/AdminProtected";
import UserProtected from "./components/middleware/UserProtected";
import UpdateCategoryType from "./admin/category/UpdateCategoryType";
import UpdateSubCategoryType from "./admin/category/UpdateSubCategoryType";
import ProductBySubCategory from "./components/women/ProductBySubCategory";
import Delivery from "./components/footer/Delivery";
import Exchange from "./components/footer/Exchange";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";



function App() {
  const dispatch = useDispatch();


  // GETTING ALL DATA FROM SLICE
  useEffect(() => {
    dispatch(getProductAsync());
  }, [dispatch]);

  //GET CATEGORYTYPES
  const categories = useSelector((state) => state.category.categories);
  // console.log(categories)

  useEffect(() => {
    const extractIds = () => {
      return categories.map((item) => item.id)
    }
    const categoryIds = extractIds(categories);
    dispatch(getCategoryTypeAsync({ category: categoryIds }))
  }, [dispatch])



  useEffect(() => {

    const token = Cookies.get("token");
    if (token) {
      dispatch(validateTokenAsync({ accessToken: token, }))
        .then((response) => {
          // console.log(response);
        })
    }
  }, [])


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/women" element={<Women />} />
          <Route path="/stitched" element={<Stitched />} />
          <Route path="/unstitched" element={<UnStitched />} />
          <Route path="/topsales" element={<TopSales />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/selectedItem/:id" element={<SelectedItem />} />
          <Route path="/productbyfabric/:id" element={<ProductsByFabric />} />
          <Route path="/productbycategory/:id" element={<ProductByCategory />} />
          <Route path="/productbysubcategory/:id" element={<ProductBySubCategory />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          {/* USER PROTECTED PAGE */}
          <Route path="/checkout" element={<UserProtected><Checkout /></UserProtected>} />
          <Route path="/ordersuccess" element={<UserProtected><SuccessPage /></UserProtected>} />
          <Route path="/orderlist" element={<UserProtected><OrderList /></UserProtected>} />
          {/* SIGN PAGES */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/resetPassword" element={<ResetPassword />} />
          {/* ADMIN PROTECTED PAGES */}
          <Route path="/adminmainpage" element={<AdminProtected><AdminMainPage /></AdminProtected>} />
          <Route path="/adminOrderList" element={<AdminProtected><AdminOrderList /></AdminProtected>} />
          <Route path="/newproductform" element={<AdminProtected><NewProductForm /></AdminProtected>} />
          <Route path="/updateproduct/:id" element={<AdminProtected><UpdateProduct /></AdminProtected>} />
          <Route path="/category" element={<AdminProtected><Category /></AdminProtected>} />
          <Route path="/categorytype" element={<AdminProtected><CategoryType /></AdminProtected>} />
          <Route path="/subcategory" element={<AdminProtected><SubCategory /></AdminProtected>} />
          <Route path="/updatecategorytype/:id" element={<AdminProtected><UpdateCategoryType /></AdminProtected>} />
          <Route path="/updatesubcategorytype/:id" element={<AdminProtected><UpdateSubCategoryType /></AdminProtected>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={600}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

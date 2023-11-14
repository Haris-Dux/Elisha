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
import UpdateProduct from "./admin/updateProduct/updateProduct";
import Category from "./admin/category/Category";
import CategoryType from "./admin/category/CategoryType";
import SubCategory from "./admin/category/SubCategory";
import { getCategoryTypeAsync } from "./features/categorySlice";



function App() {
  const dispatch = useDispatch();


  // GETTING ALL DATA FROM SLICE
  useEffect(() => {
    dispatch(getProductAsync());
  }, [dispatch]);

//GET CATEGORYTYPES
const categories = useSelector((state) => state.category.categories);
console.log(categories)

useEffect(()=>{
  const extractIds = () => {
    return categories.map((item)=>item.id)
  }
  const categoryIds = extractIds(categories);
  dispatch(getCategoryTypeAsync({category:categoryIds}))
},[dispatch])

  

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminmainpage" element={<AdminMainPage />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<SuccessPage />} />
          <Route path="/newproductform" element={<NewProductForm />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/user/resetPassword" element={<ResetPassword />} />
          <Route path="/adminOrderList" element={<AdminOrderList />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/category" element={<Category />} />
          <Route path="/categorytype" element={<CategoryType />} />
          <Route path="/subcategory" element={<SubCategory />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={900}
        hideProgressBar={false}
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

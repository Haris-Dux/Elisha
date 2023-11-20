import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { clearUser, logoutuserAsync } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForAdminAsync } from "../../features/orderSlice";
import { getProductAsync } from "../../features/ProductSlice";
import { getCategoryAsync } from "../../features/categorySlice";
import "./AdminMainPage.css";
import logo from "./Logo.png";

const AdminMainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (user && user.role === 'admin') {
        navigate("/adminmainpage", { replace: true });
      }
    };
    checkAuthAndRedirect();
  }, [navigate, user]);

  useEffect(() => {
    dispatch(getCategoryAsync());
    dispatch(getCategoryAsync());
  }, []);

  const handleItemClick = (itemId) => {
    navigate(`/updateproduct/${itemId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getProductAsync());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getAllOrderForAdminAsync())
  }, [])


  const Womendata = useSelector(state => state.product.products);

  // handle Logout
  const handleLogout = () => {
    dispatch(logoutuserAsync()).then(() => {
      dispatch(clearUser());
      navigate("/", { replace: true });
      toast.success("Logout Successfully");

    });
  }
  return (
    <>
      {/* OFFCANVAS */}
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <img src={logo} alt="..." width="145px" />
          <button type="button" className="btn-close fs-5 me-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        {/* OFFCANVAS - BODY */}
        <div className="offcanvas-body mx-0 p-0">
          <div className="dashboard-offcanvas py-3">
            <h2 className="dashboard-heading">Dashboard</h2>
            <div className="AdminMainPage-body-left-list mt-4">
              <Link to="/adminOrderList" className="btn dashboard-btn text-start">Admin Order List</Link>
              <Link to="/newproductform" className="btn dashboard-btn text-start">Add Products</Link>
              <Link to="/category" className="btn dashboard-btn text-start">Categories</Link>
              {/* <Link to="/categorytype" className="btn dashboard-btn text-start">Categories Type</Link>
              <Link to="/subcategory" className="btn dashboard-btn text-start">Sub Category</Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN MAIN PAGE */}
      <section className="AdminMainPage">
        <div className="container-fluid px-0">
          {/* ADMINMAINPAGE - HEADER */}
          <div className="row mx-0 navbar-cont">
            <div className="col-md-12 AdminMainPage-header-right">
              <div className="container">
                {/* New Updated Navbar */}
                <nav className="navbar d-flex justify-content-between align-items-center">
                  <div className="menu_button">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars fs-4 pt-1"></i></button>
                  </div>

                  <div className="navbar_text pt-1">ADMIN DASHBOARD</div>

                  <div className="navbar_icons">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row">
                      <li className="nav-item">
                        <i className="fa-solid fa-right-from-bracket mx-3 fs-4 pt-2" onClick={handleLogout}></i>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          {/* ADMINMAINPAGE - BODY */}
          <div className="AdminMainPage-body">
            <div className="row mx-0 d-flex justify-content-center">
              <div className="col-sm-9 col-md-12 py-3">
                <div className="container">
                  {/* BODY ---> PRODUCT GRID HEADER */}
                  <div className="AdminMainPage-body-header-right">
                    <h2 className="mx-4">Products Grid</h2>
                  </div>
                </div>

                {/* BODY ---> PRODUCT GRID CONTAINER */}
                <div className="container py-1 mt-2">
                  <div className="all-product-body py-1">
                    <div className="row">
                      {Womendata.map((Womendata) => {
                        return (
                          <div
                            key={Womendata.id}
                            className="col-xs-6 col-sm-6 col-md-4 col-lg-3"
                          >
                            <div className="card all-product-body-card my-2" onClick={() => handleItemClick(Womendata.id)}>
                              <img
                                src={Womendata.image.secure_url}
                                className="card-img-top"
                                alt="..."
                              />
                              <div className="card-body n pt-1 px-0">
                                <div className="card-body-details d-flex justify-content-between">
                                  {/* ITEM DETAILS */}
                                  <div className="card-body-details">
                                    <p className="card-data stitched-card-data my-0">{Womendata.name}</p>
                                    <p className="card-data stitched-card-data my-0">Rs.{Womendata.price}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default AdminMainPage;

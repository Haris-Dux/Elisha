import React, { useEffect } from "react";
import bg_box_1 from "./bg_box_1.png";
import bg_box_2 from "./bg_box_2.png";
import bg_box_3 from "./bg_box_3.png";
import bg_box_4 from "./bg_box_4.png";
import PretStyles from "../home/PretStyles";
import womenMainPageData from "./WomenMainPageData";
import "./Women.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryTypeAsync, getSubCategoryTypeAsync } from "../../features/categorySlice";

const WomenMainPage = () => {
  const dispatch = useDispatch();

  // FETCH STITCHED CATEGORY FROM STORE
  const womenCategoryId = useSelector(state =>
    state.category.categories.find(category => category.name === "Women")?.id);




  // CALL TO GET ALL CATEGORIES-TYPES
  useEffect(() => {
    dispatch(getCategoryTypeAsync({ category: womenCategoryId }));
    dispatch(getSubCategoryTypeAsync({ category: womenCategoryId, categoryType: categoryTypeIds }));
  }, [womenCategoryId, dispatch]);


  const categoriesType = useSelector((state) => state.category.categoriesType);


  const extractIds = () => {
    return categoriesType.map((item) => item.id)
  }

  const categoryTypeIds = extractIds(categoriesType);


  const subCategoriesType = useSelector((state) => state.category.subcategoriesType);
  console.log('subCategoriesType', subCategoriesType);






  return (
    <>
      <section className="women-mainpage">
        <div className="container">
          {/* WOMEN-ROUTE */}
          <div className="women-mainpage-route">
            <h5 className="fs-6">HOME / WOMEN</h5>
          </div>
          {/* WOMEN-HEADER */}
          <div className="women-mainpage-header">
            <h1 className="women-mainpage-header-title fw-bold py-1">WOMENS</h1>
            <div className="row mx-0">
              <div className="col-md-12 col-lg-6 px-0">
                <p className="women-mainpage-header-text py-2">
                  Elisha offers a vast selection of women's clothing to shop.
                  Each season finds a careful assortment of clothing no matter
                  the season, trend-driven and classic pieces are avaiable.
                  Elisha is committed to helping shopper be their the most
                  stylish selves
                </p>
              </div>
            </div>
          </div>
          {/* WOMEN-BODY */}
          <div className="container women-mainpage-body text-center mb-3 mt-4">
            <h3 className="fs-1 fw-bold  women-mainpage-body-title">CATEGORIES</h3>

            <div className="women-mainpage-body-content my-3 py-3">
              <div className="row mx-0 d-flex justify-content-center align-items-center">



                {/* FIRST BOX  */}
                {categoriesType.map((data) => {
                  return (
                    <div className="col-md-12 col-lg-5 women-mainpage-box mx-3 my-4 shadow" style={{ backgroundImage: `url(${data.image.secure_url})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} >

                      <div className="row mx-0 women-mainpage-box-cont">
                        <div className="col-xs-0 col-sm-5 col-md-5 col-lg-4 women-mainpage-box-left">
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 women-mainpage-box-right">
                          <div className="women-mainpage-box-1">
                            <h4 className="fw-bold ps-4 text-light fs-1">{data.name}</h4>
                            <ul>
                              {/* {id1.link_list.map((link, index) => (
                                <li key={index}>{link}</li>
                              ))} */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* <div className="col-md-12 col-lg-5 women-mainpage-box mx-3 my-4 shadow" style={{ backgroundImage: `url(${bg_box_2})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} >
                  <div className="row mx-0 women-mainpage-box-cont">
                    <div className="col-md-7 women-mainpage-box-left">
                      <div className="women-mainpage-box-1">
                        <h4 className="fw-bold text-start ps-4">{id2.heading}</h4>
                        <ul>
                          {id2.link_list.map((link, index) => (
                            <li key={index}>{link}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-5 women-mainpage-box-right">

                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-5 women-mainpage-box mx-3 my-4 shadow" style={{ backgroundImage: `url(${bg_box_3})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} >
                  <div className="row mx-0 women-mainpage-box-cont">
                    <div className="col-xs-6 col-sm-5 col-md-5 col-lg-4 women-mainpage-box-left">
                    </div>
                    <div className="col-xs-6 col-sm-7 col-md-7 col-lg-7 women-mainpage-box-right">
                      <div className="women-mainpage-box-1">
                        <h4 className="fw-bold ps-4 fs-2 me-4">{id3.heading}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-5 women-mainpage-box mx-3 my-4 shadow" style={{ backgroundImage: `url(${bg_box_4})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} >
                  <div className="row mx-0 women-mainpage-box-cont">
                    <div className="col-xs-6 col-sm-5 col-md-5 col-lg-4 women-mainpage-box-left">
                    </div>
                    <div className="col-xs-6 col-sm-7 col-md-7 col-lg-7 women-mainpage-box-right">
                      <div className="women-mainpage-box-1">
                        <h4 className="fw-bold pe-4">{id4.heading}</h4>
                        <ul className="px-0">
                          {id4.link_list.map((link, index) => (
                            <li key={index}>{link}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </section >

      <section className="scroll-bar">
        <PretStyles heading="50 % OFF" slide={4} />
      </section>
    </>
  );
};

export default WomenMainPage;

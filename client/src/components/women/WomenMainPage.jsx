import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryTypeAsync, getSubCategoryTypeAsync } from "../../features/categorySlice";
import { useNavigate } from "react-router-dom";

const WomenMainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FETCH STITCHED CATEGORY FROM STORE
  const womenCategoryId = useSelector(state =>
    state.category.categories.find(category => category.name === "Women")?.id);
  const categoriesType = useSelector((state) => state.category.categoriesType);


  const extractIds = () => {
    return categoriesType.map((item) => item.id)
  }

  const categoryTypeIds = useMemo(() => extractIds(categoriesType), [categoriesType]);

  const subCategoriesType = useSelector((state) => state.category.subcategoriesType);
  // console.log('subCategoriesType', subCategoriesType);


  // CALL TO GET ALL CATEGORIES-TYPES
  useEffect(() => {
    dispatch(getCategoryTypeAsync({ category: womenCategoryId }));
  }, [womenCategoryId, dispatch]);

  useEffect(()=>{
    
      dispatch(getSubCategoryTypeAsync({ categoryType: categoryTypeIds }));
  },[dispatch,categoryTypeIds])


  const handleItemClick = (item) => {
    navigate(`/productbysubcategory/${item}`);
    window.scrollTo(0, 0);
  };


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
                    <div className=" col-sm-12 col-md-4 col-lg-5 women-mainpage-box mx-3 my-4 shadow" style={{ backgroundImage: `url(${data.image.secure_url})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} >

                      <div className="row mx-0 women-mainpage-box-cont">
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-12 women-mainpage-box-right">
                          <div className="women-mainpage-box-1">
                            <h4 className="fw-bold ps-4 text-light fs-1">{data.name}</h4>
                            <ul className="subCategories_name">
                              {/* HERE WE MAP THE SUB-CATEGORY OF THAT CORRESPONDING CATEGORY */}
                              {subCategoriesType
                                .filter((subCategory) => subCategory.categoryType === data.id)
                                .map((subCategory) => (
                                  <li onClick={() => handleItemClick(subCategory.id)} key={subCategory.id} style={{ cursor: "pointer" }}>{subCategory.name}</li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default WomenMainPage;

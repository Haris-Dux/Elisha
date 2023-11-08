import React from "react";
import "./component.css";
import main_page_img from "./main_page_img.jpg";

const MainPage = () => {
  return (
    <>
      <section className="main_page my-2 py-2">
        <div className="img-cont">
          <img
            className="main_page_img d-flex justify-content-center align-item-center"
            src={main_page_img}
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default MainPage;

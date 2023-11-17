import React from "react";

const BrandNameLogo = () => {
  return (
    <>
      <section className="brand-name-logo py-5">
        <h2 className="brand-name-logo-header fs-1 fw-bold text-center">
          FEATURED DESIGNER BRANDS
        </h2>
        <div className="container brand-name-logo-content d-flex justify-content-center my-5">
          <div className="row d-flex justify-content-center align-item-center">
            <div className="col-md-2 brand-name-logo-box">
              <h4>KHADDI</h4>
            </div>
            <div className="col-md-2 brand-name-logo-box">
              <h4>SAPHIRE</h4>
            </div>
            <div className="col-md-2 brand-name-logo-box">
              <h4>BONANZA</h4>
            </div>
            <div className="col-md-2 brand-name-logo-box">
              <h4>liME liGHT</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandNameLogo;

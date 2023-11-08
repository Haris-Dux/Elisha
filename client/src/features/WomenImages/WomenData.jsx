import all_product_1 from "./all_product_1.jpg";
import all_product_2 from "./all_product_2.jpg";
import all_product_3 from "./all_product_3.jpg";
import all_product_4 from "./all_product_4.jpg";
import new_arivals1 from "./new_arivals1.jpg";
import new_arivals2 from "./new_arivals2.jpg";
import new_arivals3 from "./new_arivals3.jpg";
import new_arivals4 from "./new_arivals4.jpg";
import women_newArrivals_1 from "./women_newArrivals_1.jpg";
import women_newArrivals_2 from "./women_newArrivals_2.jpg";
import women_newArrivals_3 from "./women_newArrivals_3.jpg";
import women_newArrivals_4 from "./women_newArrivals_4.jpg";
import women_newArrivals_5 from "./women_newArrivals_5.jpg";

const womenData = [
  {
    id: 1,
    image: all_product_1,
    subCategory: "Stitched-1pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",


  },
  {
    id: 2,
    image: all_product_2,
    subCategory: "Stitched-1pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 3000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 3,
    image: all_product_3,
    subCategory: "Stitched-1pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 4000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 4,
    image: all_product_4,
    subCategory: "Stitched-1pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2780,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },

  {
    id: 5,
    image: all_product_2,
    subCategory: "Stitched-2pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2320,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 6,
    image: all_product_3,
    subCategory: "Stitched-2pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2300,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 7,
    image: all_product_4,
    subCategory: "Stitched-2pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },

  {
    id: 8,
    image: all_product_1,
    subCategory: "Stitched-2pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 9,
    image: all_product_2,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 10,
    image: all_product_3,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 11,
    image: all_product_4,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 12,
    image: all_product_1,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 13,
    image: new_arivals1,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 14,
    image: new_arivals2,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 15,
    image: new_arivals3,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 16,
    image: new_arivals4,
    subCategory: "Stitched-3pc",
    product_name: "Classic Kameez",
    product_type: "Printed",
    product_price: 2000,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 17,
    image: women_newArrivals_1,
    subCategory: "Stitched-3pc",
    product_name: "New Arrivals",
    product_type: "Printed",
    product_price: 2380,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 18,
    image: women_newArrivals_2,
    subCategory: "Stitched-3pc",
    product_name: "New Arrivals",
    product_type: "Printed",
    product_price: 2380,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 19,
    image: women_newArrivals_3,
    subCategory: "Stitched-3pc",
    product_name: "New Arrivals",
    product_type: "Printed",
    product_price: 2380,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 20,
    image: women_newArrivals_4,
    subCategory: "Stitched-3pc",
    product_name: "New Arrivals",
    product_type: "Printed",
    product_price: 2380,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
  {
    id: 21,
    image: women_newArrivals_5,
    subCategory: "Stitched-3pc",
    product_name: "New Arrivals",
    product_type: "Printed",
    product_price: 2380,
    quantity: 1,
    product_code: "Sku92839238",
    product_size: ["XS", "S", "M", "L", "XL"], selectedSize: "",
    product_details: "Top Fabric:Digital Printed Embroidered Cambric | 3m Bottom Fabric:Digital Printed Cambric | 2.5m Technique:Printed Embroidered Fabric Content:100% Cotton Description:Essentials Printed Embroidered Top Bottoms",

  },
];

export default womenData;

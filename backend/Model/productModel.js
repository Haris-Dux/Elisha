
const mongoose = require('mongoose');
const { uploadImageToCloudinary, deleteImageToCloudinary } = require('../assets/cloudinary');


const Schema = mongoose.Schema;

const productsSchema = new Schema({
    image: {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
      },
      itemCode:{
        type:String,
        unique:true,
        required:true
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      productDetail: {
        type: String,
        required: true,
      },
      size: {
        type: Array,
        default: [],
      },
      category: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
       categoryType: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      subCategory: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      discount: {
        type: Boolean,
        default: false,
      },
      topSales: {
        type: Boolean,
        default: false,
      },
      newArrival: {
        type: Boolean,
        default: false,
      },
      availableQuantity: {
        type: Number,
        default: 0,
      },
      fabric: {
        type: String,
      },
    },
    { timestamps: true });

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, returnValue) => {
        delete returnValue._id;
        delete returnValue.__v;
      },
    });

    function isFieldEmpty(fieldName, msg = null) {
      let fieldValidation = false;
    
      if (fieldName) {
        fieldValidation = true;
      } else {
        if (msg) {
          throw new Error(msg);
        } else {
          throw new Error("Something Went Wrong");
        }
      }
      return fieldValidation;
    }

    productsSchema.statics.createProduct = async function (data) {
      const {
        image,
        name,
        description,
        productDetail,
        itemCode,
        size,
        category,
        categoryType,
        subCategory,
        price,
        discount,
        availableQuantity,
        fabric,
        topSales,
        newArrival
      } = data;
    
      isFieldEmpty(name, "Name Field is Empty");
      isFieldEmpty(itemCode, "ItemCode Field is Empty");
      isFieldEmpty(description, "Description Field is Empty");
      isFieldEmpty(productDetail, "Product Detail Field is Empty");
      isFieldEmpty(category, "Category Not Selected");
      isFieldEmpty(categoryType, "Category Type Not Selected");
      isFieldEmpty(subCategory, "Sub Category Not Selected");
      //isFieldEmpty(size, "No size Added");
      isFieldEmpty(price, "Price Field is Empty");
    
      if (price <= 0) {
        throw new Error("Price must be greater then 0");
      }
    
     const result = await uploadImageToCloudinary(image,"/products")
      let productQuery = {
        image: {
          public_id: result.public_id ,
          secure_url: result.secure_url ,
        },
        name,
        description,
        productDetail,
        itemCode,
        size,
        category,
        categoryType,
        subCategory,
        price,
        discount,
        availableQuantity,
        fabric,
        topSales,
        newArrival
      };
    
        if (availableQuantity <= 0) {
          throw new Error("Available Quantity must be greater then 0");
        }
        productQuery = { ...productQuery, availableQuantity };
      
      const product = await this.create(productQuery);
    
      if (!product) {
        await deleteImageToCloudinary(public_id);
        throw new Error("Your data was not uploaded");
      }
      return product;
    };

    productsSchema.statics.getAllProducts = async function (data)  {
      const { 
        image = '',
        name,
        description,
        productDetail,
        itemCode,
        size,
        category,
        categoryType,
        subCategory,
        price = { priceMin: 0, priceMax: 99999 },
        discount,
        fabric,
        topSales,
        newArrival,
        limit = 12,
        currentPage = 1
      } = data;

      let productQuery = {availableQuantity:{$gt:0}}

      if(name){
        productQuery = {...productQuery,name:{ $regex: ".*" + name + ".*", $options: "i"}}
      }
      if (price) {
        const { priceMin, priceMax } = price;
        productQuery = {
          ...productQuery,
          price: { $gte: priceMin, $lte: priceMax },
        };
      }
      if(category){
        productQuery = {...productQuery,category}
      }
      if(categoryType){
        productQuery = {...productQuery,categoryType}
      }
      if(subCategory){
        productQuery = {...productQuery,subCategory}
      }
      if(itemCode){
        productQuery = {...productQuery,itemCode}
      }
      if(size){
        productQuery = {...productQuery,size}
      }
      if(typeof topSales == "boolean"){
        productQuery = {...productQuery,topSales}
      }

      const totalItems = await this.find(productQuery).count();
      const products = await this.find(productQuery)
        .limit(limit)
        .skip((currentPage - 1) * limit)
        .sort({ createdAt: -1 });

      if(!products){
        throw new Error("Product Data Not Retrived")
      }

      return { products, totalPages: Math.ceil(totalItems / limit), currentPage };

    };

    productsSchema.statics.updateProduct = async function (data) {
      const {
        id,
        image,
        name,
        description,
        productDetail,
        itemCode,
        size,
        category,
        categoryType,
        subCategory,
        price,
        discount,
        availableQuantity,
        fabric,
        topSales,
        newArrival
      } = data;

      isFieldEmpty(id, "No ID Provided");
      isFieldEmpty(name, "Name Field is Empty");
      isFieldEmpty(itemCode, "ItemCode Field is Empty");
      isFieldEmpty(description, "Description Field is Empty");
      isFieldEmpty(productDetail, "Product Detail Field is Empty");
      isFieldEmpty(category, "Category Not Selected");
      isFieldEmpty(categoryType, "Category Type Not Selected");
      isFieldEmpty(subCategory, "Sub Category Not Selected");
      //isFieldEmpty(size, "No size Added");
      isFieldEmpty(price, "Price Field is Empty");

      if(price <= 0){
        throw new Error('Price should be greater than 0');
      }

      let productUpdateQuery = {
        name,
        image,
        description,
        productDetail,
        itemCode,
        size,
        category,
        categoryType,
        subCategory,
        price,
        discount,
        availableQuantity,
        fabric,
        topSales,
        newArrival
      };

      if (availableQuantity) {
        if (availableQuantity <= 0) {
          throw new Error("Available Quantity must be greater then 0");
        }
        productUpdateQuery = { ...productUpdateQuery, availableQuantity };
      }

      if (name) {
        productUpdateQuery = {... productUpdateQuery,name};
     }
     
     if (description) {
        productUpdateQuery = {... productUpdateQuery,description};
     }
     
     if (productDetail) {
        productUpdateQuery = {... productUpdateQuery,productDetail};
     }
     
     if (itemCode) {
        productUpdateQuery = {... productUpdateQuery,itemCode};
     }
   
     if (size) {
        productUpdateQuery = {... productUpdateQuery,size};
     }
     
     if (category) {
        productUpdateQuery = {... productUpdateQuery,category};
     }
     
     if (categoryType) {
        productUpdateQuery = {... productUpdateQuery,categoryType};
     }
     
     if (subCategory) {
        productUpdateQuery = {... productUpdateQuery,subCategory};
     }
     
     if (price) {
        productUpdateQuery = {... productUpdateQuery,price};
     }
     
     if (discount) {
        productUpdateQuery = {... productUpdateQuery,discount};
     }
   
     if (fabric) {
        productUpdateQuery = {... productUpdateQuery,fabric};
     }
     
     if (topSales ) {
        productUpdateQuery = {... productUpdateQuery,topSales};
     }
     
     if (newArrival) {
        productUpdateQuery = {... productUpdateQuery,newArrival};
     }

     if(image){
      const result = await uploadImageToCloudinary(image,"/products");
      const imageData = {
        public_id: result.public_id,
        secure_url : result.secure_url
      }
      const productData = await this.findById(id);
      await deleteImageToCloudinary(productData.image.public_id);
      productUpdateQuery = {...productUpdateQuery,image:imageData}
    }

     const product = await this.findByIdAndUpdate(id, productUpdateQuery);

     if (!product) {
      await deleteImageToCloudinary(public_id);
      throw new Error("Your data was not updated");
    }

     return product;
     
    };

    productsSchema.statics.deleteProduct = async function (data) {
      const { id } = data;
    
      isFieldEmpty(id, "No ID Provided");
    
      const productData = await this.findById(id);
      deleteImageToCloudinary(productData.image.public_id);
    
      const product = await this.findByIdAndDelete(id);
    
      if (!product) {
        throw new Error("Your data was not deleted");
      }
      return product;
    };

    productsSchema.statics.getProduct = async function (data) {
      const { id } = data;
      isFieldEmpty(id, "No ID Provided");
      const product = await this.findById(id);
      if (!product) {
        throw new Error("The requested Product does not exist.");
      }
      return product;
    };

    

    module.exports = mongoose.model("products",productsSchema);

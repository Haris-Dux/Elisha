
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String,default: "" },
    phone: {type: String, default: ""},
    role: {type: String, required: true},
},{timestamps:true});

function setMongoose () {
    mongoose.set('toJSON',{
        virtuals:true,
        transform: (doc,returnValue) => {
            delete returnValue.password
            delete returnValue._id
            delete returnValue.__v
            delete returnValue.createdAt;
            delete returnValue.updatedAt;       
        }
    })
};

async function catchErrors (error) {
    const errorException = new Error(" ");
    let errorMsg = '';
    let errorCode = '';
    if(error.code === 11000){
        errorMsg = `${Object.keys(error.keyValue)[0]} already exists`
    } else{
       errorMsg = Object.values(error.message)[0]
    } 
    errorException.message = errorMsg;
    errorException.code = errorCode;

    throw errorException;
};

async function generateToken({
     data = {},
     expiresIn = "5m",
     tokeSecret = process.env.JWT_ACCESS_SECRET
}) {
    return await JWT.sign(data,tokeSecret,{expiresIn}) ;
};

usersSchema.statics.signup = async function (data) {
    const {name,email,password,role} = data;
    if (!name) {
        throw new Error("Name Field is empty");
      }
      if (!email) {
        throw new Error("Email Field is empty");
      }
    
      if (!password) {
        throw new Error("Password Field is empty");
      }
    
      if (!role) {
        throw new Error("Role is not set");
      }

      const validateEmail = validator.isEmail(email);

      if(!validateEmail){
        throw new Error('Invalid Email');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt)

      const user = await this.create({
        name,
        email,
        password:hashedPass,
        role
      }).catch((error)=>catchErrors(error));
      setMongoose();
      return user;
};

usersSchema.statics.login = async function (data) {
    const {email,password} = data;
    if (!email) {
        throw new Error("Email Field is empty");
      }
    
      if (!password) {
        throw new Error("Password Field is empty");
      }

      const validateEmail = validator.isEmail(email);

      if (!validateEmail) {
        throw new Error("This is not a valid E-mail");
      }

      const user = await this.findOne({email});

      if (!user) {
        throw new Error ("User Not Found");
      }

      const comparePassword = await bcrypt.compare(password,user.password);

      if(!comparePassword){
        throw new Error ("Incorrect Password");
      }

      setMongoose();

      return user;

};

// usersSchema.statics.logout = async function (data) {
//   const {id} = data;
//   if (!id) {
//     throw new Error("No Id Provided");
//   }
//   const user = await this.findById(id);
//   user.accessToken = null;
//   return user;
// };

usersSchema.statics.updateUser = async function (data) {
  const { id, name, email, address, phone, newPassword, confirmPassword } = data;
  let updateFields = {
    name,
    email,
    address,
    phone
  }
  if (!name) {
    throw new Error("Name Field is empty");
  } 

  if (!email) {
    throw new Error("Email Field is empty");
  } 

  if (!address) {
    throw new Error("Address Field is empty");
  }

  if (!phone) {
    throw new Error("Phone Field is empty");
  }

  const validateEmail = validator.isEmail(email);

  if (!validateEmail) {
    throw new Error("This is not a valid E-mail");
  }

  if(newPassword){
    if(newPasswordassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if(newPassword === confirmPassword){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword,salt);
      updateFields = {
        ...updateFields,
        hashedPassword
      }
    }
  }

  const user = await this.findByIdAndUpdate(id,updateFields)

  setMongoose();

  return user;
};

usersSchema.statics.getUser = function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID Not Provided");
  }

  const user = this.findById(id);

  return user;
};



module.exports = mongoose.model("users",usersSchema);
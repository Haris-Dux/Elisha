
const userModel = require('../Model/userModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { resetPaswordMail } = require('../assets/nodeMailer');

async function generateToken({
    data = {},
    tokenSecret =process.env.JWT_ACCESS_SECRET,
    expiresIn = "1d",
  } = {}) {
    return await JWT.sign(data, tokenSecret, { expiresIn });
  };

async function signup (req,res) {
    try {
        const userData = await userModel.signup(req.body);
        res.status(200).json({userData,msg:"You Have Signed Up Successfully"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function login(req,res) {
    try {
        const userData = await userModel.login(req.body);
        const accessToken = await generateToken({
            data : {
                id:userData.id
            }
        });
        res.status(200).json({userData,accessToken,msg:"Login SuccessFull"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function logout(req,res) {
    try {
        //const {id} = req.body;
        //const user = await userModel.logout({id})
        res.status(200).json({msg:"Logout Successfull"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function updateUser(req,res) {
    try {
        const userData = await userModel.updateUser(req.body);
        res.status(200).json({ userData, msg: "You Info has been updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function forgotPassword(req,res) {
    const { email } = req.body;
    const from = process.env.EMAIL_FROM;
    try {
        if (!email) {
            throw new Error("No Email Provided");
          }
       const emailResponse = await resetPaswordMail(email,from);
       res.status(200).json({msg:'Email Sent'})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function resetPassword(req,res) {
    const {resetToken,newPassword,confirmPassword} = req.body;
    try {
        if(newPassword !== confirmPassword){
            throw new Error ("Passwords Not Matching")
        }
        const decode = await JWT.decode(
            resetToken,
            process.env.JWT_ACCESS_SECRET,
        );
        const user = await userModel.findById(decode.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        await userModel.findByIdAndUpdate(user.id,{password:hashedPassword});
        res.status(200).json({msg:"Password Reset Successfully"});
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
};

async function validateToken (req,res) {
    const {accessToken} = req.body;

    let validateAccessToken = false;
    let tokenValidation = false;
    let msg;
    let user;

    validateAccessToken = await JWT.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET,
        
        async (error,decode) => {
            if(error) {
                return false;
            };
            msg = "Your Session is Valid";
            tokenValidation = true;
            return true;
        }
    );

    if(!validateAccessToken){
        res.status(401).json({msg:"Your Session is Expired"})
    }

    const decodeToken = await JWT.decode(
        accessToken,
        process.env.JWT_ACCESS_SECRET,
      );

     if(validateAccessToken === true){
        user = await userModel.findById(decodeToken.id);
     }

   

     res.status(200).json({
        tokenValidation,
        validateAccessToken,
        msg,
        user
      });

      async function getUser(req, res) {
        try {
          const user = await userModel.getUser();
          res.status(200).json({ msg: "Got User", user });
        } catch (error) {
          res.status(400).json({ msg: error.message });
        }
      };
      


};

async function getUser(req, res) {
    try {
      const user = await userModel.getUser(req.body);
      res.status(200).json({ msg: "Got User", user });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
module.exports = {
    signup,
    login,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    validateToken,
    getUser
    
}
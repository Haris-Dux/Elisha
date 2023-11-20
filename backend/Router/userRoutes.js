
const {Router} = require('express');
const { signup, login, logout, updateUser, forgotPassword, resetPassword, validateToken, getUser } = require('../Controller/userController');
const userRouter = Router();


userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/getUser",getUser);
userRouter.post("/logout",logout);
userRouter.post("/updateUser",updateUser);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.post("/resetPassword",resetPassword);
userRouter.post("/validateToken",validateToken);


module.exports = userRouter;
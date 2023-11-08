const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/userRoutes');
const productRouter = require('./Router/productRoutes');
const orderRouter = require('./Router/orderRoutes');
const categoryRouter = require('./Router/categoryRoutes');
const categoryTypeRouter = require('./Router/categoryTypeTouter');
const subCategoryRouter = require('./Router/subCategoriesRouter');


app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use('/api',userRouter);
app.use('/api',productRouter);
app.use('/api',orderRouter);
app.use('/api',categoryRouter);
app.use('/api',categoryTypeRouter);
app.use('/api',subCategoryRouter);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(process.env.PORT,console.log('server running'))
})
.catch((error)=>{
    console.log(error)
})


const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");
const {
  getAllFactory,
  getByIdFactory,
  checklistToPostFactory,
  toCreateFactory,
  toDeleteFactory,
} = require("./utility/crudFactory");

dotenv.config();
const app = express();
app.use(express.json());

const { PORT, DB_USERNAME, DB_PWD } = process.env;

const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PWD}@cluster0.qmx8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbUrl)
  .then(function () {
    console.log("Connection Success");
  })
  .catch((err) => console.log(err.message));

/** API Handlers */
/************* User Handlers *************/
const getAllUser = getAllFactory(UserModel);
const getUserByID = getByIdFactory(UserModel);
const checkUserDetails = checklistToPostFactory(UserModel);
const createUser = toCreateFactory(UserModel);
const deleteUserById = toDeleteFactory(UserModel);
/************* Product Handlers *************/
const checkProductDetails = checklistToPostFactory(ProductModel);
const createProduct = toCreateFactory(ProductModel);
const getAllProduct = getAllFactory(ProductModel);
const productByID = getByIdFactory(ProductModel);
const deleteProductByID = toDeleteFactory(ProductModel);

/** Route Methods*/
/************* User APIs *************/
app.get("/api/user", getAllUser);
app.get("/api/user/:id", getUserByID);
app.post("/api/user", checkUserDetails, createUser);
app.delete("/api/user/:id", deleteUserById);
/************* Product APIs *************/
app.get("/api/product", getAllProduct);
app.get("/api/product/:id", productByID);
app.post("/api/product", checkProductDetails, createProduct);
app.delete("/api/product/:id", deleteProductByID);

/** Default Route */
app.use(function (req, res) {
  res.status(200).json({
    status: "failure",
    message: "No route found",
  });
});

/** Initialize server */
app.listen(PORT, function (req, res) {
  console.log(`Server is running at ${PORT}`);
});

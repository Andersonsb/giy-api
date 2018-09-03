const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const clientRoutes = require("./api/routes/clients");

//connect to mongo db
mongoose.connect(
  "mongodb://giy-api:" +
    process.env.MONGO_ATLAS_PW +
    "@giy-api-db-shard-00-00-rxigf.mongodb.net:27017,giy-api-db-shard-00-01-rxigf.mongodb.net:27017,giy-api-db-shard-00-02-rxigf.mongodb.net:27017/test?ssl=true&replicaSet=giy-api-db-shard-0&authSource=admin&retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//routes which will handle requests
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", userRoutes);
app.use("/clients", clientRoutes);

//custom message
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

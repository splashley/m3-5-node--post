"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  handleHomePage,
  handle404,
  handleFormData,
  orderValidation,
} = require("./functions");

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints for exercise 1
  .get("/todos", handleHomePage)
  .post("/data", handleFormData)

  //endpoints for exercise 2
  .post("/order", orderValidation)
  .get("/order-confirmed", (req, res) => {
    res.render("pages/order-confirmation");
  })
  // handle 404s
  .use(handle404)

  .get("*", (req, res) => res.send("Dang. 404."))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));

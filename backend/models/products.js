const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator =require('validator');

let productsSchema = new Schema(
  {
    product_Code: {
      type: Number,
      required: true
    },
    product_Name: {
      type: String,
      required: true
    },
    product_Image: {
      type: String,
    },
    product_Price: {
      type: Number,
      required: true
    },
    product_Stock: {
      type: Number,
      required: true
    },
    create_time:{
      type: Date,
      default: Date.now, 
      required: true,
    },
    update_time:{
      type: Date,
      default: Date.now, 
      required: true,
    },
    create_by:{
      type: String,
      required: true,
    },
    update_by:{
      type: String,
    }
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Products", productsSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator =require('validator');

let document_saleorder_Schema = new Schema(
  {
    document_Number:{
      type: Number,
      required: true,
    },
    product_Code: {
      type: Number,
      required: true,
    },
    product_Name: {
      type: String,
      required: true
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
    create_by:{
      type: String,
      required: true,
    },
  },
  {
    collection: "document_saleorder",
  }
);

module.exports = mongoose.model("Document_saleorders", document_saleorder_Schema);
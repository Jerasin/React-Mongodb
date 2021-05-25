const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator =require('validator');

let document_saleorderlist_Schema = new Schema(
  {
    document_Number:{
      type: Number,
      required: true,
    },
    grand_total:{
      type: Number,
      require: true
    },
    sku:{
      type: Number,
      require: true
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
    collection: "document_saleorderlist",
  }
);

module.exports = mongoose.model("Document_saleorderlist", document_saleorderlist_Schema);
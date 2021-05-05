const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator =require('validator');

let usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail
      } 
    },
    password: {
      type: String,
      required: true,
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
    }
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("Users", usersSchema);



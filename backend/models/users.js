const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator =require('validator');

let usersSchema = new Schema(
  {
    user_Code:{
      type: Number,
      require: true,
      unique: true,
      default: function() {
        return Math.floor(Math.random() * 900030000) + 1000000
    }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail // validator format email ก่อนบันทึกลง db
      },
      unique: true, // Primary Key
      trim: true // ไว้จัดการตัวเช็คว่ามีช่องว่างไหมก่อนบันทึกลง db
    },
    password: {
      type: String,
      required: true,
    },
    userRole:{
      type: String,
      required: true
    },
    create_date:{
      type: Date,
      default: Date.now, 
      required: true,
    },
    update_date:{
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



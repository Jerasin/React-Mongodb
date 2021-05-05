const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const authorization = require("./../config/authorize");

//  Module for Upload Files
const formidable = require("formidable");

const path = require("path");

// Module is FileSystem for Manager Files
const fs = require("fs-extra");

// Product model
const productsSchema = require("./../models/products");
const Constatns = require("../constatns");

//  Get All Product
router.route("/product").get(authorization,async (req, res) => {
  await productsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Add Product
router.post("/product", async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      // Check Product Code to Duplicate
      productsSchema.findOne(
        { product_Code: fields.product_Code },
        async (error, doc) => {
          if (doc) {
            console.log("Duplicate")
            return res.json({
              status: "Duplicate",
              doc,
            });
          } else {
            
            // If not Product Code to Duplicate can add product success
            console.log(fields);

            let result = await productsSchema.create({
              ...fields,
              product_Image: "",
            });
           if(files.product_Image != null){
            data = await uploadImage(files, result);
            // console.log({Status: data})
            return res.json({
              status: "OK",
              message: result
            });
           }
           return res.json({
            status: "OK",
            message: result
          });
          }
        }
      );
    });
  } catch (error) {
    res.json({ status: "NOK", message: JSON.stringify(error) });
  }
});

// Upload Image
uploadImage = async (files, doc) => {
    //  Split  fileExtention
    let fileExtention = files.product_Image.name.split(".")[1];

    // Custom Filename Ex: (product_id = 1150) + (fileExtention = .pdf)
    doc.product_Image = `${doc.product_Code}.${fileExtention}`;

    // Custom  Newpath to save Files
    let newpath =
      path.resolve("./" + "/upload/images/") + "/" + doc.product_Image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.product_Image.path, newpath);

    // Update database
    productsSchema.findByIdAndUpdate(
      doc._id,
      { product_Image: doc.product_Image },
    (err, data) => {
        if (err) {
          return err;
        } else {
          return data;
        }
      }
    ); 
};

// Get Product By Id
router.route("/product/:id").get((req, res) => {
  const { id } = req.params;
  productsSchema.findById(id, (err, doc) => {
    if (err) {
      return err;
    } else {
      res.json(doc);
    }
  });
});

// Delete Product By Id
router.route("/product/:id").delete((req, res) => {
  try {
    const { id } = req.params;
    productsSchema.findByIdAndDelete(id, async (err, doc) => {
      if (err) {
        return err;
      } else {
        await fs.remove(
          path.resolve("./" + "/upload/images/") + "/" + doc.product_Image.name
        );
        res.json(doc);
      }
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

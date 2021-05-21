const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const authorization = require("./../authentication/authorize");

//  Module for Create DataForm
const formidable = require("formidable");

const path = require("path");

// Module is FileSystem for Manager Files
const fs = require("fs-extra");

// Product model
const productsSchema = require("./../models/products");
const Constatns = require("../constatns");

//  Get All Product
router.get("/productAll",authorization, async (req, res) => {
  await productsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Add Product
router.post("/product", authorization ,async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      // Check Product Code to Duplicate

      productsSchema.findOne(
        { product_Code: fields.product_Code },
        async (error, doc) => {
          if (doc) {
            return res.json({
              status: "Duplicate",
              doc,
            });
          } else {
            // If not Product Code to Duplicate can add product success

            let result = await productsSchema.create({
              ...fields,
              product_Image: null,update_by: null , update_time: Date.now()
            });
            if(!files.product_Image) return res.json({
              status: "OK",
              message: result,
            });
            if (
              // files.product_Image != null &&
              files.product_Image.type != undefined &&
              files.product_Image.type === "image/jpeg"
            ) {
              data = await uploadImage(files, result);
              return res.json({
                status: "OK",
                message: result,
              });
            }
          }
        }
      );
    });
  } catch (error) {
    res.json({ status: "NOK", message: JSON.stringify(error) });
  }
});

// Update Product By ID
router.put("/product/:id",authorization, async (req, res) => {
  try {
    const { id } = req.params;
    let form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await productsSchema.findByIdAndUpdate(
        id,
        { ...fields,update_time: Date.now() },
        async (err, result) => {
          if(err) return err;
          // console.log(fields.product_Image)
          if(!files.product_Image) return res.json({
            status: "NoFlieUpdate",
            result_id: result,
          });
          if (
            files.product_Image &&
            files.product_Image.type === "image/jpeg"
          ) {
            data = await uploadImage(files, result);
            return res.json({
              result_id: result,
            });
          }
          res.json({
            result_id: result,
          });
        }
      );
    });
  } catch (err) {
    res.json({ status: "NOK", result: err });
  }
});

// Upload Image
uploadImage = async (files, doc) => {
 if(files.product_Image === null) return console.log("Upload Img")
  //  Split  fileExtention
  let fileExtention = files.product_Image.name.split(".")[1];
  console.log("uploadImage")
  // Custom Filename Ex: (product_id = 1150) + (fileExtention = .pdf)
  doc.product_Image = `${doc.product_Code}.${fileExtention}`;

  // Custom  Newpath to save Files
  let newpath =
    path.resolve("./" + "/upload/images/") + "/" + doc.product_Image;
  if (fs.access(newpath)) {
    await fs.remove(newpath);
  }
  await fs.moveSync(files.product_Image.path, newpath);

  // Update database
  productsSchema.findByIdAndUpdate(
    doc._id,
    { product_Image: doc.product_Image },
    (err, data) => {
      if (err) return err;
      return data;
    }
  );
};

// Get Product By Id
router.route("/product/:id").get(authorization,async(req, res) => {
  const { id } = req.params;
  await productsSchema.findById(id, (err, doc) => {
    if (err) return err;
    fs.exists(
      path.resolve("./" + "/upload/images/") + "/" + doc.product_Image
    );
    res.json({ result_id: doc});
    })
   
  });


// Delete Product By Id
router.route("/product/:id").delete(authorization,(req, res) => {
  try {
    const { id } = req.params;
    productsSchema.findByIdAndDelete(id, (err, doc) => {
      if (err) return err;
      if (doc.product_Image != null) {
        fs.remove(
          path.resolve("./" + "/upload/images/") + "/" + doc.product_Image
        );

        // console.log(doc.product_Image);
      }

      res.json(doc);
    });
  } catch (err) {
    res.json(err);
  }
});

// Get Product Iimit
router.route("/getProducts").post(authorization ,async (req, res) => {
  const { page, limit } = req.body;
  // let limit = 5;
  let startIndex = (page - 1) * limit;
  let endIndex = limit * page;

  productsSchema
    .find()
    .sort({ product_Code: 1 })
    .exec((err, data) => {
      let lenth = data.length;
      let result = data.slice(startIndex, endIndex);
      let allPage = Math.ceil(lenth / limit);

      const next = () => {
        return parseInt(page) + 1;
      };

      const now = () => {
        return parseInt(page);
      };

      const after = () => {
        return parseInt(page) - 1;
      };

      const last = () => {
        return allPage;
      };

      res.json({
        lenthData: lenth,
        limit: limit,
        after: after(),
        now: now(),
        next: next(),
        last: last(),
        result: result,
      });
    });
});

router.route("/fakeData").get(async (req, res) => {
  for (let i = 1; i <= 11; i++) {
    await productsSchema.create({
      product_Code: i,
      product_Name: "test" + i,
      product_Stock: i,
      product_Price: i,
      product_Image: null,
      // create_time: Date.now,
      update_time: Date.now(),
      create_by: "TestSystem",
    });
  }
});

module.exports = router;

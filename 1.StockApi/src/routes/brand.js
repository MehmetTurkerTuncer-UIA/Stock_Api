"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// routes/brand
const brand = require("../controllers/brand");

// URL: /brands

router
  .route("/")
  .get(brand.list) // List Brands
  .post(brand.create); // Create Brand

router
  .route("/:id")
  .get(brand.read) // Read Brand
  .put(brand.update) // Update Brand
  .patch(brand.update) // Update Brand
  .delete(brand.delete); // Delete Brand


//EXPORT
module.exports = router;


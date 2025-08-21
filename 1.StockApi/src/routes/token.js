"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// routes/token
const token = require("../controllers/token");

// URL: /tokens

router
  .route("/")
  .get(token.list) // List Tokens
  .post(token.create); // Create Token

router
  .route("/:id")
  .get(token.read) // Read Token
  .put(token.update) // Update Token
  .patch(token.update) // Update Token
  .delete(token.delete); // Delete Token


//EXPORT
module.exports = router;


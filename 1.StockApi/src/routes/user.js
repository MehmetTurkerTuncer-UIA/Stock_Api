"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// routes/user
const user = require("../controllers/user");

// URL: /users

router
  .route("/")
  .get(user.list) // List Users
  .post(user.create); // Create User

router
  .route("/:id")
  .get(user.read) // Read User
  .put(user.update) // Update User
  .patch(user.update) // Update User
  .delete(user.delete); // Delete User


//EXPORT
module.exports = router;


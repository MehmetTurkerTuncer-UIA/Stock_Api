"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// routes/user
const user = require("../controllers/user");
const permissions = require("../middlewares/permissions");

// URL: /users

router
  .route("/")
  .get(permissions.isAdmin, user.list) // List Users
  .post(user.create); // Create User

router
  .route("/:id")
  .get(permissions.isLogin, user.read) // Read User
  .put(permissions.isLogin, user.update) // Update User
  .patch(permissions.isLogin, user.update) // Update User
  .delete(permissions.isAdmin, user.delete); // Delete User


//EXPORT
module.exports = router;


"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const permissions = require("../middlewares/permissions");

/* ------------------------------------------------------- */
// routes/sale:

const sale = require('../controllers/sale')

// URL: /sales

router.route('/')
    .get(permissions.isLogin, sale.list)
    .post(permissions.isLogin, sale.create)

router.route('/:id')
    .get(permissions.isLogin, sale.read)
    .put(permissions.isStaff, sale.update)
    .patch(permissions.isStaff, sale.update)
    .delete(permissions.isStaff, sale.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router
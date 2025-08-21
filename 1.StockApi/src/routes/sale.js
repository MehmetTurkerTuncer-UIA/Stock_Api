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

router.use(permissions.isAdmin)

router.route('/')
    .get(sale.list)
    .post(sale.create)

router.route('/:id')
    .get(sale.read)
    .put(sale.update)
    .patch(sale.update)
    .delete(sale.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router
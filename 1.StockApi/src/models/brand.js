"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const BrandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    image: {
        type: String,
        trim: true,
    }


},
    {
        collections: 'brands',
        timestamps: true,

})


/* ------------------------------------------------------- */
module.exports = mongoose.model('Brand', BrandSchema)
/* ------------------------------------------------------- */   


"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true  
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    quantity: {
        type: Number,
        default: 0,
    }       
},
    
    
    
    {collection: 'products', 
        
        timestamps: true   })


// EXPORT:        
/* ------------------------------------------------------- */
module.exports = mongoose.model('products', productSchema)
/* ------------------------------------------------------- */        
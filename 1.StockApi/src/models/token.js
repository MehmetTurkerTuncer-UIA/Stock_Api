"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */


const tokenSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            unique: true,
            index: true
        },

        token: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            index: true

        },


    },{
        collection: 'tokens',
        timestamps: true,       
    })


// EXPORTS:
/* ------------------------------------------------------- */    
    module.exports = mongoose.model('tokens', tokenSchema)
/* ------------------------------------------------------- */
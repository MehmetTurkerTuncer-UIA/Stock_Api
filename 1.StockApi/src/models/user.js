"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,

    },
    
    password: {
            type: String,  
            trim: true,      
            required: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,    
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isStaff: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },


},
    
    
    
    
    {

        collection: 'users',
        timestamps: true,   

    })
   








/* ------------------------------------------------------- */
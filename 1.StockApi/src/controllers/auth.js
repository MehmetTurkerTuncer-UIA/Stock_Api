"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require('../models/user'); // Assuming you have a User model for database operations
const Token = require('../models/token'); // Assuming you have a Token model for managing tokens
const jwt = require('jsonwebtoken'); // For JWT operations
const passwordEncrypt = require('../helpers/passwordEncrypt'); // Assuming you have a utility for password encryption


module.exports = {
 
    login: async (req, res) => {

 /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password } = req.body;

        if ((username || email) && password) {
            // Handle login with username or email and password
            // Example: Authenticate user and generate token
            
            const user = await User.findOne( {$or: [{ username }, { email }] }  );
            
            if (user && user.password == passwordEncrypt(password) ) {
               
                if (user.isActive){

                    // Simple Token
                    let tokenData = await Token.findOne({ userId: user._id });

                    if (!tokenData) {

                        tokendata  = await Token.create({
                            userId: user._id,
                            token: passwordEncrypt(user._id + Date.now())
                        
                        })

            //JWT Token
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' });
            const refreshToken = jwt.sign({_id: user._id, password: user.password}, process.env.REFRESH_KEY, { expiresIn: '3d' });



                res.status(200).send({
                    error: false,
                    message: "Login successful.",
                    token: token.data,
                    bearer:{accessToken, refreshToken},
                    user

                })

                }else {
                    res.errorStatusCode = 403;
                    throw new Error("User is not active.");
                }


            
            }else {
                res.errorStatusCode = 401;
                throw new Error("Invalid username/email or password.");
            }
        

        }
        else{

            res.errorStatusCode = 401
            throw new Error("Username or email and password are required for login.");
        }


    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */



    },

    logout: async (req, res) => {

        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */


    }

}




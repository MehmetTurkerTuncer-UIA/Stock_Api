"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const checkUserEmailAndPassword = function(data){

 // Email Control:
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (isEmailValidated) {

        // console.log('Email is OK')

        const isPasswordValidated = data.password ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password) : true

        if (isPasswordValidated) {

            data.password = passwordEncrypt(data.password);

            return data;
          
        } else {
             throw new Error('Password is not validated.')
        
          }
    } else {
         throw new Error('Email is not validated.')
         }
}

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                 schema: {
                  $ref: '#/definitions/User'
                }
            }
        */

    const data = await User.create(checkUserEmailAndPassword(req.body));

    /* AUTO LOGIN */ 
    // Simple Token:
    let tokenData = await Token.create({ 
      userId: data._id,
      token: passwordEncrypt(data._id + Date.now()) 
      
    });

    // JWT Token:
    const accessToken = jwt.sign(data.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ _id: data._id, password: data.password }, process.env.REFRESH_KEY, { expiresIn: '3d' });



    res.status(201).send({
      error: false,
      message: "User created successfully",
      token: tokenData.token,
      bearer: { accessToken, refreshToken },
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const data = await User.findOne({ _id: req.params.id });
    res.status(201).send({
      error: false,
      message: "User found successfully",
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.description = `
                Password Format Type: It must has min.1 lowercase,
                                                  min.1 uppercase, 
                                                  min.1 number and 
                                                  min.1 specialChars.
            `

            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                  schema: {
                  $ref: '#/definitions/User'
                }            
            }
        */

    const data = await User.updateOne({ _id: req.params.id },checkUserEmailAndPassword(req.body) , {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      message: "User updated successfully",
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deleteCount ? 204 : 404).send({
      error: !data.deleteCount,
      message: "User deleted : " + data.deleteCount,
      data,
    });
  },
};

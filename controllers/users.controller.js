const mapValidationMessages = require('../utils/mapValidationMessages');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { hashSync,compareSync } = require("bcrypt");
const saltRounds = 10;

async function create(req, res, next) {
    try {
  
      const result = validationResult(req); 
      
      if(result.isEmpty()){
        const data = req.body;
  
        const user = await User.create({
          name: data.name,
          email: data.email,
          password: hashSync(req.body.password,saltRounds)
        });
  
        res.status(201).json({
          success: true,
          data:{
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          }
        })
  
      } else {
        res.status(400).json({success:false,errors:
          mapValidationMessages(result.array())
        });
      }
    } catch(e){
      res.status(500).json({
        success:false,error:e.message
      });
    }
}

async function authenticate(req, res) {
    try {
      const data = req.body;
      const user = await User.findOne({ where: { email: data.email} });
      
      if(user && compareSync(data.password,user.password)){
        const token = jwt.sign({user:{
          email:user.email,
          id: user.id
        }}, process.env.TOKEN_SECRET);
  
        res.status(200).json({
          success:true,
          data:{
            token
          }
        });
  
      } else {
        res.status(401).json({success:false,errors:[{
            message:'please enter valid credintionals'
          }]}
        );
      }
    } catch(e){
      res.status(500).json({
        success:false,error: e.message
      });
    }
  }

module.exports = {
    create,
    authenticate
}
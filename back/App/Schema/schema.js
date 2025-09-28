const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
   name : {type : String , required : true},
   email : {type : String , required : true},
   password : {type : String , required : true},
   phone : {type : Number , required : true},
   address : {type : String , required : true},
})

const schema = new mongoose.Schema({
    id : {type : Number,required : true},
title : {type : String,required : true},
price : {type : Number,required : true},
description : {type : String,required : true},
category : {type : String,required : true},
image : {type : String,required : true},
rating: {
  rate: { type: Number, required: true },
  count: { type: Number, required: true }
}
})

const model = mongoose.model('product',schema)
const AuthenticationModel = mongoose.model('authentication',authenticationSchema)

module.exports = {model,AuthenticationModel};
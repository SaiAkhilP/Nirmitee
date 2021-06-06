var mongoose = require('mongoose'), Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role : {type : String}
 });

 const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role : {type : String}
 });

const ClothesSchema = new Schema({
    brand : {type:String, required : true},
    category : {type:String, required : true},
    size : {type:Number, required : true},
    img : {type : String},
    createdBy : {type : String}
})

mongoose.model('Clothes', ClothesSchema);
mongoose.model('User', UserSchema);
mongoose.model('Admin', AdminSchema);
const mongoose = require('mongoose');
const {v4:uuid} = require('uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {type: String, required: true, trim : true},
    password : {type: String, required: true,trim : true},
    nickname : {type: String, default : `user + ${uuid()}`},
    salt : {type: String, required: true,trim : true},
    phone : {type : String, required:true,trim : true},
    banner : {type : String, required: true,trim : true, default : "www.abc.com"},
    interest:[
        {type:Schema.Types.ObjectId, ref:"interest",required:true}
    ],
    rank : {type: Number, default:0 },
    age: {type: Number},
    created_at : {type: Date, default : Date.now()},
    updated_at : {type:Date,default : Date.now()},
    review : [
        {
            _id : {type:String, required : true},
            
        }
    ],
    SeeLater:[
        {
            _id: {type: String, required:true},
            kor_name : {type: String, required:true},
            eng_name : {type:String, required:true},
            poster: {type:String, required:true},
            country: {type:String, required:true},
            rank : {type:Number,required:true},
            ageLimit : {type:Number,required :true},
                
        }
    ],
    LikedMovies:[
        {
            _id: {type: String, required:true},
            kor_name : {type: String, required:true},
            eng_name : {type:String, required:true},
            poster: {type:String, required:true},
            country: {type:String, required:true},
            rank : {type:Number,required:true},
            ageLimit : {type:Number,required :true},
                
        }
    ],
    NotLikedMovies:[
        {
            _id: {type: String, required:true},
            kor_name : {type: String, required:true},
            eng_name : {type:String, required:true},
            poster: {type:String, required:true},
            country: {type:String, required:true},
            rank : {type:Number,required:true},
            ageLimit : {type:Number,required :true},
                
        }],
});

module.exports =  mongoose.model('user', UserSchema);
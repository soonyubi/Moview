const mongoose = require('mongoose');
const {v4:uuid} = require('uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {type: String, required: true, trim : true},
    password : {type: String, required: true,trim : true},
    nickname : {type: String, default : `user + ${uuid()}`},
    salt : {type: String, required: true,trim : true},
    phone : {type : String, required:true,trim : true},
    banner : {type : String, required: true,trim : true},
    interest:[
        {type:Schema.Types.ObjectId, ref:"interest",required:true}
    ],
    rank : {type: Number, default:0 },
    age: {type: Number},
    created_at : {type: Date, default : Date.now()},
    updated_at : {type:Date,default : Date.now()},
    LikedReviews:[
        {
            review: {
                
            }
        }
    ],
    NotLikedReviews:[
        {
            review: {
                
            }
        }
    ],
    LikedMovies:[
        {
            movie : {
                _id: {type: String, required:true},
                kor_name : {type: String, required:true},
                eng_name : {type:String, required:true},
                banner: {type:String, required:true},
                link : {type:String,required:true},
            }
        }
    ],
    NotLikedMovies:[
        {
            movie : {
                _id: {type: String, required:true},
                kor_name : {type: String, required:true},
                eng_name : {type:String, required:true},
                banner: {type:String, required:true},
                link : {type:String,required:true},
            }
        }],
});

module.exports =  mongoose.model('user', UserSchema);
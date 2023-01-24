const mongoose = require('mongoose');
const {v4:uuid} = require('uuid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {type: String, required: true, trim : true},
    password : {type: String, required: true,trim : true},
    nickname : {type: String, default : `user + ${uuid()}`},
    salt : {type: String, required: true,trim : true},
    phone : {type : String, required:true,trim : true},
    interest:[
        {type:Schema.Types.ObjectId, ref:"interest",required:true}
    ],
    rank : {type: Number },
    age: {type: Number},
    registered_at : {type: Date, default : Date.now()},
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
    LikedMovies:[],
    NotLikedMovies:[],
});
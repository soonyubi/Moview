const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    rank : {type: String,required:true},
    kor_name : {type:String, required: true, trim: true},
    eng_name : {type:String, required: true, trim: true},
    cur_score : {type:mongoose.Types.Decimal128, required: true},
    base_score : {type:mongoose.Types.Decimal128,required:true},
    user_score :{type:mongoose.Types.Decimal128,required:true},
    review_list : [
        {
            review: {
                _id : {type : String, required: true},
                user : {
                    _id : {type : String, required : true},
                    nickname : {type: String, required: true},
                    created_at : {type : String, required: true},
                    updated_at : {type : String, required: true},
                    banner : {type:String, required: true},
                },
                cnt_like : {type:Number, required: true},
                cnt_unlike : {type: Number, required: true},
            }
        }
    ],
    user_like_list : [
        {
            user :{
                _id : {type : String, required : true},
                nickname : {type: String, required: true},
            }
        }
    ],
    user_unlike_list :[
        {
            user :{
                _id : {type : String, required : true},
                nickname : {type: String, required: true},
            }
        }
    ],
    genre : [],
    releaseDate : {type: String, required: true},
    platform : [
        {
            data : {
                name : {type : String, required: true},
                redirectLink :{type : String, required: true},
                banner : {type : String, required: true},
            }
        }
    ],
    link : {type : String, required: true},
    runningTime : {type: Number, required:true},
    country: {type :String, required:true},
    description: {type: String, required: true},
    ageLimit : {type :String, required:true},
    main_actors:[
        {
            actor :{
                _id : {type : String, required:true},
                fake_name : {type:String},
                real_name : {type:String},
                img : {type : string},
            }

        }
    ],
    sub_actors:[
        {
            actor :{
                _id : {type : String, required:true},
                fake_name : {type:String},
                real_name : {type:String},
                img : {type : string},
            }

        }
    ],
    directors:[
        {
            actor :{
                _id : {type : String, required:true},
                real_name : {type:String},
                img : {type : string},
            }
        }
    ]

});
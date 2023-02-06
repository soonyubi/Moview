const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//change
const MovieSchema = new Schema({
    rank : {type: Number,required:true},
    kor_name : {type:String, required: true, trim: true},
    eng_name : {type:String, required: true, trim: true},
    cur_score : {type:mongoose.Types.Decimal128, required: true},
    base_score : {type:mongoose.Types.Decimal128,required:true},
    user_score :{type:mongoose.Types.Decimal128,required:true},
    genre : [{type:String}],
    releaseDate : {type: Date, required: true},
    platform : [{type:String}],
    poster : {type : String, required: true},
    runningTime : {type: Number, required:true},
    country: {type :String, required:true},
    description: {type: String, required: true},
    ageLimit : {type :Number, required:true},
    reviewCnt:{type:Number,required:true,default:0},
    actors:[
        {
            name : {type:String,required:true},
            role : {type:Number,required:true},
        }
    ],
});

module.exports = mongoose.model('movie.info',MovieSchema);
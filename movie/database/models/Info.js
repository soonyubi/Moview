const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    rank : {type: String,required:true},
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
    reviewCnt:{type:Number,required:true},
    actors:[
        {
            name : {type:String,required:true},
            role : {type:Number,required:true},
        }
    ],
});

module.exports = mongoose.model('movie.info',MovieSchema);
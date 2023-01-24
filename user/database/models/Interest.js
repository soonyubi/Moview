const mongoose = require('mongoose');
const {v4 : uuid} = require('uuid');

const Schema = mongoose.Schema;

 // interest = {platform, genre, country, 출시일, 연령제한, 시간}
const InterestSchema = new Schema({
    name : {type: String, default : `관심목록`},
    platform : [{type:String} ],
    genre:[{type:String}],
    country : [{type:String}],
    releaseDate : [
        {
            start: {type:String},
            end : {type:String}
        }
    ],
    ageLimit:{type:Number},
    time:{
        start : {type:String},
        end : {type:String}
    }


});

module.exports =  mongoose.model('interest', InterestSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user : {
        _id : {type:String},
        nickname : {type:String},
        banner :{type:String},
        rank : {type:Number}
    },
    movieId: {type:String, required:true},
    score : {type:mongoose.Types.Decimal128, required: true},
    description  :{type:String, required:true},
    cnt_likes : {type:Number, default:0, required:true},
    cnt_unlikes : {type:Number, default:0, required:true},
    registered_at : {type:Date, default :Date.now(),required:true},
    updated_at : {type:Date, default :Date.now(),required:true},
})

module.exports = mongoose.model('review',ReviewSchema);
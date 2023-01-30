const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name : {type:String, required: true},
    alias : [{type:String}],
    movieList : [{type:String}],
    img: {type:String,required:true}
})

module.exports = mongoose.model('movie.director',DirectorSchema);
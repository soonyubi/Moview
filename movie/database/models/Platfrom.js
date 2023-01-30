const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    name : {type:String, required: true},
    alias : [{type:String}],
    banner: {type:String,required:true}
})

module.exports = mongoose.model('movie.platform',PlatformSchema);
const mongoose = require('mongoose');
const {DB_URL} = require('../config');

module.exports = async()=>{
    try{
        await mongoose.connect(DB_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log("DB CONNECTED");
    }catch(err){
        console.log("DB CONNECTION ERROR");
        console.log(err);
        process.exit(1);
    }
};
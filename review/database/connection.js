const mongoose = require('mongoose'); 
const {DB_URI} = require('../config');
module.exports = async()=>{
    try{
        mongoose.connect(DB_URI,{
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


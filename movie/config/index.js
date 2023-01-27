const dotenv = require('dotenv');

if(process.env.NODE_ENV==="prod"){
    dotenv.config();
}
else{
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotenv.config({path:configFile});
}

module.exports = {
    APP_SECRET : process.env.APP_SECRET,
    DB_URI : process.env.MONGODB_URI,
    PORT : process.env.PORT
}
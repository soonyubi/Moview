const dotEnv  = require("dotenv");

if(process.env.NODE_ENV !== "prod"){
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path:configFile});
}else
{
    dotEnv.config();
}

module.exports = {
    PORT : process.env.NODE_ENV || 8001,
    DB_URL : process.env.MONGODB_URI || "mongodb://localhost:27017",
    APP_SECRET : process.env.APP_SECRET,
}
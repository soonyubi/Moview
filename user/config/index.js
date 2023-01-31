const dotEnv  = require("dotenv");

if(process.env.NODE_ENV !== "prod"){
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path:configFile});
}else
{
    dotEnv.config();
}

module.exports = {
    PORT : process.env.PORT || 8001,
    DB_URL : process.env.MONGODB_URI || "mongodb://localhost:27017",
    APP_SECRET : process.env.APP_SECRET,
    MESSAGE_BROKER_URL : process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME : "MOVIEW",
    REVIEW_BINDING_KEY : "REVIEW_SERVICE",
    MOVIE_BINDING_KEY : "MOVIE_SERVICE",
    QUEUE_NAME : "MOVIE_QUEUE"
}
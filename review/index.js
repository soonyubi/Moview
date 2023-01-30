const express = require('express');
const {PORT} = require('./config');
const {databaseConnection} = require('./database');
const expressApp = require('./express-app');

const StartServer = async ()=>{
    const app = express();

    await databaseConnection();

    await expressApp(app);
    console.log(PORT);
    app.listen(PORT, ()=>{
        console.log(`User Service listening on PORT : ${PORT}`);
    })
        .on('error',(err)=>{
            console.log(err);
            process.exit(1);
        });
}

StartServer();
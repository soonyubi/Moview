const express = require('express');
const cors  = require('cors');
const {review} = require('./api');
module.exports = async (app)=>{
    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    review(app);
}
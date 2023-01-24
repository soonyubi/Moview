const UserService = require('../application/user-service');
const UserAuth = require('./auth/auth');

module.exports = (app)=>{


    app.post('/signup',(req,res,next)=>{
        try {

        }
        catch (e) {

        }
    });

    app.post('/signIn',(req, res,next)=>{
        try {

        }
        catch (e) {

        }
    });

    app.get("/platforms",(req,res,next)=>{


    });

    app.get("likedReviews",(req,res,next)=>{

    });

    // interest = {platform, genre, country, 출시일, 연령제한, 시간}
    app.post('/interest',UserAuth,(req,res,next)=>{
        
        try {

        }
        catch (e) {

        }
    });

    app.get("/interest",UserAuth, (req,res,next)=>{
        try {

        }
        catch (e) {

        }
    });

    app.get("/profile",UserAuth,(req,res,next)=>{
        try {

        }
        catch (e) {

        }
    });

    app.get("/seelater",UserAuth,(req,res,next)=>{
        try {

        }
        catch (e) {

        }
    });
}
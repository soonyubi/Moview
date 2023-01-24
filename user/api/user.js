const UserService = require('../application/user-service');
const { AuthStatus } = require('../util');
const UserAuth = require('./auth/auth');

module.exports = (app)=>{

    const service = new UserService();

    app.post('/signup',async (req,res,next)=>{
        try {
            const {email, password, phone} = req.body;
            const data = await service.SignUp({email,password,phone});

            switch(data.status){
                case AuthStatus.SIGNUP_ALREADY_MATCHED_USER_EXIST:
                    return res.sendStatus(403).json({"status":"exist user"});
                    break;
                case AuthStatus.SIGNUP_INVALID_EMAIL:
                    return res.sendStatus(403).json({"status":"invalid email"});
                    break;
                case AuthStatus.SIGNUP_INVALID_PASSWORD:
                    return res.sendStatus(403).json({"status":"invalid password"});
                    break;
                default:
                    return res.sendStatus(200).json({"status":"ok"});
                    break;
            }
        }
        catch (e) {
            // some api error
        }
    });

    app.post('/signIn',async (req, res,next)=>{
        try {
            const {email, password} = req.body;
            const {data} = await service.SignIn({email,password});
            console.log(data);
            if(data===null){
                return res.json({"status":"user not found"});
            }
            else{
                return  res.json(data);
            }
        }
        catch (e) {
             // some api error
        }
    });

    app.get("/platforms",(req,res,next)=>{


    });

    app.get("likedReviews",(req,res,next)=>{

    });

    app.delete('/interest',UserAuth,(req,res,next)=>{
        
        try {

        }
        catch (e) {

        }
    });

    app.delete('/interest',UserAuth,(req,res,next)=>{
        
        try {

        }
        catch (e) {

        }
    });

    app.post('/interest',UserAuth,async (req,res,next)=>{
        
        try {
            const userId = req.user;
            const {name,platform, genre, country, releaseDate, ageLimit, time} = req.body;
            const {data} = await service.AddInterest({_id:userId, name,platform, genre, country, releaseDate, ageLimit, time});
            return res.json(data);
        }
        catch (e) {

        }
    });

    app.get("/interest",UserAuth, async(req,res,next)=>{
        try {
            const userId = req.user;
            const {data} = await service.GetInterest(userId);
            res.json(data);
        }
        catch (e) {

        }
    });

    app.put("/interest",UserAuth, (req,res,next)=>{
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
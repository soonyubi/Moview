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

   

    app.delete('/interest/:interestId',UserAuth,async (req,res,next)=>{
        
        const {_id} = req.user;
        try {
            
            const {status} = await service.InterestService(_id,req,'DELETE');
            // console.log(data);
            
            res.json(status);
        }
        catch (e) {

        }
    });
    app.post('/interest',UserAuth,async (req,res,next)=>{
        
        try {
            const {_id} = req.user;
            // const {_id,name,platform, genre, country, releaseDate, ageLimit, time} = req.body;
            const {status} = await service.InterestService(_id, req, 'CREATE');
            return res.json(status);
        }
        catch (e) {

        }
    });
    app.put('/interest',UserAuth,async (req,res,next)=>{
        
        try {
            const {_id} = req.user;
            // const {_id,name,platform, genre, country, releaseDate, ageLimit, time} = req.body;
            const {status} = await service.InterestService(_id, req, 'UPDATE');
            return res.json(status);
        }
        catch (e) {

        }
    });

    app.get("/interest",UserAuth, async(req,res,next)=>{
        try {
            const userId = req.user;
            const {status} = await service.InterestService(userId,req,'GETALL');
            res.json(status);
        }
        catch (e) {

        }
    });

    app.get("/interest/:interestId",UserAuth, async(req,res,next)=>{
        try {
            const userId = req.user;
            const {status} = await service.InterestService(userId,req,'GET');
            res.json(status);
        }
        catch (e) {

        }
    });

    
    app.get("/profile",UserAuth,async (req,res,next)=>{
        try {
            const user = req.user;
            const {data} = await service.GetProfile(user);
            return res.json(data);
        }
        catch (e) {

        }
    });

    app.put("/profile",UserAuth,async (req,res,next)=>{
        try {
            const {_id} = req.user;
            const {data} = await service.UpdateProfile(_id,req.body);
            return res.json(data); 
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
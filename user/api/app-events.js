const UserService = require('../application/user-service');

module.exports = (app)=>{
    const service = new UserService();

    app.use('/app-events',async(req,res,next)=>{
        
    });
}
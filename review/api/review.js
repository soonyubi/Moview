const ReviewService = require('../application/review-service');
const UserAuth = require('./auth/auth');

module.exports = (app)=>{

    const service =  new ReviewService();

    app.get('/',(req,res,next)=>{
        res.json({"hello":"review"});
    });

    app.get('/reviews',async (req,res,next)=>{
        const {data}= await service.ReadReview(req.body.movieId);
        return res.json(data);
    });

    app.put('/reviews',async (req,res,next)=>{
        const {userId,movieId,description} = req.body;
        const {data} = await service.UpdateReview(userId,movieId,description);
        return res.json(data);
    });


}
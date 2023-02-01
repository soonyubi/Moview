const ReviewService = require('../application/review-service');
const { REVIEW_BINDING_KEY ,USER_BINDING_KEY} = require('../config');
const { PublishMessage,SubscribeMessage } = require('../util');
const UserAuth = require('./auth/auth');

module.exports = (app,channel)=>{

    const service =  new ReviewService();
    SubscribeMessage(channel,service,USER_BINDING_KEY);
    
    app.get('/',(req,res,next)=>{
        res.json({"hello":"review"});
    });

    app.get('/reviews/:movieId',async (req,res,next)=>{
        const {data}= await service.ReadReview(req.params.movieId);
        return res.json(data);
    });

    app.put('/reviews',async (req,res,next)=>{
        const {userId,movieId,description} = req.body;
        const {data} = await service.UpdateReview(userId,movieId,description);
        return res.json(data);
    });

    app.post('/review',UserAuth,async(req,res,next)=>{

        const {_id} = req.user;
        const {data} = await service.CreateReview(null, req.body);
        
        const payload = service.GetPayload(_id, 'CREATE_REVIEW', data);
        
        PublishMessage(channel, REVIEW_BINDING_KEY,JSON.stringify(payload));
        
        return res.json(payload);
    });


}
const ReviewService = require('../application/review-service');
const { REVIEW_BINDING_KEY ,USER_BINDING_KEY} = require('../config');
const { PublishMessage,SubscribeMessage } = require('../util');
const { NotFoundError } = require('../util/errors/app-error');
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

    app.put('/reviews',UserAuth, async (req,res,next)=>{
        const {_id} = req.user;

        const {data} = await service.UpdateReview(_id,req.body);

        const payload = service.GetPayload(_id, 'UPDATE_REVIEW', data);
        PublishMessage(channel, REVIEW_BINDING_KEY,JSON.stringify(payload));
        return res.json(data);
    });

    app.post('/review',UserAuth,async(req,res,next)=>{

        const {_id} = req.user;
        const {movieId} = req.body;
        try{
            const {data} = await service.CreateReview(_id, req.body, movieId);
        
            const payload = service.GetPayload(_id, 'CREATE_REVIEW', data);
            
            PublishMessage(channel, REVIEW_BINDING_KEY,JSON.stringify(payload));
            
            return res.json(payload);
        }catch(err){
            next(err);
        }
    });

    app.delete('/review',UserAuth, async(req,res,next)=>{
        const {_id} = req.user;
        const {reviewId, movieId} = req.body;
        const deleteInfo = {
            reviewId : reviewId,
            userId : _id,
            movidId : movieId
        }
        
        try{
            const {data} = await service.DeleteReview(deleteInfo);
            if(data===null) throw NotFoundError("DATA NOT FOUND");
            const payload = service.GetPayload(_id, 'DELETE_REVIEW',data);
            const result = PublishMessage(channel, REVIEW_BINDING_KEY, JSON.stringify(payload));
            return res.json(result);
        }catch(err){
            next(err);
        }
        
    });

}
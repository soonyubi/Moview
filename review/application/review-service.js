const {ReviewRepository} = require('../database');
const {FormateData} = require('../util');
const { ValidationError, NotFoundError } = require('../util/errors/app-error');


class ReviewService{
    constructor(){
        this.repository = new ReviewRepository();
    }
    
    async ReadReview(movieId){
        try{
            const result = await this.repository.FindReviewByMovieId(movieId);
            return FormateData(result);
        }
        catch(err){
            throw new NotFoundError("DATA NOT FOUND");
        }
    }

    async CreateReview(userId,review,movieId){
        try{
            const validate = await this.repository.ValidateReviewUserAlreadyWritten(userId,movieId);
            if(!validate) throw new ValidationError("This user is already written");

            const result = await this.repository.InsertReview(review);
            return FormateData(result);
        }
        catch(err){
            throw err;
        }
    }

    async UpdateReview(userId,review){
        try{
            const {reviewId, movieId, description, score} = review;
            const validate = await this.repository.ValidateReview(userId,reviewId);
            if(!validate) throw new ValidationError("userId or movieId is not validate")
            const result = await this.repository.UpdateReview(userId,movieId,description,reviewId,score);
            console.log(result);
            return FormateData(result);
        }
        catch(err){
            throw err;
        }
    }

    async DeleteReview(deleteInfo){
        try{
            const {reviewId, userId, movieId} = deleteInfo;
            const validate = await this.repository.ValidateReview(reviewId);
            if(!validate) throw new ValidationError("userId or ReviewId is not validate");
            
            const result = await this.repository.DeleteReview({reviewId, userId, movieId});
            return FormateData(result);
        }
        catch(err){
            throw new ValidationError("userId or ReviewId is not validate");
        }
    }

    GetPayload(userId, event, data){
        const payload = {
            userId : userId,
            event : event,
            data : data
        }
        return payload;
    }

    async SubScribeEvents(payload)
    {
        payload = JSON.parse(payload);
        if(payload===null) return null;
        const {event, user, data} = payload;
        
        console.log("payload",payload);
        switch(event){
            case 'CREATE_REVIEW':
                const result = await this.repository.AddUserInfo(user,data);
                return result;
            case 'DELETE_REVIEW':
                return {"status":"success"};
    }
        
        

    }

}

module.exports = ReviewService;
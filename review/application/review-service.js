const {ReviewRepository} = require('../database');
const {FormateData} = require('../util');


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
            throw new error(err);
        }
    }

    async CreateReview(user,review){
        try{
            const result = await this.repository.InsertReview(user,review);
            return FormateData(result);
        }
        catch(err){
            throw new error(err);
        }
    }

    async UpdateReview(userId,movieId,description){
        try{
            const result = await this.repository.UpdateReview(userId,movieId,description);
            console.log(result);
            return FormateData(result);
        }
        catch(err){
            throw new error(err);
        }
    }

    async DeleteReview(userId,movieId){
        try{
            const result = await this.repository.DeleteReview(userId,movieId);
            return FormateData(result);
        }
        catch(err){
            throw new error(err);
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
        const {event, user, data} = payload;
        console.log("payload",payload);
        switch(event){
            case 'CREATE_REVIEW':
                const result = await this.repository.AddUserInfo(user,data);
                return result;
        }
        
        

    }

}

module.exports = ReviewService;
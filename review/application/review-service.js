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

    async CreateReview(review){
        try{
            const result = await this.repository.InsertReview(review);
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


}

module.exports = ReviewService;
const { NotFoundError, ValidationError } = require('../../util/errors/app-error');
const {ReviewModel} = require('../models');

class ReviewRepository{
    
    async FindReviewByMovieId(movieId){
        const result = await ReviewModel.find({movieId:movieId});
        return result;
    }

    async InsertReview(review){
        
        try{
            
            const new_review = new ReviewModel({
                
                movieId : review.movieId,
                score : review.score,
                description : review.description
            });
            
            const result = await new_review.save();
            
            return result;
        }catch(err){
                throw new APIError("DATABASE ACT UNPROPERLY");
        }
    }

    async UpdateReview(userId,movieId,description,reviewId,score){
        try{
            const result = await ReviewModel.findById(reviewId).populate("user");
            if(!result) throw NotFoundError("Update Review - Data not found by userId or reviewId");
            
            if(result.user._id.toString()===userId.toString())
            {
                
                result.description = description;
                result.score = score;
            }
            
            const data = await result.save();
            return data;
        }catch(err){
            throw err;
        }
    }

    async DeleteReview({reviewId, userId, movieId}){
        try {
            console.log(reviewId);
            const result = await ReviewModel.findOneAndDelete({_id:reviewId});
            console.log(result);
            return result;
        } catch (error) {
            throw NotFoundError("We cannot found from db using given data");
        }
    }

    async ValidateReview(userId, reviewId){
        try{
            const review = await ReviewModel.findById(reviewId);
            console.log("validateReview",review.user._id.toString());
            
            const validate = (review.user._id.toString() === userId.toString());
            console.log(validate)
            return validate;
        }catch(err){
            throw new ValidationError("userId or reviewId is not valid")
        }
    }

    async ValidateReviewUserAlreadyWritten(userId, movieId){
        const review = await ReviewModel.findOne({movieId:movieId}).populate("user");
        console.log(review);
        console.log(review.user);
        if(review.user._id.toString()===userId) return false; 
        return true;
    }

    async AddUserInfo(user,data){
        const {_id} = data;
        const result = await ReviewModel.findOneAndUpdate({_id:_id},{user:user},{new:true});
        return result;
    }
};


module.exports = ReviewRepository;
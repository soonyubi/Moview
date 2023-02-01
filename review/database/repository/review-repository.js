const {ReviewModel} = require('../models');

class ReviewRepository{
    
    async FindReviewByMovieId(movieId){
        const result = await ReviewModel.find({movieId:movieId});
        return result;
    }

    async InsertReview(user,review){
        
        const new_review = new ReviewModel({
            
            movieId : review.movieId,
            score : review.score,
            description : review.description
        });
        
        const result = await new_review.save();
        
        return result;
    }

    async UpdateReview(userId,movieId,description){
        const result = await ReviewModel.updateOne({"user._id":userId,movieId:movieId},{description:description});
        return result;
    }

    async DeleteReview(userId,movieId){
        const result = await ReviewModel.deleteOne({"user._id":userId,movieId:movieId});
        return result;
    }

    async AddUserInfo(user,data){
        const {_id} = data;
        const result = await ReviewModel.findOneAndUpdate({_id:_id},{user:user},{new:true});
        return result;
    }
};


module.exports = ReviewRepository;
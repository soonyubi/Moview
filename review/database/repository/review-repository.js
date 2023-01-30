const {ReviewModel} = require('../models');

class ReviewRepository{
    
    async FindReviewByMovieId(movieId){
        const result = await ReviewModel.find({movieId:movieId});
        return result;
    }

    async InsertReview(review){
        const result = await ReviewModel.insertMany(review);
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
};


module.exports = ReviewRepository;
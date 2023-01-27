const {MovieModel, ActorModel, DirectorModel} = require('../models');

class MovieRepository{
    
    async FindAllMovies(){
        const result = await MovieModel.find();
        return result;
    }

    async FindMovieById(movieId){
        const result = await MovieModel.findById(movieId);
        return result;
    }

    async FindMovieByCondition(condition){
        const result = await MovieModel.find({

        });
    }
};
const condition = {
    
}
MovieRepository.FindMovieByCondition()

module.exports = MovieRepository;
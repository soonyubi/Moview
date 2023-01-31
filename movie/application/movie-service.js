const {MovieRepository} = require('../database');
const {FormateData} = require('../util');

const SORTINFO = {
    "rank_asc":0,
    "rank_des":1,
    "review_asc":2,
    "review_des":3,
    "oldest":4,
    "newest":5,
    "name_asc":6,
    "name_desc":7
}

class MoiveService{
    constructor(){
        this.repository = new MovieRepository();
    }

    async GetMovies(sorting_option, condition){
        try{
            switch(sorting_option){
                case 'default':
                    const result = await this.repository.FindAllMovies_Short('rank',condition);
                    console.log(result);
                    return FormateData(result);
                case 'rank_desc':
                    const result2 = await this.repository.FindAllMovies_Short('-rank',condition);
                    return FormateData(result2);
                case 'review_asc':
                    const result3 = await this.repository.FindAllMovies_Short('reviewCnt',condition);
                    return FormateData(result3);
                case 'review_desc':
                    const result4 = await this.repository.FindAllMovies_Short('-reviewCnt',condition);
                    return FormateData(result4);
                case 'newest':
                    const result5 = await this.repository.FindAllMovies_Short('releaseDate',condition);
                    return FormateData(result5);
                case 'oldest':
                    const result6 = await this.repository.FindAllMovies_Short('-releaseDate',condition);
                    return FormateData(result6);
                case 'name_asc':
                    const result7 = await this.repository.FindAllMovies_Short('kor_name',condition);
                    return FormateData(result7);
                case 'name_desc':
                    const result8 = await this.repository.FindAllMovies_Short('-kor_name',condition);
                    return FormateData(result8);
                default:
                    const result9 = await this.repository.FindMovieByCondition(sort_option,condition);
                    return FormateData(result9);
            }
        }catch(err){
            throw new Error(err);
        }
        
    }

    async GetMovieInfo(movieId){
        try{
            const result = await this.repository.FindMovieById(movieId);
            return FormateData(result);
        }catch(err){
            throw new Error(err);
        }
    }

    GetPayload(userId,movie,event){
        const payload = {
            event : event,
            userId : userId,
            data : movie
        }
        return payload;
    }

    

    async GetMoviesByActor(actor){
        try{
            const result = await this.repository.FindMovieByActorName(actor);
            return FormateData(result);
        }catch(err){
            throw new Error(err);
        }
    }

    async GetMoviesByDirector(director){
        try{
            const result = await this.repository.FindMovieByDirectorName(director);
            return FormateData(result);
        }catch(err){
            throw new Error(err);
        }
    }




}

module.exports = MoiveService;
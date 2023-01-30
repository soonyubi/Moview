const {MovieModel, ActorModel, DirectorModel, PlatformModel} = require('../models');

class MovieRepository{
    
    /** ------------------- READ ----------------------- */


    async FindAllMovies_Short(option,condition){
        const result = await MovieModel.find(condition,{rank:1, kor_name:1,eng_name:1,country:1,poster:1,ageLimit:1}).sort(option);
        console.log(result);
        return result;
    }
    
    async FindAllMovies_Long(){
        const result = await MovieModel.find({});
        return result;
    }

    async FindMovieById(movieId){
        const result = await MovieModel.findById(movieId);
        return result;
    }
    
    async FindMovieByName(movieName){
        const result = await MovieModel.findById(movieId);
        return result;
    }


    // test required
    async FindMovieByActorName(actorName){
        // 배우 이름으로 조회해서 나온 영화 id 리스트에 포함된 영화들을 리턴 
        const temp = await ActorModel.find({$or:[{name:actorName},{alias:actorName}]});
        // console.log(temp);
        if(temp.length===0) return null;
        const movieList = temp[0].movieList;
        // console.log(movieList);
        if(movieList.length===0) return null;
        const result = await MovieModel.find({_id:movieList});
        // console.log(result);
        return result;
    }
    
    async FindMovieByActorId(actorId){
        const temp = await ActorModel.findById(actorId);
        const movieList = temp.movieList;
        const result = await MovieModel({_id:movieList});
        return result;
    }

    async FindMovieByDirectorName(directorName){
        // 배우 이름으로 조회해서 나온 영화 id 리스트에 포함된 영화들을 리턴 
        const temp = await DirectorModel.find({$or:[{name:directorName},{alias:directorName}]});
        console.log(temp);
        if(temp.length===0) return null;
        const movieList = temp[0].movieList;
        console.log(movieList);
        if(movieList.length===0) return null;
        const result = await MovieModel({_id:movieList});
        return result;
    }
    
    async FindMovieByDirectorId(directorId){
        const temp = await DirectorModel.findById(directorId);
        const movieList = temp.movieList;
        const result = await MovieModel({_id:movieList});
        return result;
    }

    async FindActorByMovieId(movieId){
        const result = await ActorModel.find({movieList:movieId});
    }

    async FindMovieByCondition(option,condition){
        // front에서 설정한 조건값을 기준으로 영화를 검색 
        // 또는 내 관심목록 조건값을 기준으로 
        // e.g. platform : ["netflix","appletv","tving"] -> $all : 
        const result = await MovieModel.find(condition).sort(option);
        return result;
    }

    async FindPlatformInfo(platform){
        const result = await PlatformModel.find({name:platform});
        return result;
    }

    /** ------------------- CREATE ----------------------- */
    async InsertMovie(movie){
        // 전처리된 movie 객체를 삽입 
        const result = await MovieModel.insertMany(movie);
        return result;
    }

    async InsertActor(actor,movieId){
        await ActorModel.count({name:actor.name},async (err,count)=>{
            if(err){
                console.log(err);
            }else if(count==0){
                const result = await ActorModel.insertMany({name:actor.name, movieList : [movieId], img:actor.img });
                return result;
            }
            else{
                const result = await ActorModel.updateOne({name:actor.name},{$push:{movieList:movieId}});
            }
        });
    }

    async InsertDirector(director,movieId){
        await DirectorModel.count({name:director.name},async (err,count)=>{
            if(err){
                console.log(err);
            }else if(count==0){
                const result = await DirectorModel.insertMany({name:director.name, movieList : [movieId], img:director.img });
                return result;
            }
            else{
                const result = await ActorModel.updateOne({name:director.name},{$push:{movieList:movieId}});
            }
        });
    }

    /** ------------------- UPDATE ----------------------- */
    async UpdateOneMovie(movieId,u){
        const result = await MovieModel.updateOne({_id:movieId},u);
        return result;
    }

    async UpdateManyMovie(condition,u){
        const result = await MovieModel.updateMany(condition,u);
        return result;
    }
    async UpdateActor(actorId,u){
        const result = await MovieModel.updateOne({_id:movieId},u);
        return result;
    }    
    /** ------------------- DELETE ----------------------- */
    
};


module.exports = MovieRepository;
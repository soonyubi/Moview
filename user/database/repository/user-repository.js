const {UserModel, InterestModel} = require("../models");
const {STATUS_CODES,APIError, ValidationError, NotFoundError} = require('../../util/errors/app-error');
const { FormateData } = require("../../util");

class UserRepository{

    async FindUser({email}){
        try{
            const result = await UserModel.findOne({email:email});
            return result;
        }
        catch(err){
            throw new APIError("database not working properly")
        }
    }

    async FindUserById(userId){
        try{
            
            const result = await UserModel.findOne({_id:userId});
            
            return result;
        }catch(err){
            throw new APIError("database not working properly")
        }
    }

    async UpdateUser(userId,userInfo){
        const {nickname, phone ,age  } = userInfo;
        const result = await UserModel.updateOne({_id:userId, nickname:nickname, phone :phone, age:age });
        const user = await UserModel.findOne({_id:userId});
        user.updated_at = Date.now();
        await user.save();
        if(result.modifiedCount==1) return user;
        return null;
    }

    async CreateUser({email,password,salt,phone}){
        try {
            const new_user = new UserModel({
                email,
                password,
                salt,
                phone
            });
            const result = await new_user.save();
            return result;
        }
        catch(err){
            throw new APIError("database not working properly")
        }
    }
    async DeleteReview(userId, reviewId){
        try{
            const ext_user = await UserModel.findById(userId).populate("review");
            
            if(!ext_user) {
                // console.log("no exist user")
                throw NotFoundError("USER NOT FOUND");
            }let review_list = ext_user.review;
            let isDelete = false;

            review_list.map(item=>{
                if(item._id.toString()===reviewId){
                    const index= review_list.indexOf(item);
                    review_list.splice(index,1);
                    isDelete = true;
                }
            });
            ext_user.review = review_list;
            const result = await ext_user.save();
            return result;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    async UpdateReview(userId, data){
        try{
            const ext_user = await UserModel.findById(userId);
            
            if(!ext_user) throw new NotFoundError("Update Review - user not found");

            const review_list = ext_user.review;
            review_list.map(item=>{
                if(item._id.toString()===data._id.toString()){
                    item.score = data.score;
                    item.description = data.description;
                }
            });
            ext_user.review = review_list;
            const result = await ext_user.save();
            
            return result;
        
        }catch(err){
            throw err;
        }
       
        
    }


    async FindInterest(userId,interestId){
        const data = await InterestModel.findById({_id:interestId});
        if(!data) throw ValidationError("interest id is not valid")
        return data;
    }
    async FindAllInterest(userId){
        try{
            const ext_user = await UserModel.findById(userId).populate("interest");
            if(!ext_user) throw ValidationError("interest id is not valid")
            return ext_user.interest;
        }catch(err){
            throw new APIError("database not working properly")
        }
    }
    async CreateInterest(userId, create_data){
        try {
            const {name,platform, genre, country, releaseDate, ageLimit, time} = create_data;
            const ext_user = await UserModel.findById(userId);
            if(!ext_user) throw new ValidationError("invalid user id");
            const result = await ext_user.populate("interest");
            const new_interest = new InterestModel({
                name,
                platform,
                genre,
                country,
                releaseDate,
                ageLimit,
                time
            });
            result.interest.push(new_interest);
            await result.save();
            console.log(result);
            return new_interest;    
        } catch (error) {
            throw new APIError("database not working properly")
        }
    }
    async UpdateInterest(userId,request_data){
        try{
            const {_id,name,platform, genre, country, releaseDate, ageLimit, time} = request_data;
            
            const ext_user = await UserModel.findById(userId);
            
            if(!ext_user)  return null;
            
            const result = await ext_user.populate("interest");

            const interestList = result.interest;
            let update_item = null;
            if(typeof _id==="undefined"){
                console.log("_id undefined");
                const new_interest = new InterestModel({
                    name,
                    platform,
                    genre,
                    country,
                    releaseDate,
                    ageLimit,
                    time
                });
                await new_interest.save();
                interestList.push(new_interest);
                update_item = new_interest;
            }else{
                update_item = await InterestModel.findOne({_id:_id});
                console.log('to update item :',update_item);
                if(!update_item) return null;
                update_item.name = name;
                update_item.platform = platform;
                update_item.genre = genre;
                update_item.country = country;
                update_item.releaseDate = releaseDate;
                update_item.ageLimit = ageLimit;
                update_item.time = time;

                await update_item.save();
            }
            

            
            result.interest= interestList;
            // console.log(update_item);
            await result.save();
            // console.log(result);
            return update_item;


        }catch(err){
            throw new APIError("database not working properly")
        }
    }
    async DeleteInterest(userId, interestId){

        try{
            console.log(userId);
            console.log(interestId);
            const cnt = await InterestModel.deleteOne({_id:interestId});
            // console.log(cnt);
            if(cnt.deletedCount==0) return null;
            const result = await UserModel.findById(userId).populate("interest");
            await result.save();
            return {cnt};
        }catch(err){
            throw new APIError("database not working properly")
        }
    }
    
    async UpdateLikes(userId, movie){
        try{
            const result = await UserModel.findOne({_id:userId});
            let LikedMovies = result.LikedMovies;
            if(LikedMovies.length>0){
                let isExist = false;
                LikedMovies.map(item=>{
                    if(item._id.toString()===movie._id.toString()){
                        const index = LikedMovies.indexOf(item);
                        LikedMovies.splice(index,1);
                        isExist= true;
                    }

                });

                if(!isExist){
                    LikedMovies.push(movie);
                }
            }else{
                LikedMovies.push(movie);
            }
            result.LikedMovies = LikedMovies;
            const Saved = await result.save();
            return Saved;
        }catch(err){
            throw new APIError("database not working properly")
        }
    }

    async UpdateUnlikes(userId,movie){
        try{
            const result = await UserModel.findOne({_id:userId});
            let NotLikedMovies = result.NotLikedMovies;
            if(NotLikedMovies.length>0){
                let isExist = false;
                NotLikedMovies.map(item=>{
                    if(item._id.toString()===movie._id.toString()){
                        const index = NotLikedMovies.indexOf(item);
                        NotLikedMovies.splice(index,1);
                        isExist= true;
                    }

                });

                if(!isExist){
                    NotLikedMovies.push(movie);
                }
            }else{
                NotLikedMovies.push(movie);
            }
            result.NotLikedMovies = NotLikedMovies;
            const Saved = await result.save();
            return Saved;
        }catch(err){
            throw new APIError("database not working properly")
        }
    }

    async UpdateSeeLater(userId, movie){
        try{
            const result = await UserModel.findOne({_id:userId});
            let SeeLater = result.SeeLater;
            if(SeeLater.length>0){
                let isExist = false;
                SeeLater.map(item=>{
                    if(item._id.toString()===movie._id.toString()){
                        const index = SeeLater.indexOf(item);
                        SeeLater.splice(index,1);
                        isExist= true;
                    }

                });

                if(!isExist){
                    SeeLater.push(movie);
                }
            }else{
                SeeLater.push(movie);
            }
            result.SeeLater = SeeLater;
            const Saved = await result.save();
            return Saved;
        }catch(err){
            throw new APIError("database not working properly")
        }
    }
}

module.exports = UserRepository;
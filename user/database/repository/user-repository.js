const {UserModel, InterestModel} = require("../models");
const {STATUS_CODES} = require('../../util/app-error');
const { FormateData } = require("../../util");

class UserRepository{

    async FindUser({email}){
        try{
            const result = await UserModel.findOne({email:email});
            return result;
        }
        catch(err){
            console.log(err);
        }
    }

    async FindUserById(userId){
        try{
            
            const result = await UserModel.findOne({_id:userId});
            console.log(result);
            return result;
        }catch(err){

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
            const result = new_user.save();
            return result;
        }
        catch(err){
            // API ERROR
            console.log(err);
        }
    }

    async FindInterest(userId,interestId){
        const data = await InterestModel.findById({_id:interestId});
        if(!data) return null;
        return data;
    }
    async FindAllInterest(userId){
        const ext_user = await UserModel.findById(userId);
        if(!ext_user) return null;
        const result = await ext_user.populate("interest");
        console.log(result);
        return result.interest;
    }
    async CreateInterest(userId, create_data){
        const {name,platform, genre, country, releaseDate, ageLimit, time} = create_data;
        const ext_user = await UserModel.findById(userId);
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
            console.log(result);
            return update_item;


        }catch(err){

        }
    }
    async DeleteInterest(userId, interestId){

        try{
            console.log(userId);
            console.log(interestId);
            const cnt = await InterestModel.deleteOne({_id:interestId});
            console.log(cnt);
            if(cnt.deletedCount==0) return null;
            const result = await UserModel.findById(userId).populate("interest");
            await result.save();
            return {cnt};
        }catch(err){

        }
    }

}

module.exports = UserRepository;
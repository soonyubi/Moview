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

    async FindInterestByUserid(id){
        try {
            const {interest} = await UserModel.findById(id).populate("interest");
            return FormateData(interest);
        } catch (error) {
            
        }
    }

    async CreateInterest({_id,name,platform, genre, country, releaseDate, ageLimit, time}){
        try{
            const profile= await UserModel.findById(_id);
            if(profile)
            { 
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
                profile.interest.push(new_interest);
     
            }
            return await profile.save();

        }catch(err){

        }
    }
}

module.exports = UserRepository;
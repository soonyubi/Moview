const {GenerateSalt, GenerateHashedPassword, GenerateSignature, FormateData, VaildatePassword, AuthStatus, CorrectPassword, CorrectEmail} = require('../util');
const {UserRepository} = require('../database');

class UserService{
    constructor() {
        this.repository = new UserRepository();
    }

    async SignUp(userInputs){
        const {email, password, phone} = userInputs;
        const isExist = await this.repository.FindUser({email});
        if(isExist) {
            return {"status":AuthStatus.SIGNUP_ALREADY_MATCHED_USER_EXIST};
        }
        if(!CorrectPassword(password)) return {"status":AuthStatus.SIGNUP_INVALID_PASSWORD};
        if(!CorrectEmail(email)) return {"status":AuthStatus.SIGNUP_INVALID_EMAIL};

        try{
            let salt = await GenerateSalt();
            let userPassword = await GenerateHashedPassword(password, salt);

            const new_user = await this.repository.CreateUser({email, password : userPassword, phone , salt});

            const token = await GenerateSignature({email:email, _id:new_user._id,});

            return FormateData({id:new_user._id, token});
        }
        catch (err){
            throw new APIError('Data not found',err);
        }
    }

    async SignIn(userInputs){
        const {email, password} = userInputs;
        try{
            const ext_user = await this.repository.FindUser({email});
            
            if(ext_user)
            {
                const isValid = await VaildatePassword(password, ext_user.password, ext_user.salt);
                if(isValid)
                {
                    
                    const token = await GenerateSignature({email:email, _id: ext_user._id});
                    return FormateData({id:ext_user._id, token});
                }
                
            }

            return FormateData({data:null});
        }catch (e) {
            throw new Error('Data Not Found',e);
        }
    }

    // async UpdatePlatform(userId, platformList)
    // {
    //     // platformList 를 초기화 하고 새롭게 추가 
    //     try{
    //         const subPlatforms = await this.repository.UpdatePlatform(userId,platformList);
    //         return FormateData(subPlatforms);

    //     }catch (e) {
    //         throw new Error('add platfom to list by userid is not working',e);
    //     }
    // }

    // async GetPlatform(userId){
    //     try{
    //         const subPlatforms = await this.repository.GetPlatform(userId);
    //         return FormateData(subPlatforms);
    //     }
    //     catch(e)
    //     {
    //         throw new Error('get platfom list by userid is not working',e);
    //     }
    // }

    /**
     * 
     * @param {*} userId 
     * @returns LikedReviews
     */
    async GetReview(userId,isLiked){
        // userId를 통해 좋아요한 리뷰 아이디를 조회 
        
        try{
            const Reviews= await this.repository.GetReviews(userId,isLiked);
            return FormateData(Reviews);
        }
        catch(e)
        {
            throw new Error('get Liked Review list by userid is not working',e);
        }
    }

    async UpdateReview(userId, reviewId,isLiked){
        // reviewID와 현재 유저가 가지고 있는 reviewId를 보고 
        // 존재한다면 삭제, 아니라면 삽입 
        try{
            const UpdatedLiviews = await this.repository.UpdateReviews(userId,reviewId,isLiked);
            return FormateData(UpdatedLiviews);
        }
        catch(e)
        {
            throw new Error('Update Review list by userid is not working',e);
        }
    }

    async GetProfile(user){
        // 유저 정보 전체를 조회
        try{
            const {_id} = user;
            const ext_user = await this.repository.FindUserById(_id);
            return FormateData(ext_user);
        }
        catch (err){
            throw new Error('No match User', err);
        }
    }

    async UpdateProfile(userId, userInfo){
        try{
            
            const data = this.repository.UpdateUser(userId,userInfo);
            return FormateData(data);
        }
        catch (err){
            throw new Error('No match User', err);
        }
    }

    async InterestService(userId, req, event_type)
    {

        switch(event_type){
            case 'GETALL':
                const all_interest = await this.repository.FindAllInterest(userId);
                if(all_interest!==null) return {"status":all_interest};
                return {"status":"FAIL"};
            case 'GET':
                const interest = await this.repository.FindInterest(userId,req.params.interestId);
                if(interest!==null) return {"status":interest};
                return {"status":"FAIL"};
            case 'CREATE':
                const create_data = req.body;
                const created_data = await this.repository.UpdateInterest(userId,create_data);
                if(created_data!=null) return {"status":created_data};
                return {"status":"FAIL"};
            case 'UPDATE':
                const update_data = req.body;
                const updated_data = await this.repository.UpdateInterest(userId,update_data);
                if(updated_data!=null) return {"status":"SUCCESS"};
                return {"status":"FAIL"};
                break;
            case 'DELETE':
                const deleted_data = await this.repository.DeleteInterest(userId,req.params.interestId);
                if(deleted_data!=null) return {"status":"SUCCESS"};
                return {"status":"FAIL"};
                break;
            default:

        }
        return {"status":"INVALID_EVENT_TYPE"};
    }

    
    async GetSeeLater(userId){
        try{
            const SeeLater = this.repository.GetSeeLater(userId);
            return FormateData(SeeLater);
        }catch(e){
            throw new Error('get See Later list by userid is not working',e);
        }
    }

    async UpdateSeeLater(userId, movieId){
        try{
            const SeeLater = this.repository.UpdateSeeLater(userId,movieId);
            return FormateData(SeeLater);
        }catch(e){
            throw new Error('Update See Later  by userid is not working',e);
        }
    }

    async ManageMovie(){

    }

    async ManageReview(){
        
    }



    async SubScribeEvents(payload){
        payload = JSON.parse(payload);
        const {event , data} = payload;

        
        switch(event)
        {
            case 'UPDATE_PLATFORM':
                this.UpdatePlatform(userId, platformList);
        }
    }
}

module.exports = UserService;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');

module.exports.AuthStatus = 
{
    SIGNUP_ALREADY_MATCHED_USER_EXIST:0,
    SIGNUP_INVALID_PASSWORD:1,
    SIGNUP_INVALID_EMAIL:2,
    SIGNUP_OK:50,

    SIGNUP_NOMATCH_USER:100,
    SIGNUP_WRONG_PASSWORD:101,
    SIGNUP_OK:150
}

module.exports.GenerateSalt = async ()=>{
    return bcrypt.genSalt();
}

module.exports.GenerateHashedPassword = async (password, salt)=>{
    return bcrypt.hash(password, salt);
}

module.exports.GenerateSignature = async (payload)=>{
    return await jwt.sign(payload,APP_SECRET,{expiresIn:'1d'});
};

module.exports.VaildatePassword = async (cur, ext, salt)=>{

    cur = await this.GenerateHashedPassword(cur,salt);
    return cur===ext;
}

module.exports.ValidateSignature = async(req)=>{
    const signature = req.get('Authorization');
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1],APP_SECRET);
        req.user = payload;
        return true;
    }
    return false;
}

module.exports.CorrectPassword = (password)=>{
    // password가 몇자 이상이고 몇자 이하인지 ?? 
    // 올바르다면 return true
    // 틀리다면 return false;
    return true;
}

module.exports.CorrectEmail = (email)=>{
    // email가 몇자 이상이고 몇자 이하인지 ?? 
    // 올바르다면 return true
    // 틀리다면 return false;
    return true;
}

module.exports.FormateData = (data)=>{
    if(data) return {data};
    throw new Error('Data not found');
}
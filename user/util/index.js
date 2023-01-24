const bcrypt = require('bcrypt');

module.exports.GenerateSalt = async ()=>{
    return bcrypt.genSalt();
}

module.exports.GenerateHashedPassword = async (password, salt)=>{
    return bcrypt.hash(password, salt);
}

module.exports.GenerateSignature = async (payload)=>{

};

module.exports.VaildatePassword = async (cur, ext, salt)=>{
    return await this.GenerateHashedPassword(ext,salt)===cur;
}

module.exports.FormateData = (data)=>{
    if(data) return {data};
    throw new Error('Data not found');
}
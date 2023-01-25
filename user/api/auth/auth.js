const {ValidateSignature} = require('../../util');

module.exports = async (req,res,next)=>{
    const isAuthorized = await ValidateSignature(req);
    // console.log(isAuthorized)
    if(isAuthorized) return next();
    return res.status
};
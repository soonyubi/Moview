const {ValidateSignature} = require('../../util');

module.exports = async (req,res,next)=>{
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized) return next();
    return res.status
};
const {ValidateSignature} = require('../../util');
const { AuthorizeError } = require('../../util/errors/app-error');

module.exports = async (req,res,next)=>{
    try {
        const isAuthorized = await ValidateSignature(req);
        // console.log(isAuthorized)
        if(isAuthorized) return next();
        throw new AuthorizeError("not autorised to access resource");
    } catch (error) {
        next(error);
    }
    
};
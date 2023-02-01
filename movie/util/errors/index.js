const Sentry = require("@sentry/node");
const _ = require("@sentry/tracing");
const {NotFoundError, ValidationError, AuthorizeError} = require('./app-error');
Sentry.init({
    dsn: "https://507e163934864bcebedf7d46f9163958@o4504604623044608.ingest.sentry.io/4504605051781120",
    tracesSampleRate: 1.0,
});


module.exports = (app)=>{ 
    // catch all error and report to logger
    app.use((error, req,res,next)=>{
        let reportError = true;

        // skip common / known errors
        [NotFoundError, ValidationError,AuthorizeError].forEach((typeofError)=>{
            if(error instanceof typeofError){
                reportError = false;
            }
        });
    
        if(reportError){
            Sentry.captureException(error);
        }
    

        const statusCode = error.statusCode || 500;
        const data = error.data || error.message;
        return res.status(statusCode).json(data);
    });
}
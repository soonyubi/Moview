const Sentry = require("@sentry/node");

const _ = require("@sentry/tracing");
const { NotFoundError, ValidationError, AuthorizeError } = require("./app-error");

Sentry.init({
    dsn: "https://bce141898ec1404d9dc738b2d7928d2c@o4504604623044608.ingest.sentry.io/4504605072228352",
    tracesSampleRate: 1.0,
});

module.exports = (app)=>{ 
    // catch all error and report to logger
    app.use((error, req,res,next)=>{
        let reportError = true;
        console.log(typeof error);
        // skip common / known errors
        [NotFoundError, ValidationError,AuthorizeError].forEach((typeofError)=>{
            console.log(error instanceof typeofError);
            if(error instanceof typeofError){
                console.log(typeof typeofError);
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
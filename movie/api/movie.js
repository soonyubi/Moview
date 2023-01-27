

module.exports = (app)=>{
    app.get('/',(req,res,next)=>{
        return res.json({"hello":"world"});
    });
}
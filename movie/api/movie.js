const MovieService = require('../application/movie-service');
const UserAuth = require('./auth/auth');

module.exports = (app)=>{

    const service=  new MovieService();

    app.get('/',(req,res,next)=>{
        return res.json({"hello":"world"});
    });

    app.get('/movies/:sorting_option', async (req,res,next)=>{
        const {data} = await service.GetMovies(req.params.sorting_option, req.body);
        return res.json(data);
    });

    app.get('/movies/byActor/:actorName',async(req,res,next)=>{
        const {data} = await service.GetMoviesByActor(req.params.actorName);
        return res.json(data);

    });

    app.get('/movies/byDirector/:directorName',async(req,res,next)=>{
        const {data} = await service.GetMoviesByDirector(req.params.directorName);
        return res.json(data);
    })

    /* USER */
    app.post('/movies/see-later',UserAuth,async(req,res,next)=>{

    });

    app.post('/movies/like',UserAuth,async(req,res,next)=>{

    });

    app.post('/movies/unlike',UserAuth,async(req,res,next)=>{

    });

    /* REVIEW */


}
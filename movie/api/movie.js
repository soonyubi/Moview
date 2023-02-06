const MovieService = require('../application/movie-service');
const { MOVIE_BINDING_KEY, REVIEW_BINDING_KEY } = require('../config');
const { PublishMessage } = require('../util');
const UserAuth = require('./auth/auth');

module.exports = (app, channel)=>{

    const service=  new MovieService();

    app.get('/',(req,res,next)=>{
        return res.json({"hello":"world"});
    });

    app.get('/movies/:sorting_option', async (req,res,next)=>{
        const {data} = await service.GetMovies(req.params.sorting_option, req.body);
        return res.json(data);
    });

    app.post('/movies',UserAuth, async(req,res,next)=>{
        // add some code
        const {data} = await service.CreateMovie(req.body);
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
        const {_id} = req.user;
        const {movieId} = req.body;
        try{
            const {data} = await service.GetMovieInfo(movieId);
            PublishMessage(channel, MOVIE_BINDING_KEY, JSON.stringify(data) );
            return res.status(200).json(data);
        }catch(err){
            next(err);
        }
    });

    app.post('/movies/like',UserAuth,async(req,res,next)=>{
        const {_id} = req.user;
        const {movieId} = req.body;
        try{
            const {data} = await service.GetMovieInfo(movieId);
            const payload = service.GetPayload(_id,data,'LIKE_MOVIE');
            PublishMessage(channel, MOVIE_BINDING_KEY,  JSON.stringify(payload) );
            return res.status(200).json(data);
        }catch(err){
            next(err);
        }
    });

    app.post('/movies/unlike',UserAuth,async(req,res,next)=>{
        const {_id} = req.user;
        const {movieId} = req.body;
        try{
            const {data} = await service.GetMovieInfo(movieId);
            const payload = service.GetPayload(_id,data,'UNLIKE_MOVIE');
            PublishMessage(channel, MOVIE_BINDING_KEY, JSON.stringify(payload));
            return res.status(200).json(data);
        }catch(err){
            next(err);
        }
    });

    app.post('/movies/seeLater',UserAuth,async(req,res,next)=>{
        const {_id} = req.user;
        const {movieId} = req.body;
        try{
            const {data} = await service.GetMovieInfo(movieId);
            const payload = service.GetPayload(_id,data,'SEE_LATER');
            PublishMessage(channel, MOVIE_BINDING_KEY,  JSON.stringify(payload) );
            return res.status(200).json(data);
        }catch(err){
            next(err);
        }
    });

    
    /* REVIEW */


}
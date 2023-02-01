const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET,MESSAGE_BROKER_URL ,EXCHANGE_NAME,REVIEW_BINDING_KEY,MOVIE_BINDING_KEY,REVIEW_QUEUE,MOVIE_QUEUE, USER_BINDING_KEY} = require('../config');
const amqplib = require('amqplib');

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
    else return {data:null};
    throw new Error('Data not found');
}

/* MESSAGE BROKER */

module.exports.CreateChannel = async()=>{
    try{
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct',false);
        return channel;
    }catch(err){
        throw new Error(err);
    }
}

module.exports.PublishMessage = async(channel, binding_key, message)=>{
    try{
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
        console.log("MESSAGE HAS BEEN SENT FROM MOVIE SERVICE : "+ message);
    }catch(err){
        throw new Error(err);
    }
};

module.exports.SubscribeMovieMessage = async(channel, service, binding_key)=>{
    const appQueue = await channel.assertQueue(MOVIE_QUEUE);

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    
    channel.consume(appQueue.queue, data=>{
            console.log("received data from queue");
            console.log(data.content.toString());
            
            service.SubScribeEvents(data.content.toString(),'MOVIE');
            channel.ack(data);
    });
};

module.exports.SubscribeReviewMessage = async(channel, service, binding_key)=>{
    const appQueue = await channel.assertQueue(REVIEW_QUEUE);

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    
    channel.consume(appQueue.queue,async data=> {
            console.log("received data from queue");
            console.log(data.content.toString());
            
            let payload = await service.SubScribeEvents(data.content.toString(),'REVIEW');
            console.log('payload : : :: :' ,payload);
            this.PublishMessage(channel,USER_BINDING_KEY,JSON.stringify(payload));
            channel.ack(data);
    });
    
    


};
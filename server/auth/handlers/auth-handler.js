'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var redisClient = require('redis-connection')();

module.exports.register = {
    auth: false,
    validate: {
      payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(2).max(200).required(),
          passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
      }
    },
    handler: function(request, reply) {
        redisClient.get(request.payload.email, function (err, redisResp) {
          if(!redisResp) { // error when if not already registered, register the person:
            bcrypt.genSalt(12, function(err, salt) {
              bcrypt.hash(request.payload.password, salt, function(err, hash) {
                request.payload.password = hash; // save the password's hash
                redisClient.set(request.payload.email, JSON.stringify(request.payload));
                return reply('Success')
              }); // end bcrypt.hash
            }); // end bcrypt.genSalt
          }
          else {
            return reply(Boom.badRequest('Already Registered'));
          }
      });
    }
};

module.exports.login = {
    auth: false,
    handler: function(request, reply){
      redisClient.get(request.payload.username, function(err, res) { // GENERIC DB request. insert your own here!
         if(!res) {
           return reply('fail').code(400); // don't leak info about user existence
         }
        let data = JSON.parse(res);
         bcrypt.compare(request.payload.password, data.password, function (err, isValid) {
             if(!err && isValid) {
               request.cookieAuth.set(data);
               return reply({}); // or what ever you want to rply
             } else {
               return reply().code(400);
             }
         }); // END Bcrypt.compare which checks the password is correct
       }); // END db.get which checks if the person is in our database
     }
}
module.exports.logout = {
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply('Logout Successful!');
    }
}

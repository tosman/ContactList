"use strict";

const Joi = require('joi');
const redisClient = require('redis-connection')();

const data = [{
    id: 1,
    name: 'Han Solo',
    staffType: 'Aweomse',
    photo: 'http://screenrant.com/wp-content/uploads/young-han-solo-star-wars-movie-casting.jpg'
}, {
    id: 2,
    name: 'Luke Skywalker',
    staffType: 'test',
    photo: 'http://spinoff.comicbookresources.com/wp-content/uploads/2016/03/luke-skywalker.jpg'
}, {
    id: 3,
    name: 'Chewbacca',
    staffType: 'Doctor',
    photo: 'http://static.trustedreviews.com/94/000036c5a/e74f/chewbacca.jpeg'
}];

module.exports.getContacts = {
    handler: function(request, reply) {
        const email = request.auth.credentials.email;

        redisClient.get('contacts', function(err, resp){
            var contacts = resp ? JSON.parse(resp) : {};

            return reply(contacts[email] || []);
        });
    }
};

module.exports.addContact = {
    handler: function(request, reply){
      let email = request.auth.credentials.email;
      let contact = request.payload;

      redisClient.get('contacts', function(err, resp){
          var contacts = resp ? JSON.parse(resp) : {};
          //TODO: add babel for this:
          //contacts[email] = [...contacts[email], request.payload.contact];
          redisClient.incr('contact', function(err, contactId){

          contact.id = contactId;
            if(contacts[email]){
              contacts[email].push(contact);
            } else {
              contacts[email] = [contact];
            }
            redisClient.set('contacts', JSON.stringify(contacts));

            reply(contactId);
          });

      });
    },
    validate: {
      payload: {
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        phoneNumber: Joi.string().required()
      }
    }
}
module.exports.getContact = {
    handler: function(request, reply) {

        reply(200);
    }
}

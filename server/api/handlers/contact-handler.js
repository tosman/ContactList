"use strict";

const Joi = require('joi');
const redisClient = require('redis-connection')();
const Boom = require('boom');
const Inert = require('inert');
const _ = require('lodash');

const imageFolder = "contactImages";
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
            contacts = contacts[email] || [];

            _.forEach(contacts, (contact)=>{
              contact.image = getContactImageFullUrl(contact.id);
            })
            return reply(contacts);
        });
    }
};

function getContactImageFullUrl(id){
  return "/api/contact/" + getContactImageUrl(id);
}

function getImageName(id){
  return "contact" + id + ".jpeg";
}

function getContactImageUrl(id){
  return "contactImages/" + getImageName(id);
}

module.exports.getImage = {
  handler: function(request, reply){
     reply.file(getContactImageUrl(request.params.contactId));
  }
}


module.exports.addContact = {
    handler: function(request, reply){
      let email = request.auth.credentials.email;
      let contact = request.payload;

      redisClient.get('contacts', function(err, resp){
          var contacts = resp ? JSON.parse(resp) : {};
          //TODO: add babel for this:
          //contacts[email] = [...contacts[email], request.payload.contact];
          redisClient.incr('contact', function(err, contactId){

            require("fs").writeFile(getContactImageUrl(contactId), contact.image, 'base64', function(err) {
              if(err){
                Boom.reply('test');
              }

              contact.id = contactId;
              contact.image = getImageName(contactId);
              if(contacts[email]){
                contacts[email].push(contact);
              } else {
                contacts[email] = [contact];
              }
              redisClient.set('contacts', JSON.stringify(contacts));

              reply(contactId);
            });

          });

      });
    },
    validate: {
      payload: {
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        image: Joi.string()
      }
    }
}
module.exports.getContact = {
    handler: function(request, reply) {

        reply(200);
    }
}

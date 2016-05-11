'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    port: 3000
});

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


server.route({
    method: 'GET',
    path: '/contacts',
    handler: function(request, reply) {
      reply(data);
    }
});

server.route({
    method: 'GET',
    path: '/contact/{id}',
    handler: function(request, reply) {
        var detail = {
            id: 1,
            name: 'Han Solo',
            staffType: 'Aweomse',
            photo: 'http://screenrant.com/wp-content/uploads/young-han-solo-star-wars-movie-casting.jpg',
            address: '1200 N Hartford St',
            phoneNumber: '7035979822'
        }
        reply(detail);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports = server;

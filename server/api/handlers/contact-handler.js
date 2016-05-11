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
  handler: function (request, reply) {
    return reply(data);
  }
};

module.exports.getContact = {
  handler: function (request, reply) {
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
}

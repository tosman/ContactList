const Contacts = require('./handlers/contact-handler');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/contacts', config: Contacts.getContacts },
    { method: 'GET', path: '/contact', config: Contacts.getContact },
    { method: 'POST', path: '/contacts', config: Contacts.addContact }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

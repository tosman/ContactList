const Auth = require('./handlers/auth-handler');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'POST', path: '/register', config: Auth.register },
    { method: 'POST', path: '/login', config: Auth.login },
    { method: 'POST', path: '/logout', config: Auth.logout }
  ]);

  next();
};

exports.register.attributes = {
  name: 'auth'
};

'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const manifest = require('./config/manifest.json');

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }

  server.auth.strategy('base', 'cookie', {
    password: 'noideawhattoputherebutneedstobeatleast32characterslong', // cookie secret
    cookie: 'app-cookie', // Cookie name
    ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
  });

  server.auth.default({
    strategy: 'base'
  });

  server.start(() => {
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
  });
});

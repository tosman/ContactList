// const Code = require('code');
// const Lab = require('lab');
//
// const Glue = require('glue');
// const manifest = require('../config/manifest.json');
//
//
// const lab = exports.lab = Lab.script();
//
// // Tests
// Glue.compose(manifest, {
//     relativeTo: process.cwd()
// }, (err, server) => {
//     server.start(() => {});
//
//     lab.describe("when getContacting all contacts", () => {
//         lab.it("should return a 200 and three contacts", () => {
//           var options = {
//               method: "GET",
//               url: "/contacts"
//           };
//           server.inject(options, response => {
//               Code.expect(response.statusCode).to.equal(200); //  Expect http response status code to be 200 ("Ok")
//               Code.expect(response.result).to.have.length(3); // Expect result to be "Hello Timmy!" (12 chars long)
//               done(); // done() callback is required to end the it.
//           });
//         });
//     });
// });


// Load modules

const Code = require('code');
const Lab = require('lab');

const Glue = require('glue');
const manifest = require('../config/manifest.json');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

// Tests
Glue.compose(manifest, { relativeTo: process.cwd() }, (err, server) => {
  server.start(() => { });

  describe("Routes", () => {
    it('Contact list', done => {
      var options = {
        method : 'GET',
        url : '/api/contacts'
      };
      server.inject(options, response => {
        Code.expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});

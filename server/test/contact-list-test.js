var Lab = require("lab");           // load Lab module
var lab = exports.lab = Lab.script(); //export test script
var Code = require("code");      //assertion library
var server = require("../server.js"); // our index.js from above

lab.experiment("Basic HTTP Tests", function() {
    // tests`
    lab.test("GET all contacts", function(done) {
        var options = {
            method: "GET",
            url: "/contacts"
        };
        // server.inject lets you similate an http request
        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result).to.have.length(3); // Expect result to be "Hello Timmy!" (12 chars long)
            server.stop(done);  // done() callback is required to end the test.
        });
    });

    lab.test("GET one contact", function(done) {
        var options = {
            method: "GET",
            url: "/contact/3"
        };
        // server.inject lets you similate an http request
        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result.id === 3).to.be.true(); // Expect result to be "Hello Timmy!" (12 chars long)
            server.stop(done);  // done() callback is required to end the test.
        });
    });
});

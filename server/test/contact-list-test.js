const Code = require('code');
const Lab = require('lab');

const Glue = require('glue');
const manifest = require('../config/manifest.json');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

Glue.compose(manifest, {
        relativeTo: process.cwd()
    },
    (err, server) => {

        server.start(() => {});

        describe("when getting contacts", () => {
            var options = {
                method: 'GET',
                url: '/api/contacts'
            };

            it('it should return all contacts', done => {
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(200);
                    done();
                });
            });
        });

        describe("when adding a contact", () => {
            it("should validate that the contact object is required", done => {
                var options = {
                    method: 'POST',
                    url: '/api/contacts'
                };
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it('should validate that the email is required', done => {
                var options = {
                    method: 'POST',
                    url: '/api/contacts',
                    payload: {
                        contact: {
                            name: 'test',
                            phoneNumber: '7035979822'
                        }
                    }
                }
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it('should validate that the name is required', done => {
                var options = {
                    method: 'POST',
                    url: '/api/contacts',
                    payload: {
                        contact: {
                            email: 'tarekosman@gmail.com',
                            phoneNumber: '7035979822'
                        }
                    }
                }
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it('should validate that the phone number is required', done => {
                var options = {
                    method: 'POST',
                    url: '/api/contacts',
                    payload: {
                        contact: {
                            email: 'tarekosman@gmail.com',
                            name: 'test'
                        }
                    }
                }
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(400);
                    done();
                });
            });

            it('should return 200 if succeeded', done => {
                var options = {
                    method: 'POST',
                    url: '/api/contacts',
                    payload: {
                        contact: {
                            email: 'tarekosman@gmail.com',
                            name: 'test',
                            phoneNumber: '7021111111'
                        }
                    }
                }
                server.inject(options, response => {
                    Code.expect(response.statusCode).to.equal(200);
                    done();
                });
            });
        });
    });

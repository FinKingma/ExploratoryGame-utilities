var should = require("should");
var supertest = require('supertest');
var express = require('express');


describe('mapmaker', function() {
    describe('The map generator api', function () {
        var server = supertest.agent("http://localhost:3000");

        it('should generate a map in json', function (done) {
            server
                .get('/api/mapmaker')
                .set('features',3)
                .set('bugs',3)
                .expect("Content-type",/json/)
                .expect(200)
                .end(function(err,res){
                    res.status.should.equal(200);
                    done();
                });
        });
        it('should give an appropriate response when incorrect headers are provided', function (done) {
            server
                .get('/api/mapmaker')
                .expect(418)
                .end(function(err,res){
                    res.status.should.equal(418);
                    done();
                });
        });
        it('should give an appropriate response when map cannot be generated', function (done) {
            server
                .get('/api/mapmaker')
                .set('features',3)
                .set('bugs',100)
                .end(function(err,res){
                    res.status.should.equal(418);
                    done();
                });
        });
    });
});
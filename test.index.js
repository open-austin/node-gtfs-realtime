var fs = require('fs');
var expect = require('expect');

var loadGTFSRealtimeFeed = require('./index').loadGTFSRealtimeFeed;
var decode = require('./index').decode;
var serialize = require('./index').serialize;

describe('loadGTFSRealtimeFeed', function() {

    it('loads the capmetro vehicle feed', function() {

        var buffer = fs.readFileSync('./fixtures/vehicle-positions.pb');
        decode(buffer);
        console.log('asdf');
    })

});

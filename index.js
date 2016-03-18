var path = require('path');
var ProtoBuf = require('protobufjs');
var request = require('request');
var Promise = require('es6-promise').Promise;


function decode(feedBuffer) {
    var builder = ProtoBuf.loadProtoFile('gtfs-realtime.proto');
    var transit = builder.build('transit_realtime');
    var result = transit.FeedMessage.decode(feedBuffer);
    return result;
}

function serialize() {}

function loadGTFSRealtimeFeed(options) {
    return new Promise(function(resolve, reject) {
        request(options, function(err, res, body) {
            if (err) {
                console.error(err, body);
                return reject(err);
            }
            if (res.statusCode !== 200) {
                console.error(body);
                return reject(body);
            }
            return resolve(body);
        });
    });
}

function handler(event, context) {
    var url = event.url;
    console.log('URL: ', url);
    var options = {
        url: url,
        method: 'get',
        encoding: null,  // null = Buffer
    };

    loadGTFSRealtimeFeed(options)
        .then(function(feedBuffer) {
            var result = serialize(decode(feedBuffer));
            context.succeed(result);
        })
        .catch(function(err) {
            return context.fail({error_message: err})
        })

}

exports.handler = handler;

exports.decode = decode;
exports.serialize = serialize;
exports.loadGTFSRealtimeFeed = loadGTFSRealtimeFeed;

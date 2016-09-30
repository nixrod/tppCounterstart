/**
 * Created by Michael on 24.02.2015.
 */
console.log("running app");

var irc = require('twitch-irc');
var dateTime = require('./dateTime');
var logging = require('./logging');
var timeout = require('./timeout');

var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost/test';
mongoose.connect(dbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('opened db connection');
});

// Calling a new client..
var client = new irc.client({
  options: {
    debug: true,
    debugIgnore: ['ping', 'chat', 'action'],
    logging: false,
    tc: 3
  },
  identity: {
    username: '<USERNAME>',
    password: '<PASSWORD>'
  },
  //channels: ['twitchplayspokemon']
  channels: ['nixrod']
});

// Connect the client to server..
client.connect();

var nextTimeoutStop = new Date();

client.addListener('chat', function (channel, user, message) {
  // Check if someone gave the start command
  if (message.substring(0, 5).toLowerCase() == "start") {

    dateTime.getTime(function (err, data) {
      if (err) throw err;
      console.log("[" + data + "]" + "START DETECTED BY " + user.username + " saying:'" + message + "'");
    });

    // check if last timeout period has passed
    var now = new Date();
    if (nextTimeoutStop > now) {
      var timeDiff = Math.abs(nextTimeoutStop.getTime() - now.getTime());
      timeDiff = Math.ceil(timeDiff / (1000));
      console.log('Chilling in timeout for ' + timeDiff + ' more seconds.');
      return;
    }

    // determine if to press b or start in various ways
    if (Math.random() > 0.35) {
      // Say B
      if (Math.random() > 0.5) {
        client.say(channel, 'B');
      } else {
        client.say(channel, 'b');
      }
    } else {
      if (Math.random() > 0.7) {
        client.say(channel, 'Start');
      } else {
        // ignore this message
        //client.say(channel, 'start');
        console.log('Sent no response');
      }
    }

    // determine time until next Message can be sent by the bot
    timeout.getNewTimeout(function(err, data) {
      if (err) throw err;
      nextTimeoutStop = data;
    })
  }

  // check if Bot has been mentioned
  if(message.toLowerCase().indexOf('counterstart') >= 0) {
    // I have been mentioned
    dateTime.getTime(function (err, data) {
      if (err) throw err;
      console.log("[" + data + "]" + user.username + " MENTIONED ME, saying:'" + message + "'");

      logging.addLogEntry(mongoose, user.username, message, function (err) {
        if (err) throw err;
      })
    });
  }
});

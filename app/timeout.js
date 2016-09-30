/**
 * Created by Michael on 26.02.2015.
 */

var messageCounter = 0;

exports.getNewTimeout = function(callback) {
  messageCounter++;
  console.log('Message Counter is now: ' + messageCounter);
  if (messageCounter > 2) {
    if (Math.random() > 0.5) {
      // reset Message Counter, return Timeout between 1 and 3 Minutes
      messageCounter = 0;
      var date = new Date();
      var minutesToAdd = Math.floor(Math.random() * (3 - 1) + 1);
      console.log('Added a timeout of ' + minutesToAdd + ' minute(s)');
      date = new Date(date.getTime() + minutesToAdd * 60000);
      return callback(null, date);
    }
  }
  return callback(null, new Date());
};
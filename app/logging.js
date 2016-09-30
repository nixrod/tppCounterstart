/**
 * Created by Michael on 26.02.2015.
 */
var entrySchema = require('./schema/logEntry');

exports.addLogEntry = function(mongoose, user, message, callback) {

  var log = mongoose.model('log', entrySchema());

  var entry = new log({ message: message,
                        author: user});

  entry.save(function (err) {
    if (err) return callback(err);
  });
  return callback(null);
};
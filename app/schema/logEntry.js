/**
 * Created by Michael on 01.03.2015.
 */
module.exports = function () {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  return new Schema({
    message: String,
    author: String,
    date: {type: Date, default: Date.now}
  });
};
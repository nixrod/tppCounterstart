/**
 * Created by Michael on 26.02.2015.
 */
exports.getTime = function(callback) {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var time = hour + ":" + min + ":" + sec;

  return callback(null, time);
};
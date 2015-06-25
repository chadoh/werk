/**
 * User API
 */
'use strict';
var DEBUG = false;
var _name = 'SessionApi.js';
var SessionResponseActions = require('../actions/SessionResponseActions');
var AppConfig = require('../config.js');
var request = require('request');

module.exports = {

  url: AppConfig.apiUrl + '/signin',

  signIn: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':signIn --- ');
    }
    request.post(this.url, {form: data}, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('parsedBody: ' + parsedBody);
      }
      if ((new String(res.statusCode)).match(/2../)) SessionResponseActions.signIn(parsedBody);
      else SessionResponseActions.setError(parsedBody.error);
    });
  }
};

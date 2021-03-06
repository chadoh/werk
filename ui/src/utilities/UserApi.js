/**
 * User API
 */
'use strict';
var DEBUG = false;
var _name = 'UserApi.js';
var UserResponseActions = require('../actions/UserResponseActions');
var AppConfig = require('../config.js');
var request = require('request');
var SessionStore = require('../stores/SessionStore');

function auth() {
  return {
    user: SessionStore.getSession().email,
    pass: SessionStore.getSession().password
  }
}

module.exports = {

  url: AppConfig.apiUrl + '/users',

  list: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':list --- ');
    }
    request({
      method: 'GET',
      uri: this.url,
      auth: auth()
    }, function(err, res, body) {
      var data = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('data: ' + data);
      }
      UserResponseActions.list(data);
    });
  },

  create: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':create --- ');
    }
    request.post(this.url, {form: { user: data }}, function(err, res, body) {
      var parsedBody = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('parsedBody: ' + parsedBody);
      }
      if ((new String(res.statusCode)).match(/2../)) UserResponseActions.create(parsedBody);
      else {
        UserResponseActions.edit(data)
        UserResponseActions.setError(parsedBody.error);
      }
    });
  },

  update: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':update --- ');
    }
    var url = this.url + '/' + data.id;
    request({
      method: 'PATCH',
      uri: url,
      form: { user: data },
      auth: auth()
    },
    function(err, res, body) {
      var data = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('data: ' + data);
      }
      UserResponseActions.update(data);
    });
  },


  destroy: function(id) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':destroy --- ');
    }
    request({
      method: 'DELETE',
      uri: this.url,
      auth: auth()
    },
    function(err, res, body) {
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
      }
      UserResponseActions.destroy(id);
    });
  }

};

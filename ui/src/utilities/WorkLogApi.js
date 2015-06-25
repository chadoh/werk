/**
 * WorkLog API
 */
'use strict';
var DEBUG = false;
var _name = 'WorkLogApi.js';
var WorkLogResponseActions = require('../actions/WorkLogResponseActions');
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

  url: AppConfig.apiUrl + '/work_logs',

  list: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':list --- ');
    }
    request.get(this.url, {auth: auth()}, function(err, res, body) {
      var data = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('data: ' + data);
      }
      WorkLogResponseActions.list(data);
    });
  },

  create: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':create --- ');
    }
    request({
      method: 'POST',
      uri: this.url,
      auth: auth(),
      form: { work_log: data }
    },
    function(err, res, body) {
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
      }
      WorkLogResponseActions.create(JSON.parse(body));
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
      auth: auth(),
      form: { work_log: data }
    },
    function(err, res, body) {
      var data = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('data: ' + data);
      }
      WorkLogResponseActions.update(data);
    });
  },


  destroy: function(id) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':destroy --- ');
    }
    request({
      method: 'DELETE',
      uri: this.url + '/' + id,
      auth: auth()
    },
    function(err, res, body) {
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
      }
      WorkLogResponseActions.destroy(id);
    });
  }

};

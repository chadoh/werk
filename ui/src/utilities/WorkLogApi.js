/**
 * WorkLog API
 */
'use strict';
var DEBUG = false;
var _name = 'WorkLogApi.js';
var WorkLogResponseActions = require('../actions/WorkLogResponseActions');
var AppConfig = require('../config.js');
var request = require('request');

module.exports = {

  url: AppConfig.apiUrl + '/work_logs',

  list: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':list --- ');
    }
    request.get(this.url, function(err, res, body) {
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
    data = { work_log: {
      work_date: data.workDate,
      total_time: data.totalTime,
      notes: data.notes
    }}
    request.post(this.url, {form: data}, function(err, res, body) {
      var data = JSON.parse(body);
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
        console.log('data: ' + data);
      }
      WorkLogResponseActions.create(data);
    });
  },

  destroy: function(id) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':destroy --- ');
    }
    request.del(this.url + '/' + id, function(err, res, body) {
      if (DEBUG) {
        console.log('err: ' + err);
        console.log('res: ' + res);
        console.log('body: ' + body);
      }
      WorkLogResponseActions.destroy(id);
    });
  }

};

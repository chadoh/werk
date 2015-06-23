/**
 * WorkLog Store
 */
'use strict';

/**
 * Libraries
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Constants = require('../constants/ActionTypes');

/**
 * Variables
 */
var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'WorkLogStore';

var _workLogs = [];

/**
 * Store Start
 */
var WorkLogStore = assign({}, EventEmitter.prototype, {

  // Emit Change event
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getAllWorkLogs: function() {
    return _workLogs;
  },

  setWorkLogs: function(data) {
    _workLogs = data;
    return _workLogs;
  },

  addWorkLog: function(data) {
    _workLogs.push(data);
    return _workLogs[_workLogs.length - 1];
  },

  rmWorkLog: function(id) {
    return _workLogs = _workLogs.filter(function(log) {
      return log.id !== id
    });
  }

});

/**
 * Integrated with Dispatcher
 */
AppDispatcher.register(function(payload) {

  var action = payload.actionType;

  if (DEBUG) {
    console.log('[*] ' + _name + ':Dispatch-Begin --- ' + action);
    console.log('     Payload:');
    console.log(payload);
  }

  // Route Logic
  switch (action) {

    case Constants.WORK_LOG_LIST_RESPONSE:
      WorkLogStore.setWorkLogs(payload.data);
      break;

    case Constants.WORK_LOG_CREATE_RESPONSE:
      WorkLogStore.addWorkLog(payload.data);
      break;

    case Constants.WORK_LOG_DESTROY_RESPONSE:
      WorkLogStore.rmWorkLog(payload.id);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NOT MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  WorkLogStore.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = WorkLogStore;

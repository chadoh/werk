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
var _blankWorkLog = { id: '', work_date: '', total_time: '', notes: '' }
var _editWorkLog = _blankWorkLog;
var recentFirst = true;

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
    return _workLogs.sort(function(a,b) {
      if (recentFirst)
        return new Date(b.work_date) - new Date(a.work_date);
      else
        return new Date(a.work_date) - new Date(b.work_date);
    });
  },

  getEditWorkLog: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':getEditWorkLog ---');
      console.table([_editWorkLog]);
    }
    return _editWorkLog;
  },

  setWorkLogs: function(data) {
    _workLogs = data;
    return _workLogs;
  },

  addWorkLog: function(data) {
    _workLogs.push(data);
    return _workLogs[_workLogs.length - 1];
  },

  edit: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':editWorkLog ---');
      console.log('data:');
      console.log(data);
      console.log('_editWorkLog:');
      console.log([_editWorkLog]);
    }
    return _editWorkLog = data;
  },

  cancelEdit: function() {
    return _editWorkLog = _blankWorkLog;
  },

  updateWorkLog: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':updateWorkLog ---');
      console.log('data:');
      console.log(data);
      console.log('_editWorkLog:');
      console.log([_editWorkLog]);
    }
    var updated = _workLogs.filter(function(log) { return log.id === data.id })[0];
    for (var key in data) {
      updated[key] = data[key];
    }
    _editWorkLog = _blankWorkLog;
  },

  rmWorkLog: function(id) {
    return _workLogs = _workLogs.filter(function(log) {
      return log.id !== id
    });
  },

  reverseSort: function() {
    return recentFirst = !recentFirst;
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
    console.log('     _editWorklog:');
    console.table([_editWorkLog]);
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

    case Constants.WORK_LOG_EDIT:
      WorkLogStore.edit(payload.data);
      break;

    case Constants.WORK_LOG_CANCEL_EDIT:
      WorkLogStore.cancelEdit();
      break;

    case Constants.WORK_LOG_UPDATE_RESPONSE:
      WorkLogStore.updateWorkLog(payload.data);
      break;

    case Constants.REVERSE_SORT:
      WorkLogStore.reverseSort();
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NO MATCH');
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

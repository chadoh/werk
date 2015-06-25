/**
 * User Store
 */
'use strict';

/**
 * Libraries
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var Constants = require('../constants/ActionTypes');
var RouteActions = require('../actions/RouteActions');
var SessionStore = require('./SessionStore');

/**
 * Variables
 */
var CHANGE_EVENT = 'change';
var DEBUG = false;
var _name = 'UserStore';

var _users = [];
var _blankUser = { id: '', email: '', is_admin: false }
var _editUser = _blankUser;
var _error = null;

/**
 * Store Start
 */
var UserStore = assign({}, EventEmitter.prototype, {

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

  getAllUsers: function() {
    return _users
  },

  getEditUser: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':getEditUser ---');
      console.table([_editUser]);
    }
    return _editUser;
  },

  getError: function() {
    return _error;
  },

  setUsers: function(data) {
    _users = data;
    return _users;
  },

  addUser: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':addUser ---');
      console.log('data:');
      console.log(data);
    }
    _users.push(data);
    return _users[_users.length - 1];
  },

  edit: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':editUser ---');
      console.log('data:');
      console.log(data);
      console.log('_editUser:');
      console.log([_editUser]);
    }
    _error = '';
    return _editUser = data;
  },

  setError: function(message) {
    return _error = message;
  },

  cancelEdit: function() {
    _error = '';
    return _editUser = _blankUser;
  },

  updateUser: function(data) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':updateUser ---');
      console.log('data:');
      console.log(data);
      console.log('_editUser:');
      console.log([_editUser]);
    }
    var updated = _users.filter(function(log) { return log.id === data.id })[0];
    if (!updated) return;
    for (var key in data) {
      updated[key] = data[key];
    }
    _editUser = _blankUser;
  },

  rmUser: function(id) {
    return _users = _users.filter(function(log) {
      return log.id !== id
    });
  },

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
    console.log('     _editUser:');
    console.table([_editUser]);
  }

  // Route Logic
  switch (action) {

    case Constants.USER_LIST_RESPONSE:
      UserStore.setUsers(payload.data);
      break;

    case Constants.USER_CREATE_RESPONSE:
      UserStore.addUser(payload.data);
      if (window.location.href.match(/signup/)) {
        SessionStore.setSession(payload.data);
        setTimeout(RouteActions.setRoute, 500, '/');
      }
      break;

    case Constants.USER_DESTROY_RESPONSE:
      UserStore.rmUser(payload.id);
      break;

    case Constants.USER_EDIT:
      UserStore.edit(payload.data);
      break;

    case Constants.USER_CANCEL_EDIT:
      UserStore.cancelEdit();
      break;

    case Constants.USER_ERROR:
      UserStore.setError(payload.message);
      break;

    case Constants.USER_UPDATE_RESPONSE:
      UserStore.updateUser(payload.data);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NO MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  UserStore.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = UserStore;

/**
 * Session Store
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
var _name = 'SessionStore';
var _emptySession = { email: '', password: '' };
var _error = null;

function writeCookie(name,value,days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  }else{
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var i, c, ca, nameEQ = name + "=";
  ca = document.cookie.split(';');
  for(i=0;i < ca.length;i++) {
    c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return '';
}

function loadSessionFromCookie() {
  if (readCookie('werkSession')) return JSON.parse(readCookie('werkSession'));
  else return _emptySession;
}

function putSessionInCookie(data) {
  writeCookie('werkSession', JSON.stringify(data));
}

/**
 * Store Start
 */
var SessionStore = assign({}, EventEmitter.prototype, {

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

  getSession: function() {
    return loadSessionFromCookie()
  },

  setSession: function(data) {
    this.setError(null);
    var _session = this.getSession(), newSession = {};
    for (var key in _session) newSession[key] = _session[key];
    for (var key in data) newSession[key] = data[key];
    putSessionInCookie(newSession);
  },

  getError: function() {
    return _error;
  },

  setError: function(message) {
    return _error = message;
  },

  signOut: function() {
    putSessionInCookie(_emptySession);
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
  }

  // Route Logic
  switch (action) {

    case Constants.SIGN_IN_REQUEST:
      SessionStore.setError(null);
      break;

    case Constants.SIGN_IN_RESPONSE:
      SessionStore.setSession(payload.data);
      break;

    case Constants.USER_UPDATE_RESPONSE:
      if (SessionStore.getSession().id === payload.data.id) SessionStore.setSession(payload.data);
      break;

    case Constants.SIGN_OUT:
      SessionStore.signOut();
      break;

    case Constants.SESSION_ERROR:
      SessionStore.setError(payload.message);
      break;

    default:
      if (DEBUG) {
        console.log('[x] ' + _name + ':actionType --- NO MATCH');
      }
      return true;
  }

  // If action was responded to, emit change event
  SessionStore.emitChange();

  if (DEBUG) {
    console.log('[*] ' + _name + ':emitChange ---');
  }

  return true;
});

module.exports = SessionStore;

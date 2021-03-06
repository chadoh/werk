/**
 * Action Type
 */

'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

  // Route action types
  SET_CURRENT_ROUTE: null,

  // All ToDo Actions
  TODO_ADD_REQUEST: null,
  TODO_TOGGLE_COMPLETE_REQUEST: null,
  TODO_REQUEST_DATA: null,
  TODO_ADD: null,
  TODO_TOGGLE_COMPLETE: null,
  TODO_RECEIVE_DATA: null,

  // WorkLog Actions
  WORK_LOG_LIST_REQUEST: null,
  WORK_LOG_CREATE_REQUEST: null,
  WORK_LOG_UPDATE_REQUEST: null,
  WORK_LOG_DESTROY_REQUEST: null,

  WORK_LOG_LIST_RESPONSE: null,
  WORK_LOG_CREATE_RESPONSE: null,
  WORK_LOG_UPDATE_RESPONSE: null,
  WORK_LOG_DESTROY_RESPONSE: null,

  WORK_LOG_CANCEL_EDIT: null,
  WORK_LOG_EDIT: null,
  REVERSE_SORT: null,

  // User Actions
  USER_LIST_REQUEST: null,
  USER_CREATE_REQUEST: null,
  USER_UPDATE_REQUEST: null,
  USER_DESTROY_REQUEST: null,

  USER_LIST_RESPONSE: null,
  USER_CREATE_RESPONSE: null,
  USER_UPDATE_RESPONSE: null,
  USER_DESTROY_RESPONSE: null,

  USER_CANCEL_EDIT: null,
  USER_EDIT: null,
  USER_ERROR: null,

  // Session Actions
  SIGN_IN_REQUEST: null,
  SIGN_IN_RESPONSE: null,
  SIGN_OUT: null,
  SESSION_ERROR: null,

});

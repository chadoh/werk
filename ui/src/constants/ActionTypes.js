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
  WORK_LOG_DESTROY_REQUEST: null,

  WORK_LOG_LIST_RESPONSE: null,
  WORK_LOG_CREATE_RESPONSE: null,
  WORK_LOG_DESTROY_RESPONSE: null,

  REVERSE_SORT: null,

});

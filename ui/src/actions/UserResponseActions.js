/**
 * User Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');

module.exports = {
  list: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_LIST_RESPONSE,
      data: data
    });
  },
  create: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_CREATE_RESPONSE,
      data: data
    });
  },
  update: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_UPDATE_RESPONSE,
      data: data
    });
  },
  destroy: function(id) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_DESTROY_RESPONSE,
      id: id
    });
  },

  edit: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_EDIT,
      data: data
    });
  },
  cancelEdit: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_CANCEL_EDIT
    });
  },
  setError: function(message) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_ERROR,
      message: message
    });
  }
};

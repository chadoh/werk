/**
 * Session Response Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');

module.exports = {
  signIn: function(data) {
    AppDispatcher.handleSessionAction({
      actionType: ActionConstants.SIGN_IN_RESPONSE,
      data: data
    });
  },
  setError: function(message) {
    AppDispatcher.handleSessionAction({
      actionType: ActionConstants.SESSION_ERROR,
      message: message
    });
  }
};

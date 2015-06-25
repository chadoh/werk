/**
 * Session Request Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');
var SessionApi = require('../utilities/SessionApi');

module.exports = {
  signIn: function(data) {
    AppDispatcher.handleSessionAction({
      actionType: ActionConstants.SIGN_IN_REQUEST,
      data: data
    });
    SessionApi.signIn(data);
  },
  signOut: function() {
    AppDispatcher.handleSessionAction({
      actionType: ActionConstants.SIGN_OUT
    });
  }
};

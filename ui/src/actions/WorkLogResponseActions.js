/**
 * ToDo Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');

module.exports = {
  list: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_LIST_RESPONSE,
      data: data
    });
  },
  create: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_CREATE_RESPONSE,
      data: data
    });
  },
  update: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_UPDATE_RESPONSE,
      data: data
    });
  },
  destroy: function(id) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_DESTROY_RESPONSE,
      id: id
    });
  }
};

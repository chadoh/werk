/**
 * ToDo Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');
var WorkLogApi = require('../utilities/WorkLogApi');

module.exports = {
  create: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_CREATE_REQUEST,
      data: data
    });
    WorkLogApi.create(data);
  },
  update: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_UPDATE_REQUEST,
      data: data
    });
    WorkLogApi.update(data);
  },
  save: function(data) {
    if (data.id) this.update(data);
    else this.create(data);
  },
  fetchWorkLogs: function() {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_LIST_REQUEST
    });
    WorkLogApi.list();
  },
  destroy: function(id) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_DESTROY_REQUEST,
      id: id
    });
    WorkLogApi.destroy(id);
  },

  edit: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_EDIT,
      data: data
    });
  },
  cancelEdit: function(data) {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_CANCEL_EDIT
    });
  },
  reverseSort: function() {
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.REVERSE_SORT
    });
  }
};

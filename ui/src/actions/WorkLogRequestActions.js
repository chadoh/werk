/**
 * ToDo Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');
var WorkLogApi = require('../utilities/WorkLogApi');
var SessionStore = require('../stores/SessionStore');

module.exports = {
  list: function() {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_LIST_REQUEST
    });
    WorkLogApi.list();
  },
  create: function(data) {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_CREATE_REQUEST,
      data: data
    });
    WorkLogApi.create(data);
  },
  update: function(data) {
    if (!SessionStore.getSession().email) return;
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
  destroy: function(id) {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_DESTROY_REQUEST,
      id: id
    });
    WorkLogApi.destroy(id);
  },

  edit: function(data) {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_EDIT,
      data: data
    });
  },
  cancelEdit: function(data) {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.WORK_LOG_CANCEL_EDIT
    });
  },
  reverseSort: function() {
    if (!SessionStore.getSession().email) return;
    AppDispatcher.handleWorkLogAction({
      actionType: ActionConstants.REVERSE_SORT
    });
  }
};

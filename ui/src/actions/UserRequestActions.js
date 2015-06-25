/**
 * User Actions
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionTypes');
var UserApi = require('../utilities/UserApi');

module.exports = {
  create: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_CREATE_REQUEST,
      data: data
    });
    UserApi.create(data);
  },
  update: function(data) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_UPDATE_REQUEST,
      data: data
    });
    UserApi.update(data);
  },
  save: function(data) {
    if (data.id) this.update(data);
    else this.create(data);
  },
  fetchUsers: function() {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_LIST_REQUEST
    });
    UserApi.list();
  },
  destroy: function(id) {
    AppDispatcher.handleUserAction({
      actionType: ActionConstants.USER_DESTROY_REQUEST,
      id: id
    });
    UserApi.destroy(id);
  }
};

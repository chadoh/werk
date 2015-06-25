/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'UserElement.jsx';
var React = require('react');
var UserRequestActions = require('../actions/UserRequestActions');
var UserResponseActions = require('../actions/UserResponseActions');

var UserElement = React.createClass({
  displayName: _name,

  _edit: function() {
    UserResponseActions.edit(this.props.data);
  },

  _cancelEdit: function() {
    UserResponseActions.cancelEdit();
  },

  _destroy: function() {
    UserRequestActions.destroy(this.props.data.id);
  },

  render() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':render ---');
      console.log(this.props);
    }
    var actions;
    if (!this.props.underEdit) {
      actions = <div>
        <button onClick={this._edit} className="btn btn-link"><i className="fa fa-pencil" /></button>
        <button onClick={this._destroy} className="btn btn-link"><i className="fa fa-trash" /></button>
      </div>
    } else {
      actions = <div>
        <button onClick={this._cancelEdit} className="btn btn-link"><i className="fa fa-ban" /></button>
        <button disabled className="btn btn-link"><i className="fa fa-arrow-up" /></button>
      </div>
    }
    return (
      <tr>
        <td className={this.props.underEdit ? "text-muted" : ""}>{this.props.data.email}</td>
        <td className={this.props.underEdit ? "text-muted" : ""}>{this.props.data.preferred_hours_per_day}</td>
        <td className={this.props.underEdit ? "text-muted" : ""}>{this.props.data.is_admin && <i className="fa fa-check" />}</td>
        <td>
          {actions}
        </td>
      </tr>
    )
  }

});

module.exports = UserElement;

/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'WorkLogElement.jsx';
var React = require('react');
var WorkLogRequestActions = require('../actions/WorkLogRequestActions');

var WorkLogElement = React.createClass({
  displayName: _name,

  _edit: function() {
    WorkLogRequestActions.edit(this.props.data);
  },

  _cancelEdit: function() {
    WorkLogRequestActions.cancelEdit();
  },

  _destroy: function() {
    WorkLogRequestActions.destroy(this.props.data.id);
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
      <div>
        <td className={this.props.underEdit ? "text-muted" : ""}>{this.props.data.total_time}</td>
        <td className={this.props.underEdit ? "text-muted" : ""}>{this.props.data.notes}</td>
        <td>
          {actions}
        </td>
      </div>
    )
  }

});

module.exports = WorkLogElement;

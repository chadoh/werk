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

  destroy: function() {
    WorkLogRequestActions.destroy(this.props.data.id);
  },

  render() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':render ---');
      console.log(this.props);
    }
    return (
      <tr>
        <td>{this.props.data.work_date}</td>
        <td>{this.props.data.total_time}</td>
        <td>{this.props.data.notes}</td>
        <td><button onClick={this.destroy} className="btn btn-link"><i className="fa fa-trash" /></button></td>
      </tr>
    )
  }

});

module.exports = WorkLogElement;

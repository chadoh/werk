/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'WorkLogGroup.jsx';
var React = require('react');
var WorkLogRequestActions = require('../actions/WorkLogRequestActions');
var WorkLogElement = React.createFactory(require('../components/WorkLogElement'));

var WorkLogGroup = React.createClass({
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
    var first = this.props.workLogs[0],
        theRest = this.props.workLogs.slice(1);
    return (
      <tbody>
        <tr>
          <td rowSpan={this.props.workLogs.length}>{this.props.date}</td>
          <WorkLogElement data={first} key={first.id} underEdit={first.id === this.props.editWorkLog.id} />
        </tr>
        {theRest.map(function(element) {
          return (
            <tr key={element.id}>
              <WorkLogElement data={element} underEdit={element.id === this.props.editWorkLog.id} />
            </tr>
          )
        }, this)}
      </tbody>
    )
  }

});

module.exports = WorkLogGroup;

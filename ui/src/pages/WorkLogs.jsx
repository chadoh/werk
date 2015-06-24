/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'WorkLogs.jsx';
var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var WorkLogRequestActions = require('../actions/WorkLogRequestActions');
var WorkLogStore = require('../stores/WorkLogStore');
var WorkLogElement = React.createFactory(require('../components/WorkLogElement'));
var WorkLogForm = React.createFactory(require('../components/WorkLogForm'));

function getWorkLogState() {
  return {
    workLogs: WorkLogStore.getAllWorkLogs(),
    editWorkLog: WorkLogStore.getEditWorkLog()
  }
}

var WorkLogs = React.createClass({
  /**
   * Initialization
   */
  displayName: _name,

  getInitialState: function() {
    return getWorkLogState();
  },

  getDefaultProps: function() {
    return {
      layout: DefaultLayout
    };
  },

  /**
   * Render
   */
  render: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':render ---');
      console.log('      workLogs:')
      console.table(this.state.workLogs);
      console.log('      editWorkLog:');
      console.table([this.state.editWorkLog]);
    }
    return (
      <div>
        <h1>Work Logs</h1>
        <hr/>
        <WorkLogForm workLog={this.state.editWorkLog} />
        <table className="table">
          <thead>
            <tr>
              <th><a href="#" onClick={this._reverseSort}>When</a></th>
              <th>Hours</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.workLogs.map(function(element, index) {
              return (<WorkLogElement data={element} key={element.id} underEdit={element.id === this.state.editWorkLog.id} />);
            }, this)}
          </tbody>
        </table>
      </div>
    );
  },

  /**
   * Internal Methods
   */
  _change: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':_change ---');
      console.log('state: ');
      console.log(getWorkLogState());
    }
    this.setState(getWorkLogState());
  },

  _reverseSort: function(e) {
    e.preventDefault();
    WorkLogRequestActions.reverseSort();
  },

  /**
   * Life-cycle Methods
   */
  componentWillMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillMount ---');
    }
    WorkLogStore.addChangeListener(this._change);
    WorkLogRequestActions.fetchWorkLogs();
  },
  componentDidMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentDidMount ---');
      console.log(' States:');
      console.log(this.state);
      console.log(' Props:');
      console.log(this.props);
    }
  },
  componentWillUnmount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillUnmount ---');
    }
    WorkLogStore.removeChangeListener(this._change);
  }
});

module.exports = WorkLogs;

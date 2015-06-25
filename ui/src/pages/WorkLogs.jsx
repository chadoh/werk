/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'WorkLogs.jsx';
var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var SessionStore = require('../stores/SessionStore');
var WorkLogStore = require('../stores/WorkLogStore');
var WorkLogRequestActions = require('../actions/WorkLogRequestActions');
var WorkLogElement = React.createFactory(require('../components/WorkLogElement'));
var WorkLogForm = React.createFactory(require('../components/WorkLogForm'));

function getWorkLogState() {
  return {
    workLogs: WorkLogStore.getAllWorkLogs(),
    editWorkLog: WorkLogStore.getEditWorkLog(),
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

    var content;
    if (SessionStore.getSession().email) {
      content = <div>
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
    } else {
      content = <h1>Sign in to see your work logs</h1>
    }

    return content
  },

  /**
   * Internal Methods
   */
  _changeWorkLog: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':_change ---');
      console.log('state: ');
      console.log(getWorkLogState());
    }
    this.setState(getWorkLogState());
  },

  _changeSession: function() {
    setTimeout(WorkLogRequestActions.list, 500);
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
    WorkLogStore.addChangeListener(this._changeWorkLog);
    SessionStore.addChangeListener(this._changeSession);
    WorkLogRequestActions.list();
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
    WorkLogStore.removeChangeListener(this._changeWorkLog);
    SessionStore.removeChangeListener(this._changeSession);
  }
});

module.exports = WorkLogs;

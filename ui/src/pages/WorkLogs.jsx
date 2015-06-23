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

function getWorkLogState() {
  return {
    workLogs: WorkLogStore.getAllWorkLogs()
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
    return (
      <div>
        <h1>Work Logs</h1>
        <hr/>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New</h3>
          </div>
          <div className="panel-body">
            <form role="form" className="form-inline" ref="work-log-form" onSubmit={this._submit}>
              <div className="form-group">
                <label htmlFor="work-date">Date</label>
                <input required type="text" className="form-control" placeholder="2015-06-23" ref="work-date" id="work-date" />
              </div>
              <div className="form-group">
                <label htmlFor="total-hours">Hours</label>
                <input required type="text" className="form-control" placeholder="5.5" ref="total-time" id="total-time" />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea className="form-control" rows="1" placeholder="Saved the world" ref="notes" id="notes" />
              </div>
              <button type="submit" className="btn btn-default">Save</button>
            </form>
          </div>
        </div>
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
              if (DEBUG) {
                console.log('[*] ' + _name + ':render-map-work-logs ---');
                console.log(element);
              }
              return (<WorkLogElement data={element} key={element.id} />);
            }, this)}
          </tbody>
        </table>
      </div>
    );
  },

  /**
   * Internal Methods
   */
  _submit: function(e) {
    e.preventDefault();

    var workDate = this.refs['work-date'].getDOMNode();
    var totalTime = this.refs['total-time'].getDOMNode();
    var notes = this.refs['notes'].getDOMNode();

    WorkLogRequestActions.create({
      workDate: workDate.value,
      totalTime: totalTime.value,
      notes: notes.value
    });

    workDate.value = '';
    totalTime.value = '';
    notes.value = '';

    workDate.focus();
  },

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

/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'WorkLogForm.jsx';
var React = require('react');
var WorkLogRequestActions = require('../actions/WorkLogRequestActions');

var WorkLogForm = React.createClass({
  displayName: _name,

  propTypes: {
    workLog: React.PropTypes.object
  },

  getInitialState: function() {
    return { workLog: this.props.workLog };
  },

  componentWillReceiveProps: function(nextProps) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillReceiveProps ---');
      console.log('      workLog:')
      console.table([nextProps.workLog]);
    }
    this.setState({workLog: nextProps.workLog})
  },

  render() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':render ---');
      console.log('      workLog:')
      console.table([this.state.workLog]);
    }
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.workLog.id ? "Edit" : "New"}</h3>
          </div>
          <div className="panel-body">
            <form role="form" className="form-inline" ref="work-log-form" onSubmit={this._submit}>
              <div className="form-group">
                <label htmlFor="work-date">Date</label>
                <input required type="text" className="form-control" placeholder="2015-06-23" ref="work-date" id="work-date" value={this.state.workLog.work_date} onChange={this._setWorkDate} />
              </div>
              <div className="form-group">
                <label htmlFor="total-hours">Hours</label>
                <input required type="text" className="form-control" placeholder="5.5" ref="total-time" id="total-time" value={this.state.workLog.total_time} onChange={this._setTotalTime} />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea className="form-control" rows="1" placeholder="Saved the world" ref="notes" id="notes" value={this.state.workLog.notes} onChange={this._setNotes}/>
              </div>
              <button type="submit" className="btn btn-default">Save</button>
            </form>
          </div>
        </div>
    )
  },

  // _setWorkDate: function(e) {
  //   var workLog = this.state.workLog;
  //   workLog.work_date = e.target.value;
  //   this.setState({workLog: workLog});
  // },

  _dupeWorkLog: function() {
    var workLog = {};
    for (var key in this.state.workLog) {
      workLog[key] = this.state.workLog[key];
    }
    return workLog;
  },

  _setWorkDate: function(e) {
    var workLog = this._dupeWorkLog();
    workLog.work_date = e.target.value;
    this.setState({workLog: workLog});
  },

  _setTotalTime: function(e) {
    var workLog = this._dupeWorkLog();
    workLog.total_time = e.target.value;
    this.setState({workLog: workLog});
  },

  _setNotes: function(e) {
    var workLog = this._dupeWorkLog();
    workLog.notes = e.target.value;
    this.setState({workLog: workLog});
  },

  _submit: function(e) {
    e.preventDefault();

    WorkLogRequestActions.save({
      id: this.state.workLog.id,
      work_date: this.state.workLog.work_date,
      total_time: this.state.workLog.total_time,
      notes: this.state.workLog.notes
    });

    this.refs['work-date'].getDOMNode().focus();
  },

});

module.exports = WorkLogForm;

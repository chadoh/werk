/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'UserForm.jsx';
var React = require('react');
var UserRequestActions = require('../actions/UserRequestActions');
var UserStore = require('../stores/UserStore');

function _getError() {
  return UserStore.getError()
}

var UserForm = React.createClass({
  displayName: _name,

  propTypes: {
    user: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getInitialState: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillReceiveProps ---');
      console.log('      user:');
      console.table([this.props.user]);
      console.log('      error:');
      console.log(_getError());
    }
    return { user: this.props.user, error: _getError() };
  },

  componentWillReceiveProps: function(nextProps) {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillReceiveProps ---');
      console.log('      user:');
      console.table([nextProps.user]);
      console.log('      error:');
      console.log(_getError());
    }
    this.setState({user: nextProps.user, error: _getError()})
  },

  render() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':render ---');
      console.log('      user:')
      console.table([this.state.user]);
    }
    var errors = !this.state.error ? '' :
      <div className="panel panel-danger">
        <div className="panel-body">
          <span className="text-danger">Error:</span>
          &nbsp;
          {this.state.error}
        </div>
      </div>;
    var extraFields = !this.state.user.id ? '' :
      <div className="form-group">
        <label htmlFor="hours">How many hours a day do you want to work?</label>
        <input required type="number" step="0.5" className="form-control" ref="hours" id="hours" value={this.state.user.preferred_hours_per_day} onChange={this._setHours} />
      </div>;
    return (
      <div>
        {errors}
        <form role="form" className={this.props.className} ref="work-log-form" onSubmit={this._submit}>
          <div className="form-group">
            <label htmlFor="work-date">Email</label>
            <input required type="text" className="form-control" ref="email" id="email" value={this.state.user.email} onChange={this._setEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input required type="password" className="form-control" ref="password" id="password" value={this.state.user.password} onChange={this._setPassword} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmation">Password confirmation</label>
            <input required type="password" className="form-control" ref="confirmation" id="confirmation" value={this.state.user.password_confirmation} onChange={this._setConfirmation} />
          </div>
          {extraFields}
          <button type="submit" className="btn btn-default">Save</button>
        </form>
      </div>
    )
  },

  _dupeUser: function() {
    var user = {};
    for (var key in this.state.user) {
      user[key] = this.state.user[key];
    }
    return user;
  },

  _setEmail: function(e) {
    var user = this._dupeUser();
    user.email = e.target.value;
    this.setState({user: user});
  },

  _setPassword: function(e) {
    var user = this._dupeUser();
    user.password = e.target.value;
    this.setState({user: user});
  },

  _setConfirmation: function(e) {
    var user = this._dupeUser();
    user.password_confirmation = e.target.value;
    this.setState({user: user});
  },

  _setHours: function(e) {
    var user = this._dupeUser();
    user.preferred_hours_per_day = e.target.value;
    this.setState({user: user});
  },

  _submit: function(e) {
    e.preventDefault();

    UserRequestActions.save({
      id: this.state.user.id,
      email: this.state.user.email,
      password: this.state.user.password,
      password_confirmation: this.state.user.password_confirmation,
      preferred_hours_per_day: this.state.user.preferred_hours_per_day
    });
  },

});

module.exports = UserForm;

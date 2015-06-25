/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'Navbar.jsx';
var React = require('react');
var Link = React.createFactory(require('./Link'));
var SessionStore = require('../stores/SessionStore');
var SessionRequestActions = require('../actions/SessionRequestActions');

function getSessionState() {
  return {
    session: SessionStore.getSession(),
    error: SessionStore.getError()
  }
}

var Navbar = React.createClass({

  displayName: _name,

  getInitialState: function() {
    return getSessionState()
  },

  componentWillMount: function() {
    SessionStore.addChangeListener(this._change)
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._change)
  },

  _change: function() {
    this.setState(getSessionState());
  },

  _dupeSession: function() {
    var session = {};
    for (var key in this.state.session) {
      session[key] = this.state.session[key];
    }
    return session;
  },

  _submit: function(e) {
    e.preventDefault();

    var email = this.refs['email'].getDOMNode();
    var password = this.refs['password'].getDOMNode();

    SessionRequestActions.signIn({
      email: email.value,
      password: password.value
    });
  },

  _signOut: function(e) {
    e.preventDefault();
    SessionRequestActions.signOut();
  },

  render() {
    var error = !this.state.error ? '' :
      <p className="navbar-text">{this.state.error}</p>;

    var loginStuff;
    if (this.props.auth === "false") {
      loginStuff = '';
    } else if (this.state.session.email) {
      loginStuff = <p className="navbar-text navbar-right">
        Signed in as&nbsp;
        <Link to="/profile">{this.state.session.email}</Link>
        &nbsp;&ndash;&nbsp;
        <a href="#" onClick={this._signOut} className="navbar-link">Sign Out</a>
      </p>
    } else {
      loginStuff = <div className="navbar-right">
        {error}
        <form className="navbar-form" onSubmit={this._submit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="email" ref="email" className="form-control" />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="password" ref="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-default">Sign In</button>
        </form>
        <ul className="nav navbar-nav">
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>
    }

    var manageUsers = !this.state.session.is_admin ? '' :
      <ul className="nav navbar-nav">
        <li><Link to="/users">Manage Users</Link></li>
      </ul>;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link style={{ marginRight: '30px' }} className="navbar-brand" to="/">Werk</Link>
          {manageUsers}
          <div className="collapse navbar-collapse">
            {loginStuff}
          </div>
        </div>
      </nav>
    );
  },

  /**
   * Internal Methods
   */
  _checkUri: function(uriCompare) {
    var _uri = this.props.uri[0];
    if (DEBUG) {
      console.log('[*] ' + _name + ':_checkUri ---');
      console.log(uriCompare);
      console.log(this.props.uri);
    }
    return (_uri === uriCompare) ? 'active': '';
  }

});

module.exports = Navbar;

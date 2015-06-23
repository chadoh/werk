/**
 * @jsx React.DOM
 */
'use strict';

var DEBUG = false;
var _name = 'Navbar.jsx';
var React = require('react');
var Link = React.createFactory(require('./Link'));

var Navbar = React.createClass({

  displayName: _name,

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <Link style={{ marginRight: '30px' }} className="navbar-brand" to="/">Welcome</Link>
        <ul className="nav navbar-nav">
          <li className={this._checkUri('')}>
            <Link to="/">Home</Link>
          </li>
          <li className={this._checkUri('libraries')}>
            <Link to="/libraries">Libraries</Link>
          </li>
          <li className={this._checkUri('todo')}>
            <Link to="/todo">To Do Application</Link>
          </li>
          <li className={this._checkUri('work_logs')}>
            <Link to="/worklogs">Work Logs</Link>
          </li>
        </ul>
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

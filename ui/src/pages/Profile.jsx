/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'Profile.jsx';
var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var SessionStore = require('../stores/SessionStore');
var UserForm = React.createFactory(require('../components/UserForm'));

function getState() {
  return {
    user: SessionStore.getSession()
  }
}

var Profile = React.createClass({
  /**
   * Initialization
   */
  displayName: _name,

  getInitialState: function() {
    return getState();
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
      console.log('      user:');
      console.table([this.state.user]);
    }
    var content = !this.state.user.email ? <h1>Please sign in</h1> :
      <div>
        <h1>Edit Your Settings</h1>
        <hr/>
        <div className="row">
          <div className="col-lg-6">
            <UserForm user={this.state.user} />
          </div>
        </div>
      </div>
    return content
  },

  /**
   * Internal Methods
   */
  _change: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':_change ---');
      console.log('state: ');
      console.log(getState());
    }
    this.setState(getState());
  },

  /**
   * Life-cycle Methods
   */
  componentWillMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillMount ---');
    }
    SessionStore.addChangeListener(this._change);
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
    SessionStore.removeChangeListener(this._change);
  }
});

module.exports = Profile;

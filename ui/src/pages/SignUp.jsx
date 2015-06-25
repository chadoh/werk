/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'SignUp.jsx';
var React = require('react');
var SignUpLayout = React.createFactory(require('../layouts/SignUp'));
var RouteActions = require('../actions/RouteActions');
var UserStore = require('../stores/UserStore');
var UserForm = React.createFactory(require('../components/UserForm'));

function getUserState() {
  return {
    user: UserStore.getEditUser()
  }
}

var SignUp = React.createClass({
  /**
   * Initialization
   */
  displayName: _name,

  getInitialState: function() {
    return getUserState();
  },

  getDefaultProps: function() {
    return {
      layout: SignUpLayout
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
    return (
      <div>
        <h1>Sign Up</h1>
        <hr/>
        <div className="row">
          <div className="col-lg-6">
            <UserForm user={this.state.user} />
          </div>
        </div>
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
      console.log(getUserState());
    }
    this.setState(getUserState());
  },

  _afterSave: function() {
    RouteActions.setRoute('/work_logs');
  },

  /**
   * Life-cycle Methods
   */
  componentWillMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillMount ---');
    }
    UserStore.addChangeListener(this._change);
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
    UserStore.removeChangeListener(this._change);
  }
});

module.exports = SignUp;

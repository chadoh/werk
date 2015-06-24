/**
 * @jsx React.DOM
 */
'use strict';
var DEBUG = false;
var _name = 'Users.jsx';
var React = require('react');
var DefaultLayout = React.createFactory(require('../layouts/Default'));
var UserRequestActions = require('../actions/UserRequestActions');
var UserStore = require('../stores/UserStore');
var UserElement = React.createFactory(require('../components/UserElement'));
var UserForm = React.createFactory(require('../components/UserForm'));

function getUserState() {
  return {
    users: UserStore.getAllUsers(),
    editUser: UserStore.getEditUser()
  }
}

var Users = React.createClass({
  /**
   * Initialization
   */
  displayName: _name,

  getInitialState: function() {
    return getUserState();
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
      console.log('      users:')
      console.table(this.state.users);
      console.log('      editUser:');
      console.table([this.state.editUser]);
    }
    return (
      <div>
        <h1>Users</h1>
        <hr/>
        <UserForm user={this.state.editUser} />
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(function(element) {
              return (<UserElement data={element} key={element.id} underEdit={element.id === this.state.editUser.id} />);
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
      console.log(getUserState());
    }
    this.setState(getUserState());
  },

  _reverseSort: function(e) {
    e.preventDefault();
    UserRequestActions.reverseSort();
  },

  /**
   * Life-cycle Methods
   */
  componentWillMount: function() {
    if (DEBUG) {
      console.log('[*] ' + _name + ':componentWillMount ---');
    }
    UserStore.addChangeListener(this._change);
    UserRequestActions.fetchUsers();
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

module.exports = Users;

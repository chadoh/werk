/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Navbar = React.createFactory(require('../components/Navbar'));

var SignUpLayout = React.createClass({
  displayName: 'Default.jsx',
  getDefaultProps() {
    return {};
  },
  render() {
    return (
      <div className="row" style={{marginTop:'20px', marginBottom:'50px'}}>
        <Navbar uri={this.props.uri} auth="false" />
        {this.props.children}
      </div>
    );
  }
});

module.exports = SignUpLayout;

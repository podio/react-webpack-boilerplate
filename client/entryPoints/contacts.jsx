'use strict';

var React = require('react');

require('./common-styles');

var ContactsComponent = React.createClass({
  render: function() {
    return (
      <p>Hello, Contacts Entry from React!</p>
    );
  }
});

React.render(<ContactsComponent />, document.body);

'use strict';

var React = require('react');
var PlatformJS = require('PlatformJS');

var clientId = '';
var redirectURL = 'http://localhost:3001';
var platform = new PlatformJS({ authType: 'client', clientId: clientId });

var IndexComponent = React.createClass({
  getInitialState: function() {
    return {};
  },

  getDefaultProps: function () {
    return {
      items: []
    };
  },

  fetchUserDetails: function() {
    if (!_.isUndefined(this.state.user)) {
      return;
    }

    platform.request('get', '/user/status').then(function(responseData) {
      this.setState({ user: responseData.profile });
    }.bind(this));
  },

  showUserDetails: function() {
    if (this.state.user) {
      return (
        <p>
          Using a sophisticated technology we managed to get your user data:
          <table>
            <tr>
              <th>Name:</th>
              <td>{this.state.user.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{this.state.user.mail[0]}</td>
            </tr>
          </table>
        </p>
      );
    }
  },

  showClientSideAuthExample: function() {
    if (!_.isEmpty(clientId)) {
      if (platform.isAuthenticated()) {
        this.fetchUserDetails();

        return (
          <p>
            We are happy, because we are authenticated!
            {this.showUserDetails()}
          </p>
        );
      } else {
        return (
          <p>
            Now let's do a client side auth: <a href={platform.getAuthorizationURL(redirectURL)}>Click on this link</a>
          </p>
        );
      }
    }
  },

  render: function() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section>
        <h2>Welcome to the React Webpack Boilerplate</h2>
        Please take a look at this cool list of things:
        <ul ref="indexList" className="index-list">
          {this.props.items.map(function(item, index){
            return <li key={index}>item {item}</li>;
          })}
        </ul>
        {this.showClientSideAuthExample()}
      </section>
    );
  }
});

module.exports = IndexComponent;

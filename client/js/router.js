/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router-component'),
    Users    = require('./users');

var Locations = Router.Locations,
    Location = Router.Location,
    NotFound = Router.NotFound,
    Link = Router.Link;

var MainPage = React.createClass({
  render: function() {
    return (
      <div>
        Hello, this is main page of the application!
        <p>Proceed to <Link href="/users">users page</Link>.</p>
        <p>Proceed to <Link href="/settings">unknown page</Link>.</p>
      </div>
    )
  }
});

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        Sorry! Page is not found.
        Back to <Link href="/">home</Link>.
      </div>
    )
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <Locations>
        <Location path="/" handler={MainPage} />
        <Location path="/users" handler={Users} />
        <NotFound handler={NotFoundPage} />
      </Locations>
    )
  }
});

module.exports = Content;

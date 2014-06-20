/** @jsx React.DOM */
var React = require('react'),
    Footer,
    Item;

Footer = React.createClass({
    render: function () {
        var user = this.props.user;
        return <p>
            <a href="mailto:{user.email}">{user.email}</a>
        </p>;
    }
});

Item = React.createClass({
    render: function () {
        var user = this.props.user;
        return <li>
            <strong>{user.name}</strong>
            <Footer user={user}/>
       </li>;
    }
});

module.exports = Item;

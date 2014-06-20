/** @jsx React.DOM */
var React = require('react'),
    $     = require('jquery'),
    Item  = require('./item'),
    List;

List = React.createClass({
    getInitialState: function () {
        return { users: [] };
    },
    componentWillMount: function () {
        this.fetchLatestNews();
    },
    fetchLatestNews: function () {
      this.setState({ users: [ { id: 1, name: 'John', email: 'john@example.com'},
                               { id: 2, name: 'Kumar', email: 'kumar@example.com'}] });

      // For Ajax Request
      // $.ajax({
      //       url:       'http://api.react-seed.com/users',
      //       dataType:  'jsonp',
      //       data:      { format: 'jsonp' },
      //       success: function (result) {
      //           this.setState({ users: result.items });
      //       }.bind(this),
      //       error: function () {
      //           alert('error getting users. please try again later');
      //       }
      //   });
    },
    render: function () {
        return <ol className="users">
            {this.state.users.map(function (user) {
                return <Item key={user.id} user={user}/>
            })}
        </ol>;
    }
});

module.exports = List;

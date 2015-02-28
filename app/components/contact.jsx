'use strict';

var Contact = React.createClass({
    render() {
        return (
          <li role="presentation"><a role="menuitem" tabindex="-1" href="#">{this.props.label}</a></li>
        );
    }
});

'use strict';

var Contact = React.createClass({displayName: "Contact",
    render:function() {
        return (
          React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, this.props.label))
        );
    }
});

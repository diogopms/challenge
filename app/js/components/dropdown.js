'use strict';

var Dropdown = React.createClass({displayName: "Dropdown",
    render:function() {
      var style = {
          background: this.props.color,
          display: this.props.show
      }
      return (
        React.createElement("div", {className: "dropdown -inline"}, 
          React.createElement("button", {className: "btn btn-call dropdown-toggle", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown", "aria-expanded": "true", style: style}, 
            React.createElement("i", {className: this.props.icon? 'fa fa-' + this.props.icon : ''})
          ), 
          React.createElement("ul", {className: "dropdown-menu dropdown-menu-right", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
            React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, "Action")), 
            React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, "Another action")), 
            React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, "Something else here")), 
            React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, "Separated link"))
          )
        )
      );
    }
});

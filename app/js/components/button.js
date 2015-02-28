'use strict';

var Button = React.createClass({displayName: "Button",
    render:function() {
        var style = {
            background: this.props.color,
            display: this.props.show
        }
        return (
            React.createElement("button", {ref: "button", className: "btn btn-call", onClick: this.props.action, style: style}, 
                React.createElement("i", {className: this.props.icon? 'fa fa-' + this.props.icon : ''})
            )
        );
    }
});

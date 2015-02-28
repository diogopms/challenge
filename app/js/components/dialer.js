'use strict';

var Dialer = React.createClass({displayName: "Dialer",
    render:function() {
        return (
            React.createElement("div", {className: "input-group"}, 
                React.createElement("div", {className: "input-group-btn"}, 
                    React.createElement("button", {id: "number-prefix", type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-expanded": "false"}, 
                        "+351 ", React.createElement("i", {className: "fa fa-angle-down"})
                    )
                ), 
                React.createElement("input", {type: "text", id: "number", name: "number", className: "form-control", 
                      placeholder: ""})
            )
        );
    }
});

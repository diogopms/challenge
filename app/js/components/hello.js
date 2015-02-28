'use strict';

var Hello = React.createClass({displayName: "Hello",
    render:function() {
        return (
            React.createElement("p", null, "Hello world")
        );
    }
});

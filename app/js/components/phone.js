'use strict';

var Phone = React.createClass({displayName: "Phone",
    componentWillMount:function() {
        this.twilio = Twilio;
    },
    componentDidMount:function() {
        this.twilio.Device.ready(function(device)  {
            console.log("Client is ready");
        });
        this.twilio.Device.error(function(error)  {
            console.log("Error: " + error.message);
        });
        this.twilio.Device.incoming(function(conn)  {
            console.log("Incoming connection from " + conn.parameters.From);
            // accept the incoming connection and start two-way audio
            conn.accept();
            console.log('Call accepted');
            $('.call-actions').addClass('-open');
            this.setProps({on_call: true});

        }.bind(this));

        this.twilio.Device.cancel(function(conn)  {
            console.log('Call canceled by the caller');
            $('.call-actions').removeClass('-open');
            this.setProps({on_call: false});
        }.bind(this));

        this.twilio.Device.connect(function(conn)  {
            console.log("Successfully established call");
            $('.call-actions').addClass('-open');
            this.setProps({on_call: true});
        }.bind(this));
        this.twilio.Device.disconnect(function(conn)  {
            console.log("Call ended");
            $('.call-actions').removeClass('-open');
            this.setProps({on_call: false});
        }.bind(this));
    },
    getDefaultProps:function() {
        return { on_call: false, muted: false };
    },
    makeCall:function() {
        var number = $('#number').val();
        var prefix = $('#number-prefix').text().trim();
        var dest = '';
        if (number.match(/[a-zA-Z]+/)) {
            dest = number;
        } else {
            dest = prefix + number;
        }

        var params = { phone_number: dest };
        this.twilio.Device.connect(params);

    },
    hangup:function() {
        this.twilio.Device.disconnectAll();
    },
    mute:function() {
        var connection = this.twilio.Device.activeConnection();
        if (connection !== null) {
            connection.mute(true);
            this.setProps({muted: true});
        }

    },
    unmute:function() {
        var connection = this.twilio.Device.activeConnection();
        if (connection !== null) {
            connection.mute(false);
            this.setProps({muted: false});
        }
    },
    render:function() {
        return (
            React.createElement("div", {className: "phone-container"}, 
                React.createElement("div", {className: "form-inline"}, 
                    React.createElement(Dialer, null), 
                    React.createElement(Button, {icon: "phone", color: "#7db500", action: this.makeCall, show: this.props.on_call? 'none' : ''}), 
                    React.createElement(Button, {icon: "phone", color: "#da4f49", action: this.hangup, show: this.props.on_call? '' : 'none'}), 
                    React.createElement("div", {className: "call-actions"}, 
                        React.createElement(Button, {icon: "volume-up", action: this.mute, show: this.props.muted? 'none' : ''}), 
                        React.createElement(Button, {icon: "volume-off", action: this.unmute, show: this.props.muted? '' : 'none'}), 
                        React.createElement(Button, {icon: "user-plus"}), 
                        React.createElement(Button, {icon: "share"})
                    ), 
                    React.createElement(ContactList, {icon: "group"})
                )
            )
        );
    }
});

'use strict';

var Phone = React.createClass({
    componentWillMount() {
        this.twilio = Twilio;
    },
    componentDidMount() {
        this.twilio.Device.ready(device => {
            console.log("Client is ready");
        });
        this.twilio.Device.error(error => {
            console.log("Error: " + error.message);
        });
        this.twilio.Device.incoming(conn => {
            console.log("Incoming connection from " + conn.parameters.From);
            // accept the incoming connection and start two-way audio
            conn.accept();
            console.log('Call accepted');
            $('.call-actions').addClass('-open');
            this.setProps({on_call: true});

        });

        this.twilio.Device.cancel(conn => {
            console.log('Call canceled by the caller');
            $('.call-actions').removeClass('-open');
            this.setProps({on_call: false});
        });

        this.twilio.Device.connect(conn => {
            console.log("Successfully established call");
            $('.call-actions').addClass('-open');
            this.setProps({on_call: true});
        });
        this.twilio.Device.disconnect(conn => {
            console.log("Call ended");
            $('.call-actions').removeClass('-open');
            this.setProps({on_call: false});
        });
    },
    getDefaultProps() {
        return { on_call: false, muted: false };
    },
    makeCall() {
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
    hangup() {
        this.twilio.Device.disconnectAll();
    },
    mute() {
        var connection = this.twilio.Device.activeConnection();
        if (connection !== null) {
            connection.mute(true);
            this.setProps({muted: true});
        }

    },
    unmute() {
        var connection = this.twilio.Device.activeConnection();
        if (connection !== null) {
            connection.mute(false);
            this.setProps({muted: false});
        }
    },
    render() {
        return (
            <div className="phone-container">
                <div className="form-inline">
                    <Dialer />
                    <Button icon="phone" color="#7db500" action={this.makeCall} show={this.props.on_call? 'none' : ''} />
                    <Button icon="phone" color="#da4f49" action={this.hangup} show={this.props.on_call? '' : 'none'} />
                    <div className="call-actions">
                        <Button icon="volume-up" action={this.mute} show={this.props.muted? 'none' : ''}/>
                        <Button icon="volume-off" action={this.unmute} show={this.props.muted? '' : 'none'} />
                        <Button icon="user-plus" />
                        <Button icon="share" />
                    </div>
                    <ContactList icon="group" />
                </div>
            </div>
        );
    }
});

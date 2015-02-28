'use strict';

var ContactList = React.createClass({
    componentWillMount() {
      this.twilio = Twilio;
    },
    getInitialState() {
      return { contacts: [] };
    },
    componentDidMount() {
      this.twilio.Device.presence(pres => {
        if (pres.available) {
          this.setState({ contacts: this.state.contacts.concat([pres.from]) });
        }
        else {
          // find the item by client name and remove it
          this.setState({ contacts: _.without(this.state.contacts, pres.from)});
        }
      });
    },
    render() {
      var style = {
          background: this.props.color,
          display: this.props.show
      }

      return (
        <div className="dropdown -inline">
          <button className="btn btn-call dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true" style={style}>
            <i className={this.props.icon? 'fa fa-' + this.props.icon : '' }></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
            {
              this.state.contacts.map(contact => <Contact label={contact} />)
            }
          </ul>
        </div>
      );
    }
});

'use strict';

var ContactList = React.createClass({displayName: "ContactList",
    componentWillMount:function() {
      this.twilio = Twilio;
    },
    getInitialState:function() {
      return { contacts: [] };
    },
    componentDidMount:function() {
      this.twilio.Device.presence(function(pres)  {
        if (pres.available) {
          this.setState({ contacts: this.state.contacts.concat([pres.from]) });
        }
        else {
          // find the item by client name and remove it
          this.setState({ contacts: _.without(this.state.contacts, pres.from)});
        }
      }.bind(this));
    },
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
            
              this.state.contacts.map(function(contact)  {return React.createElement(Contact, {label: contact});})
            
          )
        )
      );
    }
});

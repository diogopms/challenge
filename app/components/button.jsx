'use strict';

var Button = React.createClass({
    render() {
        var style = {
            background: this.props.color,
            display: this.props.show
        }
        return (
            <button ref="button" className="btn btn-call" onClick={this.props.action} style={style}>
                <i className={this.props.icon? 'fa fa-' + this.props.icon : '' }></i>
            </button>
        );
    }
});

'use strict';

var Dialer = React.createClass({
    render() {
        return (
            <div className="input-group">
                <div className="input-group-btn">
                    <button id="number-prefix" type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        +351 <i className="fa fa-angle-down"></i>
                    </button>
                </div>
                <input type="text" id="number" name="number" className="form-control"
                      placeholder=""/>
            </div>
        );
    }
});

import './Loader.css';
import React from 'react';

const Loader = (props) => {
    return (
        <div className="ui active dimmer">
            <div className="loader"></div>
            <h3 style={{ color:"#ECF0F1"}}>{props.message}</h3>
        </div>
    );
};

Loader.defaultProps = {
    message: "Loading...",
};

export default Loader;
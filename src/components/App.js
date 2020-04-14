import Loader from './Loader.js';
import Weather from './Weather.js';
import React from 'react';

class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        errormessage: ''
    };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position =>
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
            err => this.setState({ errormessage:err })
        );
    }

    content() {
        if ((this.state.errormessage && !this.state.latitude) || (!this.state.errormessage && this.state.latitude)) {
            return (
                <div>
                    <Weather
                        lat={this.state.latitude}
                        lon={this.state.longitude}
                        err={this.state.errormessage}
                    />
                </div>);
        }
        else
            return (<Loader />);
    }

    render() {
        return (
            <div>
                {this.content()}
            </div>
            );
    }
}

export default App;
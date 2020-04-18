import Search from "./Search.js";
import "./Style.css";
import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner"; //this line has been added

class Weather extends React.Component {
    state = {
        temperature: "--",
        temp_min: "--",
        temp_max: "--",
        city: "--",
        country: "--",
        description: "--",
        feels_like: "--",
        wind_speed: "--",
        humidity: "--",
        icon: "",
        id: "",
        lang: "en",
        mode: "light",
        isLoading: false, //this line has been added
    };

    api = {
        url: "https://api.openweathermap.org/data/2.5/weather",
        key: "3fbcc7e2b4af718994738862e2c07783",
    };

    throwIcon() {
        //no changes in this
        if (this.state.city !== "--")
            return (
                <div>
                    <img
                        src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
                        alt=" "
                    />
                </div>
            );
        else return <div />;
    }

    setTheme(event) {
        //no changes in this
        event.preventDefault();
        if (event.target.value === "light") this.setState({ mode: "dark" });
        else this.setState({ mode: "light" });
    }

    onSearchSubmit = (query) => {
        this.setState({ isLoading: true }, () => {
            axios({
                method: "GET",
                url: `${this.api.url}?q=${query}&lang=${this.state.lang}&appid=${this.api.key}`,
            })
                .then((response) => {
                    console.clear();
                    this.setState({
                        temperature: (response.data.main.temp - 273.15).toFixed(2),
                        temp_max: (response.data.main.temp_max - 273.15).toFixed(2),
                        temp_min: (response.data.main.temp_min - 273.15).toFixed(2),
                        description: response.data.weather[0].description,
                        city: response.data.name,
                        icon: response.data.weather[0].icon,
                        feels_like: (response.data.main.feels_like - 273.15).toFixed(2),
                        wind_speed: response.data.wind.speed,
                        humidity: response.data.main.humidity,
                        isLoading: false,
                    });
                })
                .catch((err) => {
                    this.setState(
                        {
                            temperature: "--",
                            temp_max: "--",
                            temp_min: "--",
                            description: "--",
                            city: "--",
                            icon: "--",
                            feels_like: "--",
                            wind_speed: "--",
                            humidity: "--",
                            isLoading: false,
                        },
                        () => {
                            alert("Make sure you typed proper city name");
                        }
                    );
                });
        });
    };

    onSearchlocation = async () => {
        this.setState({ isLoading: true }, () => {
            if (this.props.lat === null) {
                alert("Unable to fetch location at the moment");
                this.setState({ isLoading: false });
            } else {
                axios
                    .all([
                        axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${this.props.lat}&lon=${this.props.lon}&lang=${this.state.lang}&appid=${this.api.key}`
                        ),
                        axios.get(
                            `https://api.opencagedata.com/geocode/v1/json?q=${this.props.lat}+${this.props.lon}&key=41d73973931e4b93a91461b3cbfa7a5a&pretty=1&language=native`
                        ),
                    ])
                    .then((response) => {
                        console.clear();
                        this.setState({
                            temperature: (response[0].data.main.temp - 273.15).toFixed(2),
                            temp_max: (response[0].data.main.temp_max - 273.15).toFixed(2),
                            temp_min: (response[0].data.main.temp_min - 273.15).toFixed(2),
                            icon: response[0].data.weather[0].icon,
                            description: response[0].data.weather[0].description,
                            feels_like: (response[0].data.main.feels_like - 273.15).toFixed(2),
                            city: response[1].data.results[0].components.city,
                            wind_speed: response[0].data.wind.speed,
                            humidity: response[0].data.main.humidity,
                            isLoading: false,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Not able to fetch"); 
                    });
            }
        });
    };

    render() {
        return (
            <div className={`${this.state.mode}-color`}>
                <div className={`${this.state.mode}-header jumbotron text-center`}>
                    <h1 className="display-3">
                        Weather Map
            <i className="cloud icon" />
                    </h1>
                </div>

                <div
                    className="navbar navbar-light"
                    style={{ backgroundColor: "#17202A " }}
                >
                    <div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                value={this.state.mode}
                                onClick={(e) => this.setTheme(e)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <select
                        className="ui search dropdown"
                        style={{ maxHeight: "5", float: "left" }}
                        value={this.state.lang}
                        onChange={(e) => this.setState({ lang: e.target.value })}
                    >
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="af">Afrikaans</option>
                        <option value="al">Albanian</option>
                        <option value="ar">Arabic</option>
                        <option value="az">Azerbaijani</option>
                        <option value="eu">Basque</option>
                        <option value="bg">Bulgarian</option>
                        <option value="ca">Catalan</option>
                        <option value="zh_cn">Chinese Simplified</option>
                        <option value="zh_tw">Chinese Traditional</option>
                        <option value="hr">Croation</option>
                        <option value="cz">Czech</option>
                        <option value="da">Danish</option>
                        <option value="nl">Dutch</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="gl">Galician</option>
                        <option value="de">German</option>
                        <option value="el">Greek</option>
                        <option value="he">Hebrew</option>
                        <option value="hu">Hungarian</option>
                        <option value="id">Indonesian</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="kr">Korean</option>
                        <option value="la">Latvian</option>
                        <option value="lt">Lithunian</option>
                        <option value="mk">Macedonian</option>
                        <option value="no">Norwegian</option>
                        <option value="fa">Persian</option>
                        <option value="pl">Polish</option>
                        <option value="pt">Portuguese</option>
                        <option value="pt_br">Portuguêse Brasil</option>
                        <option value="ro">Romanian</option>
                        <option value="ru">Russian</option>
                        <option value="sv">Swedish</option>
                        <option value="sk">Slovak</option>
                        <option value="sl">Slovanian</option>
                        <option value="sp">Spanish</option>
                        <option value="sr">Serbian</option>
                        <option value="th">Thai</option>
                        <option value="tr">Turkish</option>
                        <option value="ua">Ukranian</option>
                        <option value="vi">Vietnamese</option>
                        <option value="zu">Zulu</option>
                    </select>
                </div>

                <div>
                    <div className="mt-5 container">
                        <Search handleSubmit={this.onSearchSubmit} />
                        <div className="text-center mt-2">
                            <button
                                className="ui button"
                                onClick={this.onSearchlocation}
                                style={{ backgroundColor: "#2ECC71", color: "#17202A" }}>
                                My location
                            </button>
                        </div>
                    </div>

                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-sm-4">
                                <h1
                                    className="ui header display-3 "
                                    style={{ color: "#2ECC71" }}>
                                    Current
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.temperature !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.temperature}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.temperature === "--" &&
                                        !this.state.isLoading &&
                                        this.state.temperature}
                                </p>
                            </div>
                            <div className="col-sm-4 mt-1 text-center">
                                <h1
                                    className="ui header display-3"
                                    style={{ color: "#2ECC71" }}
                                >
                                    Max-Temp
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.temp_max !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_max}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.temp_max === "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_max}
                                </p>
                            </div>
                            <div className="col-sm-4 mt-1 text-right">
                                <h1
                                    className="ui header display-3"
                                    style={{ color: "#2ECC71" }}
                                >
                                    Min-Temp
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.temp_min !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_min}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.temp_min === "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_min}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <h1
                                    className="ui header display-3 "
                                    style={{ color: "#2ECC71" }}
                                >
                                    Feels like
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.temp_min !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_min}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.temp_min === "--" &&
                                        !this.state.isLoading &&
                                        this.state.temp_min}
                                </p>
                            </div>
                            <div className="col-sm-4 mt-1 text-center">
                                <h1
                                    className="ui header display-3"
                                    style={{ color: "#2ECC71" }}
                                >
                                    Wind Speed
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.wind_speed !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.wind_speed}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.wind_speed === "--" &&
                                        !this.state.isLoading &&
                                        this.state.wind_speed}
                                </p>
                            </div>
                            <div className="col-sm-4 mt-1 text-right">
                                <h1
                                    className="ui header display-3"
                                    style={{ color: "#2ECC71" }}
                                >
                                    Humidity
                                </h1>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.humidity !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.humidity}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.humidity === "--" &&
                                        !this.state.isLoading &&
                                        this.state.humidity}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-6 text-center">
                                <h2 className="display-3" style={{ color: "#2ECC71" }}>
                                    City
                                </h2>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.city !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.city}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.city === "--" &&
                                        !this.state.isLoading &&
                                        this.state.city}
                                </p>
                            </div>
                            <div className="col-sm-6 text-center">
                                <h2 className="display-4" style={{ color: "#2ECC71" }}>
                                    Description
                                </h2>
                                <p className={`${this.state.mode}-font display-4`}>
                                    {this.state.description !== "--" &&
                                        !this.state.isLoading &&
                                        this.state.description}
                                    {this.state.isLoading && (
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    )}
                                    {this.state.description === "--" &&
                                        !this.state.isLoading &&
                                        this.state.description}
                                </p>
                            </div>
                        </div>
                        <div className="container-fluid text-center">
                            {this.throwIcon()}
                        </div>
                    </div>
                </div>

                <div className="" style={{ backgroundColor: "#2ECC71" }}>
                    <h1 className="ui header text-center">Follow me</h1>
                </div>

                <div>
                    <footer className="page-footer font-small cyan darken-3">
                        <div className="text-center container">
                            <div className="row">
                                <div className="col-md-12 py-5"
                                    style={{ alignContent: "center" }}>
                                    <div className="mb-5 flex-center">
                                        <a
                                            className="fb-ic"
                                            href="https://www.facebook.com/vignesh.palani.58"
                                        >
                                            <i className="huge green facebook square icon"></i>
                                        </a>

                                        <a
                                            className="tw-ic"
                                            href="https://twitter.com/vigneshvicky009"
                                        >
                                            <i className="huge green twitter icon"></i>
                                        </a>
                                        <a
                                            className="gplus-ic"
                                            href="https://github.com/VigneshPalani1799"
                                        >
                                            <i className="huge green github icon"></i>
                                        </a>

                                        <a
                                            className="ins-ic"
                                            href="https://www.instagram.com/dj_vicky001/"
                                        >
                                            <i className="huge green instagram icon"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={`${this.state.mode}-font footer-copyright text-center py-3`}>
                                ©Api Used OpenWeatherMap and OpencageGeocoder
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Weather;

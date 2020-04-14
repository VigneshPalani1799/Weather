import React from 'react';

class Search extends React.Component {

    state = { query: "" };

    onButtonClick = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state.query);
    };

    render() {
        return (
            <div className="text-center">
                <form className="">
                    <div className="ui massive icon green input" >
                        <input
                            className=""
                            type="text"
                            name="City"
                            placeholder="City"
                            value={this.state.query}
                            onChange={e => this.setState({ query: e.target.value })}
                        />
                    </div>

                    <div className="mt-2">
                        <button className="ui button" onClick={this.onButtonClick} style={{ backgroundColor: "#2ECC71", color: "#17202A" }}>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            );
    }
}

export default Search;
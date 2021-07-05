import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { results: [] }
    }

    componentWillMount() {
        const apiUrl = 'http://localhost:3000/sample';
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => { this.setState({ results: data.results }) });
    }

    render () {
        return (
            <div className="container">
                <div className="header">
                    <h1>Sample app</h1>
                </div>
                {this.state.results.map(x => (<div className='sample'>Name: { x.name }</div>))}
            </div>
        )
    }
}

export default Home

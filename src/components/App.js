import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(){
        super();
        this.state = {
            resultados: [],
            isLoaded: false,
            error: ""
        };

        this.getDataApi();
    }

    getDataApi(){

        var self = this;

        var miInit = {
            method: 'GET', //'POST', // or 'PUT'
            headers:{
                'Content-Type': 'application/json'
            }
        };

        var apiCall = "https://randomuser.me/api/?results=10";

        fetch(apiCall,miInit)
            .then(response => response.json())
            .then(function(response){
                self.setState({
                    resultados: response.results,
                    isLoaded: true
                });
            })
            .catch(function(error) {
                console.warn(error);
                self.setState({
                    error: true,
                    isLoaded: true
                });
                // If there is any error you will catch them here
            });
    }

    handleReloadData(){
        var self = this;
        // var self = this;
        // console.log(e.target);
        // e.preventDefault();
        // self.setState({
        //     resultados: [],
        //     isLoaded: false
        // });
        // this.getDataApi();
        self.getDataApi();
    }

    render(){
        const { error, isLoaded, resultados } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <ul>
                        {resultados.map(item => (
                            <li key={item.name.first}>
                                {item.name.first} {item.email}
                            </li>
                        ))}
                    </ul>
                    <Button variant="info" id="refresh" onClick={this.handleReloadData}>Info</Button>
                </div>
            );
        }
    }

}

export default App;

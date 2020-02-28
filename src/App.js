import React, { Component } from 'react';
import axios from 'axios';
import UnorderedList from './components/UnorderedList';
import './App.css';

const URL = 'http://localhost:3000/api/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      strength: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  validatePassword(value) {
    axios.post(`${URL}/users/validate_password`, { user: { password: value } }).then(({ data }) => {
      this.setState({
        strength: data.strength,
        results: data.error
      });
    });
  }

  handleChange(event) {
    if(event.target.value === "") {
      this.setState({ strength: "", results: [] });
    }

    this.setState(
      { value: event.target.value },
      () => {
        if (this.state.value && this.state.value.length > 1) {
          this.validatePassword(this.state.value);
        }
    });
  }

  render() {
    return (
      <div className="App">
        <form>
          <input type="password" value={this.state.value} onChange={this.handleChange} />
          <span>{this.state.strength}</span>
          <UnorderedList results={this.state.results} />
        </form>
      </div>
    );
  }
}

export default App;

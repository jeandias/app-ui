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

  badgeClass(value) {
    if(value === "STRONG") {
      return "badge badge-success"
    } else if(value === "WEAK") {
      return "badge badge-danger"
    } else {
      return "badge badge-secondary"
    }
  }

  render() {
    return (
      <div className="App">
        <form>
          <div className="form-group">
          <label htmlFor="password">
            Strength: <span className={this.badgeClass(this.state.strength)}>{this.state.strength}</span>
          </label>
          <input id="password" type="password"
                 onChange={this.handleChange}
                 className="form-control"
                 placeholder="Your password" />
          </div>
          <UnorderedList results={this.state.results} />
        </form>
      </div>
    );
  }
}

export default App;

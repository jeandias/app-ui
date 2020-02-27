import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
const URL = 'http://localhost:3000/api/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  validatePassword(value) {
    axios.post(`${URL}/users/validate_password`, { user: { password: value } }).then(resp => console.log());
  }

  handleChange(event) {
    this.setState(
      { value: event.target.value },
      () => {
        if (this.state.value && this.state.value.length > 1) {
          this.validatePassword(this.state.value)
        }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <input type="password" value={this.state.value} onChange={this.handleChange} />
          </form>
        </header>
      </div>
    );
  }
}

export default App;

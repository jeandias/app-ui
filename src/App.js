import React, { Component } from 'react';
import ValidatePassword from './components/ValidatePassword.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ValidatePassword />
      </div>
    );
  }
}

export default App;

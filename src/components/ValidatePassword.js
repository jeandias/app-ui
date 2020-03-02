import React, { Component } from 'react';
import axios from 'axios';
import UnorderedList from './UnorderedList.js';

class ValidatePassword extends Component {
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
    axios.post(
      `${process.env.REACT_APP_API_URL}/users/validate_password`, { user: { password: value } }
    ).then(({ data }) => {
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
    let classes = "badge badge-";

    switch(value) {
	    case "STRONG":
		    return `${classes}success`
		    break;
	    case "WEAK":
		    return`${classes}danger`
		    break;
	    default:
		    return `${classes}secondary`
	  }
  }

  render() {
    return (
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
    );
  }
}

export default ValidatePassword;

import React, { Component } from 'react'

class AuthForm extends Component {

  state = {
    login: '',
    password: '',
    error: null
  }

  handleChange = event => {
    const extraField = this.props.extraFields && this.props.extraFields.find(
      field => field.name === event.target.name
    )
    if (extraField && extraField.validate) {
      if (!extraField.validate(event.target.value)) {
        this.setState({
          error: 'Invalid field: ' + event.target.name
        })
      } else {
        this.setState({
          error: null
        })
      }
    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    const { login, password, error, ...other } = this.state
    event.preventDefault()
    if (error) {
      return;
    }
    this.props.handleSubmit(
      this.state.login,
      this.state.password,
      other
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.props.error && <p>{this.props.error.message}</p>
        }
        {
          this.state.error
        }
        {
          this.props.extraFields && this.props.extraFields.map(
            (extraFields, index) => (
              <div key={index}>
                <label>
                  {extraFields.label}
                </label>
                <input
                  name={extraFields.name}
                  onChange={this.handleChange}
                />
              </div>
            )
          )
        }
        Login:
        <input
          name="login"
          onChange={this.handleChange}
        />
        Password:
        <input
          name="password"
          type="password"
          onChange={this.handleChange}
        />
        <button>{this.props.label}</button>
      </form>
    )
  }
}

export default AuthForm

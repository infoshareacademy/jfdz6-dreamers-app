import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signUp } from './state/auth'

class SignInUp extends Component {

  state = {
    login: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signIn(
      this.state.login,
      this.state.password
    )
  }

  handleSignUp = event => {
    event.preventDefault()
    this.props.signUp(
      this.state.login,
      this.state.password
    )
  }

  render() {
    return (
      <form>
        {
          this.props.auth.error && <p>{this.props.auth.error.message}</p>
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
        <button onClick={this.handleSubmit}>Sign in</button>
        <button onClick={this.handleSignUp}>Sign up</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password)),
  signUp: (email, password) => dispatch(signUp(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInUp)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthForm from './AuthForm';
import { signUp } from './state/auth'

class SignUp extends Component {
  render() {
    return (
      <AuthForm
        label={'Zarejestruj'}
        error={this.props.auth.error}
        handleSubmit={this.props.signUp}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUp(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)

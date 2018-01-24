import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthForm from './AuthForm';
import { signIn } from './state/auth'

class SignIn extends Component {

  render() {
    return (
      <AuthForm
        label={'Zaloguj'}
        error={this.props.auth.error}
        handleSubmit={this.props.signIn}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

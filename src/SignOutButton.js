import React from 'react';
import { connect } from 'react-redux';
import { signOut } from './state/auth';
import {
    NavItem,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import {
    LinkContainer
} from 'react-router-bootstrap'

const SignOutButton = ({ shouldBeVisible, signOut }) => (
  shouldBeVisible &&
    <LinkContainer to="/signup" onClick={signOut}>
      <NavItem>Wyloguj</NavItem>
    </LinkContainer>
)

export default connect(
  state => ({
    shouldBeVisible: state.auth.data !== null
  }),
  dispatch => ({
    signOut: () => dispatch(signOut())
  })
)(SignOutButton)
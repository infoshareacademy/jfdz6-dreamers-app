import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {signUp} from './state/auth'
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap'

import './SignUp.css'

class SignUp extends Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <h1>Rejestracja</h1>
                </Row>
                <Row className="show-grid">
                    <Col sm={8} smOffset={2} md={6} mdOffset={3}>
                        <div className="SignUp_box SignUp_AuthForm ">
                            <AuthForm
                                label={'Zarejestruj'}
                                error={this.props.auth.error}
                                handleSubmit={this.props.signUp}
                            />

                        </div>
                    </Col>
                </Row>
            </Grid>
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

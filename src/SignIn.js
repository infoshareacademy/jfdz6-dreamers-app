import React, {Component} from 'react'
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {signIn} from './state/auth'
import {
    Grid,
    Row,
    Col,
    Image,
    Well,
} from 'react-bootstrap'

import './SignIn.css'

class SignIn extends Component {

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <h1>Logowanie</h1>
                </Row>
                <Row className="show-grid">
                    <Col sm={8} smOffset={2} md={6} mdOffset={3}>
                        <div className="SignIn_box SignIn_AuthForm ">
                            <AuthForm
                                label={'Zaloguj'}
                                error={this.props.auth.error}
                                handleSubmit={this.props.signIn}
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
    signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../store/actions'
import Login from '../../components/Login/Login'
// import axios from 'axios'

class LoginContainer extends Component {

    render() {
        return (
            <Login login={(username, password) => this.props.onLogin(username, password)} />
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username, password) => dispatch(auth(username, password))
    }
}

export default connect(null, mapDispatchToProps)(LoginContainer)
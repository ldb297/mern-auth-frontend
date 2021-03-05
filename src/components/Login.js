// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken'

const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {email, password}

        axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData)
        .then(response => {
            const { token } = response.data
            // save token to localStorage
            localStorage.setItem('jwtToken', token)
            //set token to header
            setAuthToken(token)
            //decode token to get user data
            const decoded = jwt_decode(token)
            //set the current user
            props.nowCurrentUser(decoded)
        })
        .catch(error => {console.log(`>>>>> error logging in ${error}`)
        alert('either email or password incorrect, please try again')
        })
    }

    props.user ? <Redirect to="/profile" /> : <Redirect to="/login"/>

    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={handleEmail} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} className="form-control"/>
                </div>
                <button className="btn btn-primary float-right">Login</button>
            </form>
        </div>
    )
}

export default Login;

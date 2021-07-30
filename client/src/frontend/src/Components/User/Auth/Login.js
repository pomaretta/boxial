import React from 'react'
import axios from 'axios'

import '../../../Style/Modules/Home/Login.scss'

class LoginForm extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading: false,
            username: "",
            password: ""
        }

        this.loginUser = this.loginUser.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    loginUser = async credentials => {
        const data = await axios.post('http://localhost:8000/api/auth/login',credentials)
        return data.data
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({
            loading: true
        })

        const token = await this.loginUser({
            user: {
                username: this.state.username,
                password: this.state.password
            }
        });

        if(token.auth){
            this.props.setToken(token.session)
        } else {
            this.setState({
                loading: false
            })
        }

        console.log(token)

    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={["loader",this.state.loading ? "active" : ""].join(" ")}>
                    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div class="group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" autocomplete="none" required value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                </div>
                <div class="group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" autocomplete="" required value={this.state.password} onChange={ev => this.setState({password: ev.target.value})}/>
                </div>
                <input type="submit" value="Login" />
            </form>
        )
    }

}

class Login extends React.Component {

    render(){
        return (
            <div id="login">
                <div className="logo">
                    <h1>
                        <img src="/images/logo.png" alt="Boxial Logo" />
                        Boxial
                    </h1>
                </div>
                <LoginForm setToken={this.props.setToken} />
                <div class="information">
                    <ul>
                        <li>
                            <a href="https://www.github.com/pomaretta/boxial">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://carlospomares.es">
                                Author
                            </a>
                        </li>
                        <li>
                            <a href="https://www.github.com/pomaretta/boxial/issues">
                                Issue
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Login
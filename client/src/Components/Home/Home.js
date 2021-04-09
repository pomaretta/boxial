import React from 'react'

import "../../Style/Modules/Home/Home.scss"

import Mobile from '../Mobile/Mobile'
import Controls from './Controls'
import Content from './Content'
import Login from '../User/Auth/Login'
import axios from 'axios'

class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            module: "",
            token: this.setUser(sessionStorage.getItem('session_id')),
            user: null
        }

        this.changeModule = this.changeModule.bind(this)
        this.setToken = this.setToken.bind(this)
        this.setUser = this.setUser.bind(this)
        this.getUserData = this.getUserData.bind(this)

    }

    changeModule(module){
        this.setState({
            module: String(module)
        })
    }

    setToken = (token) => {
        this.setState({
            token: token
        })
        sessionStorage.setItem('session_id',token)
        this.setUser(token)
    }

    setUser = (session) => {
        if(session != null){
            this.getUserData(session).then(data => {
                this.setState({
                    user: data
                })
            })
        }
        return session
    }

    getUserData = async session => {
        const user = await axios.get(`http://localhost:8000/api/auth/${session}`)
        return user.data
    }

    render(){

        if(this.state.token == null){
            return <Login setToken={this.setToken} />
        }

        return (
            <div id="home">
                <Mobile />
                <Controls change={this.changeModule} />
                <Content module={this.state.module} user={this.state.user} />
            </div>
        )
    }

}

export default Home
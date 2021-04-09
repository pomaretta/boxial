import React from 'react'

import "../../Style/Modules/Home/Home.scss"

import Mobile from '../Mobile/Mobile'
import Controls from './Controls'
import Content from './Content'
import Login from '../User/Auth/Login'

class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            module: "",
            token: sessionStorage.getItem('session_id'),
        }

        this.changeModule = this.changeModule.bind(this)
        this.setToken = this.setToken.bind(this)

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
    }

    render(){

        if(this.state.token == null){
            return <Login setToken={this.setToken} />
        }

        return (
            <div id="home">
                <Mobile />
                <Controls change={this.changeModule} />
                <Content module={this.state.module} />
            </div>
        )
    }

}

export default Home
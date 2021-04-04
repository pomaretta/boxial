import React from 'react'

import "../../Style/Modules/Home/Home.scss"

import Mobile from '../Mobile/Mobile'
import Controls from './Controls'
import Content from './Content'

class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            module: ""
        }

        this.changeModule = this.changeModule.bind(this)

    }

    changeModule(module){
        this.setState({
            module: String(module)
        })
    }

    render(){
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
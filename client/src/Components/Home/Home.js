import React from 'react'

import "../../Style/Modules/Home/Home.scss"

import Controls from './Controls'
import Content from './Content'

class Home extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id="home">
                <Controls />
                <Content />
            </div>
        )
    }

}

export default Home
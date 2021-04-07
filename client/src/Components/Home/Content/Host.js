import React from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'animate.css'
import 'react-circular-progressbar/dist/styles.css';

class Host extends React.Component {

    render(){
        return (
            <div>
                <h1 className="animate__animated animate__heartBeat">
                    Hello World!
                </h1>
            </div>
        )
    }

}

export default Host
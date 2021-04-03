import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../../Style/Modules/Home/Content/Machines.scss"

const Machine = (props) => {
    return (
        <li>
            <img src={props.system ? "/images/windows.png" : "/images/linux.png"} className="systemImage" alt="System Image" />
            <div className="machine">
                <div className="row row--upper">
                    <div className="column column--left">
                        <h3>
                            {props.name}
                        </h3>
                    </div>
                    <div className="column column--right">
                        <p>
                            Active 
                            <span>
                                {props.state ? "🟢" : "🔴"}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="row row--lower">
                    <div className="group">
                        <p>UUID: {props.uuid}</p>
                    </div>
                    <div className="group">
                        <p>OS: {props.os}</p>
                    </div>
                    <div className="group">
                        <p>IP: {props.net}</p>
                    </div>
                    <div className="group">
                        <p>Last use: {props.use}</p>
                    </div>
                    <div className="group controls">
                        <div className="column column--left">
                            <a href="#">Start</a>
                        </div>
                        <div className="column column--right">
                            <a href="#" className="warning">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

class Machines extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="module" id="machines">
                <div className="functionality">
                    <div className="column column--left">
                        <h3>Virtual Machines</h3>
                        <p>Add new virtual machines</p>
                        <a href="#">
                            Add new machine
                        </a>
                    </div>
                    <div className="column column--right">
                    </div>
                </div>
                <ul className="list">
                    {
                        this.props.machines.map((machine) => {
                            <Machine />
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default Machines
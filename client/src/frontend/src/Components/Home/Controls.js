import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faDesktop, faHdd, faNetworkWired } from '@fortawesome/free-solid-svg-icons'

import '../../Style/Modules/Home/Controls.scss'

const Control = (props) => {
    return (
        <li>
            <a onClick={props.click}>
                <FontAwesomeIcon className="icon" icon={props.icon} />
                <span>
                    {props.title}
                </span>
            </a>
        </li>
    )
}

class Controls extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <section id="controls">
                <div className="row row--upper">
                    <div className="logo">
                        <img src="/images/logo.png" alt="Product Logo" />
                        <h2>Boxial | <span>Dashboard</span></h2>
                    </div>
                </div>
                <nav className="row row--lower">
                    <ul className="controls">
                        <Control click={() => this.props.change("host")} icon={faHouseUser} title="Host" />
                        <Control click={() => this.props.change("machines")} icon={faDesktop} title="Virtual Machines" />
                    </ul>
                    <div className="info">
                        <ul>
                            <li>
                                <a href="#">Feedback</a>
                            </li>
                            <li>
                                <a href="#">Issue</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        )
    }

}

export default Controls
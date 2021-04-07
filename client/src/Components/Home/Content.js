import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'

import '../../Style/Modules/Home/Content.scss'

// MODULES
import Machines from './Content/Machines'
import Host from './Content/Host'

class Content extends React.Component {

    constructor(props){
        super(props)
    }

    renderSwitch(param){
        switch(param){
            case "machines":
                return <Machines />
            case "host":
                return <Host />
            default:
                return "Nothing"
        }
    }

    render(){
        return (
            <section id="page">
                <header>
                    <div className="column column--left"></div>
                    <div className="column column--right">
                        <ul>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faCog} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon className="icon" icon={faUser} />
                                    <span>Carlos</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
                <main>
                    <div id="content">
                        {
                            this.renderSwitch(this.props.module)
                        }
                    </div>
                    <div id="information">
                        <div className="column column--left">
                            <ul>
                                <li>
                                    <img src="/images/logo.png" alt="" />
                                    <p>VBox Frontend</p>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">News</a>
                                </li>
                            </ul>
                            
                        </div>
                        <div className="column column--right">
                            <p>Boxial Dashboard, 2021</p>
                        </div>
                    </div>
                </main>
            </section>
        )
    }

}

export default Content
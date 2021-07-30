import React from 'react'

import "../../Style/Modules/Mobile.scss"

class Mobile extends React.Component {

    render(){
        return (
            <section id="notSupported">
                <div className="row row--upper">
                    <h1>Sorry, mobile not yet supported</h1>
                </div>
                <div className="row row--lower">
                    <ul>
                        <li>
                            <a href="https://www.github.com/pomaretta/boxial" target="_blank" rel="noreferrer">
                                <p>GitHub</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://carlospomares.es" target="_blank" rel="noreferrer">
                                <p>Author</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }

}

export default Mobile
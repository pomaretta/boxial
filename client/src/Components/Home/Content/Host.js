import React from 'react'

import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import RadialSeparators from "../../Animation/RadialSeparators"
import ChangingProgressProvider from '../../Animation/ChangingProgressProvider'
import AnimatedProgressProvider from '../../Animation/AnimationProgressProvider'
import { easeQuadInOut } from 'd3-ease'

import 'animate.css'
import 'react-circular-progressbar/dist/styles.css';
import '../../../Style/Modules/Home/Content/Host.scss'

const InfoRow = (props) => {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.content}</td>
        </tr>
    )
}

class Information extends React.Component {

    render(){
        return (
            <div class="information">

            <table>
                <tbody>
                </tbody>
            </table>

            </div>
        )
    }

}

const MetrictsGroup = (props) => {
    return (
        <div className="group">
            <h3>{props.title}</h3>
            <div style={{ width: 150, height: 150    }}>
                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={props.value}
                    duration={1.6}
                    easingFunction={easeQuadInOut}
                >
                    {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <CircularProgressbarWithChildren 
                            value={value}
                            text={`${roundedValue}${props.character} ${props.spacing} ${props.max}${props.character}`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,
                            
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                            
                                // Text size
                                textSize: '8px',
                            
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                            
                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',
                            
                                // Colors
                                pathColor: `rgba(55, 0, 179,${props.value / 100})`,
                                textColor: '#6200EE',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3700B3',
                            })}                            
                        >
                            <RadialSeparators
                                count={12}
                                style={{
                                    background: "#fff",
                                    width: "2px",
                                    // This needs to be equal to props.strokeWidth
                                    height: `${10}%`
                                }}
                            />
                        </CircularProgressbarWithChildren>
                    );
                    }}
                </AnimatedProgressProvider>
            </div>
        </div>
    )
}

class Metricts extends React.Component {

    render(){
        return (
            <div className="metrics">
                
            </div>
        )
    }

}

class Tickers extends React.Component {

    constructor(props){

        super(props)

        this.state = {
            ping: new Date(),
            evt: '',
            tickers: 
        }

    }    

    render(){
        return (
            <div className="module" id="host">
                <Metricts />
                <Information />
            </div>
        )
    }

}

class Host extends React.Component {

    render(){
        return (
            <Tickers />
        )
    }

}

export default Host
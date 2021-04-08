import React from 'react'

import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import RadialSeparators from "../../Animation/RadialSeparators"
import ChangingProgressProvider from '../../Animation/ChangingProgressProvider'
import AnimatedProgressProvider from '../../Animation/AnimationProgressProvider'
import { easeQuadInOut } from 'd3-ease'

import 'animate.css'
import 'react-circular-progressbar/dist/styles.css';
import '../../../Style/Modules/Home/Content/Host.scss'

class Information extends React.Component {

    render(){
        return (
            <div class="information">

            <table>
                <tbody>
                    <tr>
                        <td>Hostname</td>
                        <td>PC Master Node</td>
                    </tr>
                    <tr>
                        <td>CPU</td>
                        <td>Intel i7-4790 3.6GHz 4C/8T</td>
                    </tr>
                    <tr>
                        <td>RAM Memory</td>
                        <td>32 GB 1600 MHz</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>480GB</td>
                    </tr>
                    <tr>
                        <td>Graphics</td>
                        <td>NVIDIA GeForce GTX 1050 Ti</td>
                    </tr>
                    <tr>
                        <td>System</td>
                        <td>Windows 10</td>
                    </tr>
                    <tr>
                        <td>Network</td>
                        <td>Wired, 172.18.45.183, 255.255.0.0</td>
                    </tr>
                </tbody>
            </table>

            </div>
        )
    }

}

class Metrics extends React.Component {

    render(){
        return (
            <div className="metrics">
                <div className="group">
                    <h3>CPU Usage</h3>
                    <div style={{ width: 150, height: 150    }}>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={100}
                            duration={1.6}
                            easingFunction={easeQuadInOut}
                        >
                            {value => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbarWithChildren 
                                    value={value}
                                    text={`${roundedValue}% / ${100}%`}
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
                                        pathColor: `rgba(55, 0, 179,${66 / 100})`,
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
                <div className="group">
                    <h3>RAM Usage</h3>
                    <div style={{ width: 150, height: 150    }}>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={100}
                            duration={1.6}
                            easingFunction={easeQuadInOut}
                        >
                            {value => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbarWithChildren 
                                    value={value}
                                    text={`${roundedValue}% / ${100}%`}
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
                                        pathColor: `rgba(55, 0, 179,${66 / 100})`,
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
                <div className="group">
                    <h3>Storage Usage</h3>
                    <div style={{ width: 150, height: 150    }}>
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={100}
                            duration={1.6}
                            easingFunction={easeQuadInOut}
                        >
                            {value => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbarWithChildren 
                                    value={value}
                                    text={`${roundedValue}% / ${100}%`}
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
                                        pathColor: `rgba(55, 0, 179,${66 / 100})`,
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
            </div>
        )
    }

}

class Tickers extends React.Component {

    render(){
        return (
            <div className="module" id="host">
                <Metrics />
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
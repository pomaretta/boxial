import React from 'react'

import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import RadialSeparators from "../../Animation/RadialSeparators"
import ChangingProgressProvider from '../../Animation/ChangingProgressProvider'
import AnimatedProgressProvider from '../../Animation/AnimationProgressProvider'
import { easeQuadInOut } from 'd3-ease'

import 'animate.css'
import 'react-circular-progressbar/dist/styles.css';
import '../../../Style/Modules/Home/Content/Host.scss'
import { realtimeURL, connection, refresh_delay } from './Host.helper';
import _ from 'lodash';

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
                    {/* SYSTEM */}
                    <InfoRow
                        title="System"
                        content={this.props.data.os ? this.props.data.os.distro : "Loading..."}
                    />
                    {/* CPU */}
                    <InfoRow 
                        title="CPU"
                        content={this.props.data.cpuInfo ? 
                            (
                                this.props.data.cpuInfo.manufacturer + " "
                                + this.props.data.cpuInfo.brand + " "
                                + this.props.data.cpuInfo.cores + "C/"
                                + this.props.data.cpuInfo.threads + "T "
                                + this.props.data.cpuInfo.speed + "GHz"
                            )
                            : "Loading..."
                        }
                    />
                    {/* RAM */}
                    <InfoRow 
                        title="RAM"
                        content={
                            this.props.data.ram ?
                            (
                                Math.round(((this.props.data.ram.total / 1024) / 1024) / 1024) + " GB"
                            )
                            : "Loading..."
                        }
                    />
                    {/* STORAGE */}
                    <InfoRow 
                        title="Storage"
                        content={
                            this.props.data.storage ?
                            (
                                this.props.data.storage[0].fs + " "
                                + Math.round(((this.props.data.storage[0].size / 1024) / 1024) / 1024) + "GB"
                            )
                            : "Loading..."
                        }
                    />
                    {/* GRAPHICS */}
                    <InfoRow 
                        title="Graphics Card"
                        content={
                            this.props.data.graphics ?
                            (
                                this.props.data.graphics.controllers[0].model + " "
                                + this.props.data.graphics.controllers[0].vram + "MB"
                            )
                            : "Loading..."
                        }
                    />
                    {/* NETWORK */}
                    <InfoRow 
                        title="Network"
                        content={
                            this.props.data.network ?
                            (
                                this.props.data.network[0].type + " "
                                + this.props.data.network[0].ip4 + " "
                                + this.props.data.network[0].ip4subnet
                            )
                            : "Loading..."
                        }
                    />

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
                            maxValue={props.max}
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
                                // pathColor: `rgba(55, 0, 179,${props.value / 100})`,
                                pathColor: '#6200EE',
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
                <MetrictsGroup
                    title="CPU USAGE"
                    value={this.props.data.cpu ? this.props.data.cpu.currentLoad : 0}
                    character={"%"}
                    spacing={"/"}
                    max={100}
                />
                <MetrictsGroup
                    title="RAM USAGE"                    
                    value={this.props.data.ram ? (this.props.data.ram.used * 100 / this.props.data.ram.total) : 0}
                    character={"%"}
                    spacing={"/"}
                    max={this.props.data.ram ? 100 : 100}
                />
                <MetrictsGroup 

                    title="STORAGE USAGE"

                    value={this.props.data.storage ? (this.props.data.storage[0].used * 100 / this.props.data.storage[0].size) : 0}
                    character={"%"}
                    spacing={"/"}
                    max={this.props.data.storage ? 100 : 100}

                />
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
            tickers: [],
            metrics: []
        }

    }    

    getMetricsData = () => {
        connection.get('/api/system/metrics')
        .then(res => {

            let now = new Date().getTime()
            let tickers = res.data
            let diff = null

            _.each(tickers, (t) => {
                diff = (now - new Date(t._changed).getTime()) / 1000;
                if(diff < 10) {
                    t.isChanged = true;
                } else {
                    t.isChanged = false;
                }
            })

            this.setState({
                metrics: tickers
            })

        })
    }

    getTickerData = () => {
        connection.get('/api/system/info')
        .then(res => {
            let now = new Date().getTime()
            let tickers = res.data
            let diff = null

            _.each(tickers, (t) => {
                diff = (now - new Date(t._changed).getTime()) / 1000;
                if(diff < 10) {
                    t.isChanged = true;
                } else {
                    t.isChanged = false;
                }
            })

            this.setState({
                tickers: tickers
            })

        })
    }

    componentDidMount(){

        this.eventSource = new EventSource(realtimeURL)

        console.log("---- HOST MODULE ----")
        this.getTickerData()

        this.interval = setInterval(() => {
            this.getMetricsData()
        },refresh_delay)

        this.eventSource.onmessage = (e) => {
            this.setState({
                ping: new Date()
            })
        }

    }

    componentWillUnmount(){
        this.eventSource = null
        this.interval = null
    }

    render(){
        return (
            <div className="module" id="host">
                <Metricts data={this.state.metrics} />
                <Information data={this.state.tickers} />
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
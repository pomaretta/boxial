import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../../Style/Modules/Home/Content/Machines.scss"

import _ from 'lodash'
import { refresh_delay, realtimeURL, connection } from './Machines.helper.js'
import axios from 'axios'

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
                            <a onClick={props.state ? props.stop : props.run}>{
                                props.state
                                ? "Poweroff"
                                : "Start" 
                            }</a>
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

class Tickers extends React.Component {

    constructor(props){
        super(props)

        this.machines = null

        this.state = {
            ping: new Date(),
            evt: '',
            tickers: []
        }

        this.eventSource = new EventSource(realtimeURL)

    }

    getTickerData = () => {

        connection.get('/api/machines/list')
        .then(res => {
            let now = new Date().getTime()
            let tickers = res.data
            let diff = null

            _.each(tickers, (t) => {
                diff = (now - new Date(t._changed).getTime()) / 1000;
                if (diff < 10) {
                    t.isChanged = true;
                } else {
                    t.isChanged = false;
                }
            })

            this.orderItems(this.state.tickers)

            this.setState({
                tickers: this.orderItems(tickers)
            });

        })
    }

    componentDidMount(){
        console.log("Start client");
        this.getTickerData()

        setInterval(() => {
            this.getTickerData()
        },refresh_delay)

        this.eventSource.onmessage = (e) => {
            this.setState({
                ping: new Date()
            })
        }

    }

    orderItems(array){
        var i, j, temp;
        for(i = 0; i < array.length; i++){
            for(j = 0; j < array.length-i-1; j++){
                if(this.compareMachine(array[j],array[j+1]) == -1){
                    temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        return array
    }

    compareMachine(a,b){
        return (a.index < b.index) ? -1 : (a.index > b.index) ? 1 : 0;
    }

    render(){
        return (
            <ul className="list">
                {
                    this.state.tickers.map((machine) => {
                        return <Machine
                            key={machine.vm}
                            system={String(machine.os).toLowerCase().includes("windows")}
                            name={machine.name}
                            state={machine.state}
                            uuid={machine.vm}
                            os={machine.os}
                            net={machine.ip}
                            use="To implement"
                            run={() => {this.props.start(machine.vm)}}
                            stop={() => {this.props.stop(machine.vm)}}
                        />
                    })
                }
            </ul>
        )
    }

}

class Machines extends React.Component {

    constructor(props){
        super(props)

        this.startMachine = this.startMachine.bind(this)
        this.stopMachine = this.stopMachine.bind(this)

    }

    componentDidMount(){

    }

    startMachine(machine){
        let result = false;
        axios.get(`http://localhost:8000/api/machines/${machine}/run/hl`)
        .then(
            result = true
        )
        return result
    }

    stopMachine(machine){
        let result = false;
        axios.get(`http://localhost:8000/api/machines/${machine}/stop`)
        .then(
            result = true
        )
        return result
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
                <Tickers start={this.startMachine} stop={this.stopMachine} />
            </div>
        )
    }

}

export default Machines
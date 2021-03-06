import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import "../../../Style/Modules/Home/Content/Machines.scss"

import _ from 'lodash'
import { refresh_delay, realtimeURL, connection } from './Machines.helper.js'
import axios from 'axios'

class StopOption extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            option: true,
            active: false
        }

        this.changeOption = this.changeOption.bind(this)
        this.toggle = this.toggle.bind(this)

    }

    changeOption = (props) => {
        switch (props){
            case "stop":
                this.setState({
                    option: true,
                    active: false
                })
                break
            case "poweroff":
                this.setState({
                    option: false,
                    active: false
                })
                break
        }
        
    }

    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render(){
        return(
            <button className="toggler warning" onClick={this.toggle}>
                <FontAwesomeIcon icon={faPowerOff} />
                <FontAwesomeIcon icon={faCaretDown} className="icon" />
                <ul className={["dropdown", this.state.active ? "" : "collapse"].join(" ")}>
                    <li onClick={() => {this.changeOption("stop");this.props.onClick(true)}}>
                        <a>Stop</a>
                    </li>
                    <li onClick={() => {this.changeOption("poweroff");this.props.onClick(false)}}>
                        <a>Poweroff</a>
                    </li>
                </ul>
            </button>
        )
    }

}

class Machine extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            actualState: this.props.state,
            tickState: this.props.state,
            loading: false
        }

        this.chooseSystem = this.chooseSystem.bind(this)
        this.executeUpdate = this.executeUpdate.bind(this)
        this.executeStop = this.executeStop.bind(this)

    }

    chooseSystem(system){
        if(system.includes("windows")){
            return "/images/windows.png";
        } else if(system.includes("linux")){
            return "/images/linux.png";
        } else if(system.includes("darwin")){
            return "/images/apple.png";
        } else {
            return "/images/windows.png";
        }
    }

    executeUpdate(flag){

        this.setState({
            tickState: !this.props.state,
            loading: true
        })

        if(this.props.state){
            this.executeStop(flag)
        } else {
            this.props.run()
        }

    }

    executeStop(flag){
        if(flag){
            this.props.stop()
        } else {
            this.props.powerOff()
        }
    }

    componentDidUpdate(){

        if(this.state.loading && this.state.tickState == this.props.state){
            this.setState({
                loading: false
            })
        }

    }

    render(){
        return (
        <li>
            <div className={["loader",this.state.loading ? "active" : ""].join(" ")}>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <img src={this.chooseSystem(this.props.system)} className="systemImage" alt="System Image" />
            <div className="machine">
                <div className="row row--upper">
                    <div className="column column--left">
                        <h3>
                            {this.props.name}
                        </h3>
                    </div>
                    <div className="column column--right">
                        <p>
                            Active 
                            <span>
                                {this.props.state ? "????" : "????"}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="row row--lower">
                    <div className="group">
                        <p>UUID: {this.props.uuid}</p>
                    </div>
                    <div className="group">
                        <p>OS: {this.props.os}</p>
                    </div>
                    <div className="group">
                        <p>IP: {this.props.net}</p>
                    </div>
                    <div className="group controls">
                        <div className="column column--left">
                            {
                                this.props.state
                                ? <StopOption onClick={this.executeUpdate}  />
                                : <a onClick={() => this.executeUpdate(false)} className={this.props.state ? "warning" : ""} >Start</a>
                            }
                            
                        </div>
                        <div className="column column--right">
                            {/* <a href="#" className="warning">Delete</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </li>
        )
    }
}

class Tickers extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            ping: new Date(),
            evt: '',
            tickers: []
        }

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
            
            this.setState({
                tickers: this.orderItems(tickers)
            });

        })
    }

    componentDidMount(){

        this.eventSource = new EventSource(realtimeURL)

        console.log("---- MACHINES MODULE ----");
        this.getTickerData()

        this.interval = setInterval(() => {   
            this.getTickerData()
        },refresh_delay)

        this.eventSource.onmessage = (e) => {
            this.setState({
                ping: new Date()
            })
        }

    }

    componentWillUnmount(){
        this.eventSource.close()
        this.interval = null
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
                            system={String(machine.os).toLowerCase()}
                            name={machine.name}
                            state={machine.state}
                            uuid={machine.vm}
                            os={machine.os}
                            net={machine.ip}
                            use="To implement"
                            run={() => {this.props.start(machine.vm)}}
                            stop={() => {this.props.stop(machine.vm)}}
                            powerOff={() => {this.props.powerOff(machine.vm)}}
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
        this.powerOffMachine = this.powerOffMachine.bind(this)

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

    powerOffMachine(machine){
        let result = false;
        axios.get(`http://localhost:8000/api/machines/${machine}/poweroff`)
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
                <Tickers start={this.startMachine} stop={this.stopMachine} powerOff={this.powerOffMachine} />
            </div>
        )
    }

}

export default Machines
/* 

    VirtualBox API

    VERSION: 1.0

*/

// IMPORTS

import { Router } from 'express'
import axios from 'axios'
import virtualbox from 'virtualbox'

// INIT

const vbox = Router()

/* 

    GET

*/

// MACHINES

vbox.get('/api/machines/list', (req,res) => {
    virtualbox.list((machines,error) => {
        if(error) res.sendStatus(404)
        res.json(machines)
    })
})

// MACHINE

// IP
vbox.get('/api/machines/:id/ip',(req,res) => {
    let options = {
        vm: req.params.id,
        key: '/VirtualBox/GuestInfo/Net/0/V4/IP'
    }
    virtualbox.guestproperty.get(options,(value,error) => {
        if(error) throw error
        res.json({
            vm: req.params.id,
            ip: value
        })
    })
})

// OS
vbox.get('/api/machines/:id/os',(req,res) => {
    let options = {
        vm: req.params.id,
        key: '/VirtualBox/GuestInfo/OS/Product'
    }
    virtualbox.guestproperty.get(options,(value,error) => {
        if(error) throw error
        res.json({
            vm: req.params.id,
            os: value
        })
    })
})

// NAME
vbox.get('/api/machines/:id/name',(req,res) => {
    let vm = req.params.id
    virtualbox.list((machines,error) => {
        Object.entries(machines).forEach(([key,value]) => {
            if(vm == key){
                res.json({
                    vm: vm,
                    name: value.name,
                })
            }
        })
    })
})

// STATE
vbox.get('/api/machines/:id/state',(req,res) => {
    let vm = req.params.id
    virtualbox.list((machines,error) => {
        Object.entries(machines).forEach(([key,value]) => {
            if(vm == key){
                res.json({
                    vm: vm,
                    state: value.running,
                })
            }
        })
    })
})

// INFO
vbox.get('/api/machines/:id/info',async (req,res) => {

    let vm = req.params.id
    let name = await axios.get(`http://localhost:8000/api/machines/${vm}/name`)
    let os = await axios.get(`http://localhost:8000/api/machines/${vm}/os`)
    let state = await axios.get(`http://localhost:8000/api/machines/${vm}/state`)
    let ip = null
    
    if(state.data.state){
        ip = await axios.get(`http://localhost:8000/api/machines/${vm}/ip`)
        ip = ip.data.ip
    }

    res.json({
        vm: vm,
        name: name.data.name,
        os: os.data.os,
        ip: ip,
        state: state.data.state
    })
    
})

/* 

    POST

*/



/* 

    FUNCTIONALITIES

    -- LIST VMACHINES
    -- GET MACHINE BASIC INFO
        - NAME
        - OS
        - IP
        - STATE

*/

export default vbox
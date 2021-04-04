/* 

    VirtualBox API

    VERSION: 1.0

*/

// IMPORTS

import { Router } from 'express'
import axios from 'axios'
import virtualbox from 'virtualbox'
import options from '../../options.js'

// INIT

const vbox = Router()

const route = options.API.VIRTUALBOX.PREFIX + options.API.VIRTUALBOX.MACHINES.PREFIX
const api = options.API.VIRTUALBOX.MACHINES
const machine = options.API.VIRTUALBOX.MACHINES.MACHINE
const machinePrefix = route + machine.PREFIX

/* 

    GET

*/

// REALTIME
vbox.get((options.API.VIRTUALBOX.PREFIX + options.API.VIRTUALBOX.REALTIME), async (req,res) => {
    console.log('Got /realtime');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Emit', ++count);
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${count}\n\n`);
    }
})

// MACHINES

vbox.get((route + api.LIST), (req,res) => {
    let data = []
    virtualbox.list((machines,error) => {
        Object.entries(machines).forEach(async ([key,value]) => {
            let r = await axios.get(`http://localhost:8000/api/machines/${key}/info`)
            data.push(r.data)
            if(data.length == Object.entries(machines).length){
                res.json(data)
            }
        })
    })
})

// MACHINE

// IP
vbox.get((machinePrefix + machine.IP),(req,res) => {
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
vbox.get((machinePrefix + machine.OS),(req,res) => {
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
vbox.get((machinePrefix + machine.NAME),(req,res) => {
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
vbox.get((machinePrefix + machine.STATE),(req,res) => {
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
vbox.get((machinePrefix + machine.INFO),async (req,res) => {

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

// CONTROLS
vbox.get((machinePrefix + machine.RUN.GR), (req,res) => {

    let vm = req.params.id

    virtualbox.start(vm,true, (error) => {
        if(error) res.json({vm: vm, error: true})
        res.json({
            vm: vm,
            error: false
        })
    })

})

vbox.get((machinePrefix + machine.RUN.HL), (req,res) => {

    let vm = req.params.id

    virtualbox.start(vm, false, (error) => {
        if(error) res.json({vm: vm, status: "error"})
        res.json({
            vm: vm,
            status: "booting"
        })
    })

})

vbox.get((machinePrefix + machine.STOP.SV), (req,res) => {

    let vm = req.params.id

    virtualbox.stop(vm, (error) => {
        if(error) res.json({
            vm: vm,
            status: "error"
        })
        res.json({
            vm: vm,
            status: "saving state"
        })
    })

})

vbox.get((machinePrefix + machine.STOP.PO), (req,res) => {

    let vm = req.params.id

    virtualbox.poweroff(vm, (error) => {
        if(error) res.json({
            vm: vm,
            status: "error"
        })
        res.json({
            vm: vm,
            status: "poweroff"
        })
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
    -- RUN MACHINE
        - GRAPHICAL (GR)
        - HEADLESS (HL)
    -- STOP MACHINE
        - SAVE STATE (SV)
        - POWEROFF (PO)

*/

export default vbox
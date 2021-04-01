/* 

    VirtualBox API

    VERSION: 1.0

*/

// IMPORTS

import { Router } from 'express'
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

vbox.get('/api/machines/:id/ip',(req,res) => {
    
    let options = {
        vm: req.params.id,
        key: '/VirtualBox/GuestInfo/Net/0/V4/IP'
    }

    virtualbox.guestproperty.get(options,(value,error) => {
        if(error) throw error
        res.json(value)
    })
    
})

/* 

    POST

*/



/* 

    FUNCTIONALITIES

    -- LIST VMACHINES

*/

export default vbox
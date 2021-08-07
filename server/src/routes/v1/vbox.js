/*
    VIRTUALBOX API
    V0.1
*/

/*

    FUNCTIONALITIES

    -- LIST VMACHINES

    -- GET MACHINE BASIC INFO
        - NAME
        - OS
        -- IP
            - IP
            - NETMASK
        - STATE
    
    -- RUN MACHINE
        - GRAPHICAL (GR)
        - HEADLESS (HL)
    
    -- STOP MACHINE
        - SAVE STATE (SV)
        - POWEROFF (PO)

*/

import { Router } from 'express'
import virtualbox from 'virtualbox'

// INITIALIZE

const api = Router()

// REALTIME

api.get('/api/v1/vbox/realtime', async (req, res) => {

    // Set headers
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    res.flushHeaders()

    // Setup retry time
    res.write('retry: 15000\n')

    let count = 0
    while(true) {
        await new Promise(resolve => setTimeout(resolve, 5000))
        res.write(`data: ${count}\n`)
        count++
    }

})

// LIST CALLS

// GET CALLS

// POST CALLS

export default api
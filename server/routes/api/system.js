/* 

    System API

    VERSION: 1.0

*/

// IMPORTS

import { Router } from 'express'
import axios from 'axios'
import systemInformation from 'systeminformation'
import options from '../../options.js'

// INIT

const system = Router()

/* 

    GET

*/

// REALTIME
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.REALTIME), async (req,res) => {
    
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
      // Emit an SSE that contains the current 'count' as a string
      res.write(`data: ${count}\n\n`);
    }

})

// RAW DATA

// OS
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.RAW.PREFIX + options.API.SYSTEM.RAW.OS), (req,res) => {
    systemInformation.osInfo().then(data => res.json(data))
})

// CPU
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.RAW.PREFIX + options.API.SYSTEM.RAW.CPU), (req,res) => {
    systemInformation.cpu().then(data => res.json(data))
})

// HOSTNAME
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.HOSTNAME), (req,res) => {
    systemInformation.osInfo().then(data => res.json(data.hostname))
})

// CPU INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.CPU.DEFAULT), (req,res) => {
    systemInformation.cpu().then(data => {

        let info = {
            manufacturer: data.manufacturer,
            brand: data.brand,
            speed: data.speed,
            cores: data.cores,
            threads: data.cores,
        }

        res.json(info)

    })
})

// RAM INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.RAM.DEFAULT), (req,res) => {
    res.sendStatus(200)
})

// STORAGE INFO


// GRAPHICS INFO


// SYSTEM INFO


// NETWORK INFO


/* 

    POST

*/



/* 

    FUNCTIONALITIES

*/

export default system
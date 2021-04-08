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

// CPU USAGE
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.CPU.PREFIX + options.API.SYSTEM.CPU.USAGE), (req,res) => {
    systemInformation.currentLoad().then(data => res.json(data))
})

// RAM INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.RAM), (req,res) => {
    systemInformation.mem().then(data =>
        res.json(data)
    )
})

// STORAGE INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.STORAGE), (req,res) => {
    systemInformation.fsSize().then(data => res.json(data))
})

// GRAPHICS INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.GRAPHICS), (req,res) => {
    systemInformation.graphics().then(data => res.json(data))
})

// NETWORK INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.NETWORK), (req,res) => {
    systemInformation.networkInterfaces().then(data => res.json(data))
})

// OVERALL INFO
system.get((options.API.SYSTEM.PREFIX + options.API.SYSTEM.INFO), async (req, res) => {

    // CPU LOAD
    let cpu = await axios.get(`http://localhost:8000/api/system/cpu/usage`)

    // RAM DATA
    let ram = await axios.get(`http://localhost:8000/api/system/ram`)

    // STORAGE
    let storage = await axios.get('http://localhost:8000/api/system/storage')

    // GRAPHICS
    let graphics = await axios.get('http://localhost:8000/api/system/graphics')

    // NETWORK
    let network = await axios.get('http://localhost:8000/api/system/network')

    // OS
    let os = await axios.get('http://localhost:8000/api/system/raw/os')

    res.json({
        os: os.data,
        cpu: cpu.data,
        ram: ram.data,
        storage: storage.data,
        graphics: graphics.data,
        network: network.data
    })
})

/* 

    POST

*/



/* 

    FUNCTIONALITIES

    -- RAW DATA
        - OS
        - CPU
    - CPU LOAD
    - MAIN MEMORY METRICS
    - STORAGE INFORMATION
    - GRAPHICS INFORMATION
    - NETWORK STATUS

    -- ALL INFO

*/

export default system
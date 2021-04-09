import axios from 'axios'

const refresh_delay = 5000

let connection = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: ''
})

const realtimeURL= 'http://localhost:8000/api/realtime'

export { refresh_delay, connection, realtimeURL }
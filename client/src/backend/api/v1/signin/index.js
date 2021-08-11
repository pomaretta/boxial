/*
    SIGN IN API
*/

import { Router } from 'express'

const api = Router()

api.get('/', (req, res) => {
    res.sendStatus(200)
})

export default api
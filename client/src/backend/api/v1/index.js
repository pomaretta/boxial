/*
    AUTH API V1
*/

import { Router } from 'express'

/*

    Basic functionalities of this API

    - Authorize an user to perfom action.
    - Return user API Keys after being successfully authenticated.
    - Perform login of an user.
    - Allow to create an user with an administrator role.

*/

const api = Router()

// Test entrypoint
api.get('/', (req, res) => {
    res.sendStatus(200)
})

// SIGNIN Routes

import sigin from './signin/index.js'
api.use('/signin', sigin)

// SIGNUP Routes

import signup from './signup/index.js'
api.use('/signup', signup)

export default api
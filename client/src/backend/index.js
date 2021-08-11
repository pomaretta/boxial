// ======================== //
// BOXIAL CLIENT BACKEND    //
// ======================== //

import app from './components/app.js'

// ======================== //
// ROUTES                   //
// ======================== //

import api from './api/v1/index.js'
app.use('/v1',api)

// LISTEN TO PORT
app.listen(
    3000 | process.env.NODE_PORT
    , () => {
        console.log(`Boxial Server listening on port ${3000 | process.env.NODE_PORT}`)
    }
)
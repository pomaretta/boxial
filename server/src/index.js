// ======================== //
// BOXIAL SERVER            //
// ======================== //

import app from './components/app.js'

// ROUTES



// LISTEN TO PORT
app.listen(
    8000 | process.env.NODE_PORT
    , () => {
        console.log(`Boxial Server listening on port ${8000 | process.env.NODE_PORT}`)
    }
)
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

const application = express();

// ======================== //
// MIDDLEWARES              //
// ======================== //

application.use(express.urlencoded({extended: true}))
application.use(express.json())
application.use(cors())
application.use(helmet())
application.use(compression())

// ======================== //
// DEFAULT ROUTES           //
// ======================== //

application.get('/ping', (req, res) => {
    res.sendStatus(200)
})

export default application
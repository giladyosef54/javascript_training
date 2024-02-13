import express from 'express';
import router from './server/crud_username'
import { ensureUserExistence } from './client/client_requests'
import {Logger} from 'tslog'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/', router)



app.listen(port, () => {
    const logger = new Logger({
        minLevel: 3
    })
    logger.info(`Server running at http://localhost:${port}`);
    ensureUserExistence('asda', 'sadadsa')
});




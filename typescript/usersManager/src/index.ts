import express, { Request, Response } from 'express';
import router from './server/crud_username'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/', router)



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

import { Router, Request, Response } from 'express';
import { Username } from '../models/username';

const router = Router();
let usernames: Username[] = [];

router.post('/', (req: Request, res: Response) => {
    const userIndex: number = usernames.findIndex((un) => un.username == req.body.username)
    if (userIndex == -1) {
        const username: Username = {
            username: req.body.username,
            password: req.body.password
        };
        usernames.push(username);
        res.status(201).json();
    }
    else if (usernames[userIndex].password == req.body.password) {
        res.status(200).send('username and password matches.')
    }
    else {
        res.status(404).send('username didn\'match password')
    }
});
  

export default router;

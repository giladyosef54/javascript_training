import { Router, Request, Response } from 'express';
import { Username } from '../models/username';

const router = Router();
let usernames: Username[] = [];

router.post('/saveUsersData', (req: Request, res: Response) => {
    for (let userData of req.body.users) {
        const username: Username = {
            username: userData.username,
            password: userData.password
        };
        usernames.push(username);
    }
    res.status(201).send('successfully saved');
});
  

export default router;

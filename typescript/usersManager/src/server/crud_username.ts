import { Router, Request, Response } from 'express';
import { Username } from '../models/username';

const router = Router();
let users: Username[] = [];

router.post('/saveUsersData', (req: Request, res: Response) => {
    for (let userData of req.body.users) {
        const username: Username = {
            username: userData.username,
            password: userData.password
        };
        users.push(username);
    }
    res.status(201).send('successfully saved');
});


router.get('/getUserDetails/:username', (req: Request, res: Response) => {
    const user = users.find((user => user.username == req.params.username))
    if (user) res.status(200).json(user)
    else res.status(404).send('username not found')
})


const un: Username = {
    username: 'josef',
    password: '31'
};
users.push(un);

export default router;

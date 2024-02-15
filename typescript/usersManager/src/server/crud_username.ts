import { Router, Request, Response } from 'express';
import { Username, massageResponse } from '../models/types';

const router = Router();
let users: Username[] = [];




router.post('/saveUsersData', (req: Request, res: Response) => {
    let status: number = 201
    let massage: string = 'Successfully saved.'
    for (let userData of req.body.users) {
        const newUser: Username = {
            username: userData.username,
            password: userData.password
        };
        if (users.find((user => user.username = newUser.username)))
        {
            status = 207
            massage = 'Some of the users were already exist, and were not re-saved.'
        }
        else users.push(newUser);
    }
    res.status(status).send(massage);
});


router.post('/saveOneUserData', (req: Request, res: Response) => {
    const resParams = tryPushUser(req.body.username, req.body.password)
    
    res.status(resParams.status).send(resParams.massage);
});


const tryPushUser = (username: string, password: string): massageResponse => {
    let status: number
    let massage: string
    
    if (users.find((user => user.username = username)))
    {
        status = 409
        massage = 'User already exist, data wasn\'t saved.'
    }
    else {
        const newUser: Username = {
            username: username,
            password: password
        };
        status = 201
        massage = 'Successfully saved.'
        users.push(newUser);
    }
    const res: massageResponse = {
        status: status,
        massage: massage
    }
    return res
}


router.get('/getUserDetails/:username', (req: Request, res: Response) => {
    const user = users.find((user => user.username == req.params.username))
    if (user) res.status(200).json(user)
    else res.status(404).send('username not found')
})


router.get('/getAllUsersDetails', (req: Request, res: Response) => {
    res.status(200).json(users)
})



export default router;

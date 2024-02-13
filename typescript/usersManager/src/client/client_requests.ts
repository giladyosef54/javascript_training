import axios, { AxiosResponse } from 'axios'
import { Username } from '../models/username'
import {Logger} from 'tslog'


export const ensureUserExistence = (username: string, password: string, baseUrl: string = 'http://localhost:3000/',
        getUserRoute: string = 'getUserDetails/', saveUserRoute: string = 'saveOneUserData') => {
    const logger = new Logger({
        minLevel: 3
    })

    axios.get(baseUrl + getUserRoute + username).then((res: AxiosResponse) => {
        if (res.data.password == password) logger.info('Passwords match')
        else console.info('Passwords weren\'t match')
    }).catch((err) => {
        if (err.response.status == 404) {
            logger.info(err.response.data)
            const newUser: Username = {
                username: username,
                password: password
            }
            logger.info('Create new user.')
            axios.post(baseUrl + saveUserRoute, newUser).catch((err) => {
                if (err.response.status == 409) {
                    logger.info(err.response.data)
                    logger.info('Apparently the username saved in another thread.')
                }
            })
        }
    })
}


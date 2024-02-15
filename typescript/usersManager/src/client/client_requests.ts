import axios, { AxiosResponse } from 'axios'
import { Username } from '../models/username'
import {Logger} from 'tslog'


export const ensureUserExistence = (username: string, password: string, baseUrl: string = 'http://localhost:3000/',
        getUserRoute: string = 'getAllUsersDetails/', saveUserRoute: string = 'saveOneUserData') => {
    const logger = new Logger({
        minLevel: 3
    })

    axios.get(baseUrl + getUserRoute).then((res: AxiosResponse) => {
        const user = res.data.find((user: Username) => user.username == username)
         if (user === undefined) {
            const newUser: Username = {
                username: username,
                password: password
            }
            logger.info('Create new user.')
            axios.post(baseUrl + saveUserRoute, newUser).catch((err) => {
                if (err.response.status == 409) {
                    logger.error(err.response.data)
                    logger.error('Apparently the username saved in another thread.')
                }
            })
        }
        else if (user.password == password) logger.info('Passwords match')
        else logger.info('Passwords weren\'t match')
    })
}


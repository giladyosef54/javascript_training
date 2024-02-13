import axios, { AxiosResponse } from 'axios'
import { Username } from '../models/username'


export const ensureUserExistence = (username: string, password: string, baseUrl: string = 'http://localhost:3000/',
        getUserRoute: string = 'getUserDetails/', saveUserRoute: string = 'saveOneUserData') => {
    axios.get(baseUrl + getUserRoute + username).then((res: AxiosResponse) => {
        if (res.data.password == password) console.log('Passwords match')
        else console.log('Passwords weren\'t match')
    }).catch((err) => {
        console.log('get func failed')
        if (err.response.status == 404) {
            const newUser: Username = {
                username: username,
                password: password
            }
            axios.post(baseUrl + saveUserRoute, newUser).catch((err) => {
                if (err.response.status == 409) {
                    console.log(err.response.data)
                    console.log('Apparently the username saved in another thread.')
                }
            })
        }
    })
}


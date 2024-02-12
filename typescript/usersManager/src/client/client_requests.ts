import axios, { AxiosResponse } from 'axios'
import { Username } from '../models/username'

const ensureUserExistence = (username: string, password: string, baseUrl: string = 'http://localhost:3000/',
        getUserRoute: string = 'getUserDetails/', saveUserRoute: string = 'saveUsersData') => {
    axios.get(baseUrl + getUserRoute + username).then((res: AxiosResponse) => {
        if (res.status == 404) {
            const newUser: Username = {
                username: username,
                password: password
            }
            axios.post(baseUrl + saveUserRoute, newUser)
        }
    })
}
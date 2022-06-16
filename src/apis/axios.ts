import axios from 'axios'

export const baseUrl = 'https://api.themoviedb.org/3'
export const instance = axios.create({
    baseURL: baseUrl
})

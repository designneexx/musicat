import axios from 'axios'

export const RAPID_API_HOST = process.env.RAPID_API_HOST as string
export const DEEZER_API_URL = process.env.RAPID_API_URL as string
export const RAPID_API_KEY = process.env.RAPID_API_KEY as string

export const deezerClient = axios.create({
  baseURL: DEEZER_API_URL,
  headers: {
    'Content-type': 'application/json',
    'X-RapidAPI-Host': RAPID_API_HOST,
    'X-RapidAPI-Key': RAPID_API_KEY,
  },
})

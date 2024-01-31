import axios from 'axios';

export const cryptoApi = axios.create({
    baseURL: process.env.CRYPRO_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${process.env.CRYPTO_API_KEY}`
    }
})
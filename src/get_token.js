const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const code = process.env.CODE;;

const getToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    console.log(response.data);
};

getToken().then(data => console.log(data)).catch(err => console.error(err));
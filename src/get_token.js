const axios = require('axios');
const querystring = require('querystring');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:8888';
const code = 'AUTHORIZATION_CODE_FROM_URL';

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
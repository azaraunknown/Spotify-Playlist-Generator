const axios = require('axios');
require('dotenv').config();

const accessToken = process.env.CLIENT_AUTHORIZATION;
const userId = process.env.CLIENT_ID;

const playlistName = 'Playlist #2';

const tracks = [
    "Song Name #1 - Author",
    "Song Name #2 - Author",
    "Song Name #3 - Author",
    "Song Name #4 - Author",
    // .......
  ];
  


const createPlaylist = async (userId, playlistName) => {
    const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            name: playlistName,
            public: false,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data.id;
};

const searchTrack = async (track) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(track)}&type=track&limit=1`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.tracks.items[0]?.uri;
};

const addTracksToPlaylist = async (playlistId, trackUris) => {
    await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            uris: trackUris,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
};

const main = async () => {
    try {
        const playlistId = await createPlaylist(userId, playlistName);
        const trackUrisPromises = tracks.map(track => searchTrack(track));
        const trackUris = await Promise.all(trackUrisPromises);
        const validTrackUris = trackUris.filter(uri => uri);
        await addTracksToPlaylist(playlistId, validTrackUris);
        console.log('Playlist created successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};

main();

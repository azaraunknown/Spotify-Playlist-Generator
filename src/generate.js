const axios = require('axios');
require('dotenv').config();

const accessToken = process.env.ACCESS_TOKEN;
const userId = process.env.USER_ID;

const playlistName = 'PLAYLIST_NAME';

const tracks = [
    "Burn It Down - Linkin Park",
    "The Trooper - Iron Maiden",
    "Bulls on Parade - Rage Against The Machine",
    "I Will Not Bow - Breaking Benjamin",
    "Hail to the King - Avenged Sevenfold",
    "War Pigs - Black Sabbath",
    "Re-Education (Through Labor) - Rise Against",
    "You're Going Down - Sick Puppies",
    "Awake and Alive - Skillet",
    "The Hand That Feeds - Nine Inch Nails",
    "Click Click Boom - Saliva",
    "Sick of It - Skillet",
    "Burn It to the Ground - Nickelback",
    "Youth of the Nation - P.O.D.",
    "Monster - Skillet",
    "Second Chance - Shinedown",
    "No One Knows - Queens of the Stone Age",
    "Rebel Yell - Billy Idol",
    "Renegades of Funk - Rage Against The Machine",
    "Bleed for Me - Saliva",
    "Tears Don't Fall - Bullet For My Valentine",
    "Not Strong Enough - Apocalyptica",
    "Aerials - System Of A Down",
    "One - Metallica",
    "Afterlife - Avenged Sevenfold",
    "The Kill (Bury Me) - Thirty Seconds To Mars",
    "Firestarter - The Prodigy",
    "Thunder Kiss '65 - White Zombie",
    "Dragula - Rob Zombie",
    "More Human than Human - White Zombie",
    "Enter Sandman - Metallica",
    "Livin' on the Edge - Aerosmith",
    "Electric Eye - Judas Priest",
    "Faint - Linkin Park",
    "Toxicity - System Of A Down",
    "B.Y.O.B. - System Of A Down",
    "Numb - Linkin Park",
    "The Fight Song - Marilyn Manson",
    "Dead Memories - Slipknot",
    "King of the Stereo - Saliva",
    "Save Yourself - Stabbing Westward",
    "No Leaf Clover - Metallica",
    "Sonne - Rammstein",
    "Du Hast - Rammstein",
    "Ich Will - Rammstein",
    "Feuer Frei! - Rammstein",
    "Bodies - Drowning Pool",
    "Alive - P.O.D.",
    "Boom - P.O.D.",
    "Psycho - Puddle of Mudd"
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

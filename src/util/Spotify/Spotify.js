const clientId = process.env.REACT_APP_SPOTIFYCLIENTID;
const redirectURI = process.env.REACT_APP_SPOTIFYREDIRECTURI;

let userAccessToken = '';
const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        let accessToken = window.location.href.match(/access_token=([^&]*)/);
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (accessToken && expiresIn) {
            userAccessToken = accessToken[1];
            const expirationTime = Number(expiresIn[1]);
            window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        let accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs })
                    });
                });
            });
    }
};

export default Spotify;
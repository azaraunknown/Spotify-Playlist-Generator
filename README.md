# Spotify Playlist Generator

This project takes an array of song names and authors, automatically locates the songs on Spotify, and creates a playlist for you.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/azaraunknown/Spotify-Playlist-Generator.git
    cd Spotify-Playlist-Generator
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

## Setup

1. Create a Spotify Developer account and register your application to get your `client_id` and `client_secret`. Follow these steps:
    - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
    - Click on "Create an App" and fill in the required details.
    - Note down your `client_id` and `client_secret`.
    - Add a Redirect URI (`http://localhost:8888`) in the app settings.

2. Create a `.env` file in the root directory of the project with the following content:
    ```plaintext
    ACCESS_TOKEN=your_access_token_here
    USER_ID=your_user_id_here
    CLIENT_ID=your_application_id_here
    CLIENT_SECRET=your_client_secret_here
    REDIRECT_URI=http://localhost:8888
    CODE=your_authorization_code_here
    ```

3. Generate the initial access token and refresh token:
    - Construct the authorization URL:
      ```plaintext
      https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:8888&scope=playlist-modify-private%20playlist-modify-public
      ```
    - Open this URL in a browser, authorize the app, and copy the `code` parameter from the redirected URL.
    - Use the script located in get_token to exchange the authorization code for an access token and refresh token:
    - This is placed in the .env in the CODE slot.

## Usage

1. Run the script to create and populate the playlist:
    ```bash
    node index.js
    ```

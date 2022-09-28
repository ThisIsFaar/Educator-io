# Tele-Crit

Manage/Share a list of the TV shows/Movies watched
DEMO LINK: https://tele-crit.herokuapp.com/
[![S7Ai0P.md.png](https://iili.io/S7Ai0P.md.png)](https://freeimage.host/i/S7Ai0P)

## Screenshots

[![S5RpJn.md.png](https://iili.io/S5RpJn.md.png)](https://freeimage.host/i/S5RpJn)
[![S5RsxR.md.png](https://iili.io/S5RsxR.md.png)](https://freeimage.host/i/S5RsxR)
[![S5RtfI.md.png](https://iili.io/S5RtfI.md.png)](https://freeimage.host/i/S5RtfI)
[![S5R6OJ.md.png](https://iili.io/S5R6OJ.md.png)](https://freeimage.host/i/S5R6OJ)

## How to Deploy and run the service

<details>
<summary>Manually install with NPM and all...</summary>

First, clone the repo and go to root of repo

```bash
git clone https://github.com/ThisIsFaar/TeleCrit.git
cd TeleCrit
```

First complete the server mandatory steps

1. move to server folder and install server dependancy

```bash
cd server
npm install
```

2. create a file with name ".env"
3. In .env file add required env variables
4. MONGODB_URI=<your_mongodb_atlas_db_uri>
5. SECRET=<'a_secret_string'>
6. PORT=<a_free_port_for_server>
7. start the server

```
npm start
```

Complete the Client mandatory steps

1. move to client folder(from the root of repo) and install server dependancy

```bash
cd client
npm install
```

2. create a file with name ".env"
3. In .env file add required env variable
4. REACT_APP_API_URL=<http://localhost:<your_server_port>/api>
5. start the server

```
npm start
```

Client will be started on 3000 port by default, access directly on your browser with

```
localhost:3000
```

</details>

<details>
<summary>With Docker images...</summary>

Clone repo and add env variables from 1st procedure

then simply run commands in terminal from root of project

```
    docker-compose build
    docker-compose up
```

Done, open app in your broswer with url:

```
    localhost:3000
```

</details>

### Features Checklist

- [x] Users can add a new show to the list with the following information
  - Title - Name of the show
  - Streaming App : Streaming Platform where the user has watched the show (example - Netflix)
  - Rating : Users should be able to **star rate** the show.
  - Review : Users should be able to add a review of that show
  - Publish Mode : Public / Private
- [x] Users can add or delete a show from the list.
- [x] Users can update any of the TV series related data ( eg: streaming app, rating, review)
- [x] APIs are validate with JWT token before allowing access to the caller.
- [x] Prettier and Linter configuration
- [x] React state is managed by Redux-Toolkit 

## Authors

- [@ThisIsfaar](https://www.github.com/thisisfaar)

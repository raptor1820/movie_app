# Movie App

This is a web app built with React + Express, that displays movies present in a JSON database in `/backend` to the user. Users can view individual movie details, sort by genre and even add, update and delete movies.

## Setup

In `/backend` create a copy of `movies_data_locked.json` called `movies_data.json`. This is the working copy of the DB.

### If using Bun

In a terminal window cd into `/backend` and run the following command

`bun install`

Once completed you can run the server normally using
`bun run dev`. The backend server will be active on port 3000.

Now in a separate terminal window cd into `/frontend` and run `bun install` again. To run use `bun run dev`. The frontend should run on port 5173 or as shown in the terminal window.

### If using Node

In a terminal window cd into `/backend` and run `npm install`. Now go to `package.json` and edit the `dev` script to `node index.js`. Now run `npm run dev` to start ther server on port 3000.

in a separate terminal window cd into `/frontend` and run `npm install` again. To run use `npm run dev`. The frontend should run on port 5173 or as shown in the terminal window.

# Agenda

This project is a monorepo built with [Turborepo](https://turbo.build/). To run all apps from the `apps folder` run:

```bash
npm run dev
```

> You can also execute the above command inside each app folder to run them separately.

## Client
Built with [Vite](https://vitejs.dev/) and TypeScript.

## Server
Built with Node.js, TypeScript, [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Environment Variables
You need to create a `.env` file in each app:

- Server: Place it inside `root` folder with the following variables:
    - *PORT*: The port where the server will be listening. E.g. `8000`
    - *MONGODB_URI*: The URI to connect to MongoDB. E.g. `mongodb://<user>:<password>@<host>/<db>?<options>`
    - *CLIENT_URL*: The base url of the client app. E.g. `http://localhost:5173`
- Client: Place it inside `src` folder with the following variables:
    - *VITE_API_URL*: The base url of the server app. E.g. `http://localhost:<PORT_OF_SERVER_APP>`

> **Tip**: If you want to use [json-server](https://www.npmjs.com/package/json-server) as a mock server with the file _db.json_, you can use `http://localhost:3000/people` as *VITE_API_URL* and run the corresponding npm script in another terminal inside the client folder.

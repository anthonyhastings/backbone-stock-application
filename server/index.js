// Loading dependencies.
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dummyData from './data';

/**
 * Creates an ExpressJS API server.
 *
 * @param {Number} port - The port to bind the server to.
 * @return {Object} - Returns the app and the server instance.
 */
function createServer(port = 4000) {
    // Instantiating the framework and a router for our requests.
    let app = express(),
        router = express.Router();  // eslint-disable-line

    // Adding middleare to parse incoming request bodies.
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Associate the router with our application.
    app.use('/', router);

    // Hosting the dist folder as a static directory of files.
    app.use('/dist', express.static('dist'));

    // Handler for all requests. Responses are given CORS headers.
    router.use((request, response, next) => {
        console.log('Request:', request.method.toUpperCase(), request.originalUrl);
        response.header('Access-Control-Allow-Origin', '*');
        next();
    });

    // Route: Homepage.
    router.get('^/$', (request, response) => {
        response.sendFile(path.join(`${__dirname}/../index.html`));
    });

    // Route: Stock collection endpoint.
    router.get('/api/stock', (request, response) => {
        response.type('application/json');
        response.send(JSON.stringify(dummyData));
    });

    // Route: Adding a stock item.
    router.post('/api/stock', (request, response) => {
        let lastID = dummyData[dummyData.length - 1].id;
        let nextID = lastID + 1;

        request.body.id = nextID;
        dummyData.push(request.body);

        response.type('application/json');
        response.send(JSON.stringify(request.body));
    });

    // Debugging to the console that the server has started.
    console.log(`Mock Server: http://localhost:${port}/`);

    // Returns a server instance that starts listening for the routes above.
    return {
        app: app,
        server: app.listen(port),
        baseUrl: `http://localhost:${port}`
    };
}

createServer();

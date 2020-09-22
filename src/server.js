const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;



const urlStruct = {

    'GET': {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getStyle,
        '/notReal': jsonHandler.notReal,
        '/getUsers': jsonHandler.getUsers,
        //'/updateUser': jsonHandler.updateUser,
        notFound: jsonHandler.notFound,
    },
    'HEAD': {
        '/getUsers': jsonHandler.getUsersMeta,
        '/notReal': jsonHandler.notRealMeta,
        notFound: jsonHandler.notFoundMeta,
    },
};



const handlePost = (request, response, parsedURL) => {

    if (parsedURL.pathname === '/addUser') {
        const body = []

        request.on('error', (err) => {
            console.dir(err);
            response.statusCode = 400;
            response.end();
        });

        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            const bodyString = Buffer.concat(body).toString();
            const bodyParams = query.parse(bodyString);
            jsonHandler.addUser(request, response, bodyParams)
        });
    }
};



const handleGet = (request, response, parsedURL) => {
    const params = query.parse(parsedURL.query);

    if (urlStruct[request.method][parsedURL.pathname]) {
        urlStruct[request.method][parsedURL.pathname](request, response, params);
    } else {
        urlStruct[request.method].notFound(request, response);
    }
};



const onRequest = (request, response) => {

    const parsedURL = url.parse(request.url);
    console.dir(parsedURL.pathname);
    console.dir(request.method); //GET or HEAD

    if (request.method === 'POST') {
        handlePost(request, response, parsedURL);
    } else {
        handleGet(request, response, parsedURL);
    }
};



http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

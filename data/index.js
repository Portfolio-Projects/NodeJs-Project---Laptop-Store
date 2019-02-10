
const fs = require('fs');
const http = require('http');
const url = require('url');
const json = fs.readFileSync(`${__dirname}/data.json`, `utf-8`);
const laptopData = JSON.parse(json);




const server = http.createServer( (req, res) => {
   const pathName = url.parse(req.url, true).pathName;
   const id = url.parse(req.url, true).query.id;
   console.log(pathName);
   console.log(id);

    if( req.url === `/products?id=${id}` && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(`Welcome to PRODUCTS page with id ${id}!`);
    }
    else if( req.url  === `/laptop?id=${id}` && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end('Welcome to LAPTOP page!');
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL not FOUND!');
    }



});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
})


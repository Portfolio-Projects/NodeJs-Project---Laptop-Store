
// *************************************
//  IMPORTING PACKAGES from NODE.JS
// *************************************
const fs = require('fs');
const http = require('http');
const url = require('url');
const json = fs.readFileSync(`${__dirname}/data.json`, `utf-8`);
const laptopData = JSON.parse(json);



//creating a server
const server = http.createServer( (req, res) => {
   const pathName = url.parse(req.url, true).pathName;
   let imgPath = `${__dirname}/data/img${pathName}`;
   console.log(imgPath);

   const id = url.parse(req.url, true).query.id;

    
// PRODUCT OVERVIEW
    if( req.url === `/products`|| req.url === `/`) {
        res.writeHead(200, { 'Content-type': 'text/html'});

        fs.readFile(`../templates/overview.html`, 'utf-8', (err, data) => {

            let overviewOutput = data; 
            
            fs.readFile(`../templates/cards.html`, 'utf-8', (err, data) => {
            
            const cardsOutput = laptopData.map( el => replaceTemplate(data, el)).join('');
            overviewOutput = overviewOutput.replace(/{%CARDS%}/g, cardsOutput); 
               
            res.end(overviewOutput);
            });

        });
    }
    // LAPTOP DETAILS
    else if( req.url  === `/laptop?id=${id}`) {
        res.writeHead(200, { 'Content-type': 'text/html'});

        fs.readFile(`../templates/laptop.html`, 'utf-8', (err, data) => {

            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop) 
            res.end(output);

        });
    }
    else if( (/\.(jpg|jpeg|png|gif)$/i).test(req.url)){
        let imgPath = `${__dirname}/img${req.url}`;
    
        fs.readFile(imgPath, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg'});
            res.end(data);
        });

    }
    // URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL not FOUND!');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
})

// REFACTORING 
function replaceTemplate(originalHTML, laptop) {
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%id%}/g, laptop.id);
    return output;
}
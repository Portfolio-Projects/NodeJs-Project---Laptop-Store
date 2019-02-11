
// *************************************
//  IMPORTING PACKAGES from NODE.JS
// *************************************
//Example of reading a file system in node js;
// we give the variable name the same name as the package
const fs = require('fs');
// calling http node package and storing into the variable with the same name
const http = require('http');
const url = require('url');


// *************************************
//  Using the PACKAGES imported
// *************************************

// reading the local file
// here we are using the sync version of file read since it is ok and will run only 1 time when we start our app:
const json = fs.readFileSync(`${__dirname}/data.json`, `utf-8`);
const laptopData = JSON.parse(json);
// console.log(laptopData);


//creating a server
const server = http.createServer( (req, res) => {
  //reading the path name from the req argument: 
  //using the url module to parse the url into an object 
  //      and extracting the pathname from the newly created object 
   const pathName = url.parse(req.url, true).pathName;
   let imgPath = `${__dirname}/data/img${pathName}`;
   console.log(imgPath);

   const id = url.parse(req.url, true).query.id;
//    console.log(pathName);
//    console.log(id);
    
// PRODUCT OVERVIEW
    if( req.url === `/products`|| req.url === `/`) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        // res.end(`Welcome to PRODUCTS page with id ${id}!`);

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
            // sends the response back to the browser:
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


// Classes in ES6 
// class Car {
    
//     // properties attached to your class via constructor;
//     constructor(brand, model, year) {
//         this.brand = brand;
//         this.model= model;
//         this.year = year;
//     }
// // Methods which provides functionality to your class
// displayCarInfo() {
//     console.log(`${this.brand} ${this.model} ${this.year}`);
// }

// }

// const modelBWV = new Car('BMW', 'SPEED', 2015);
// const modelLambourghini = new Car('LAMBOURGHINI', 'LUX', 2017);

// modelBWV.displayCarInfo();
// modelLambourghini.displayCarInfo();

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
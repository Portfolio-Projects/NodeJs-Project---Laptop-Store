
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
const json = fs.readFileSync(`${__dirname}/data.json`, `utf-8`);
const laptopData = JSON.parse(json);



//creating a server
const server = http.createServer( (req, res) => {
  //reading the path name from the req argument: 
  //using the url module to parse the url into an object 
  //      and extracting the pathname from the newly created object 
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


// Classes in ES6 
class Car {
    
    // properties attached to your class via constructor;
    constructor(brand, model, year) {
        this.brand = brand;
        this.model= model;
        this.year = year;
    }
// Methods which provides functionality to your class
displayCarInfo() {
    console.log(`${this.brand} ${this.model} ${this.year}`);
}

}

const modelBWV = new Car('BMW', 'SPEED', 2015);
const modelLambourghini = new Car('LAMBOURGHINI', 'LUX', 2017);

modelBWV.displayCarInfo();
modelLambourghini.displayCarInfo();





//console.log(__dirname);
//console.log(laptopData)
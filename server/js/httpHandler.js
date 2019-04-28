const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
var {dequeue} = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);

  if(req.method === 'GET' ){
    if(req.url === '/'){
      var command = dequeue();
      if(command) {
        res.write(command);
      }
    }
    if(req.url === '/background.jpg'){
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if(err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
        next();
      });
    }
  }
  if(req.method === 'POST' && req.url === '/background.jpg') {
    var body = Buffer.alloc(0);
    req.on('data', (chunk) => {
      body = Buffer.concat([body, chunk]);
    });

    req.on('end', () => {
      res.writeHead(201, headers);  
      res.end();
      next();
    })
  }
  
  res.end();
};

//OLD FUNCTION
function randomCommand() {
  //init commands array
  var commands = ['up', 'down', 'left', 'right'];
  //get randomNum between 0 and 3
  var randomIndex = Math.floor(Math.random() * commands.length);
  //return random value in commands array
  return commands[randomIndex];
}
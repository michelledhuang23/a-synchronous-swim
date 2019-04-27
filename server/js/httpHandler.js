const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
var {dequeue} = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);

  switch(req.method){
    case 'GET':
      var command = dequeue();
      if(command) {
        res.write(command);
      }
      break;
    case 'POST':
      break;
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
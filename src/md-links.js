const fs = require('fs');
const path = require('path')
const marked = require('marked');
chalk = require('chalk');
const fileHound = require('filehound');


//const fetch = require('node-fetch');
//const fetchUrl = fetch.fetchUrl


const readFile = (path) => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      else {
        const renderer = new marked.Renderer();
        renderer.link = function(href, title, text) {
          links.push({
            href: href,
            text: text,
            file: path
          });
        };
        marked(data, {renderer: renderer})
        resolve(links);
      };

    })
  })
}


/* const readdir = (path) => {
 fs.readdir(argvLine, function(err,files){
  if(err){
    console.log(err)
  }
  files = fileHound.create()
  .paths(argvLine)
  .ext('md')
  .find();

files
.then(console.log);
}) 
} */

module.exports = {
  readFile,
  };
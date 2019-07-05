#!/usr/bin/env node
const mdLinks = require('./src/md-links');
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const log = console.log

let argvLine = process.argv[2]


if (!path.isAbsolute(argvLine)){
  argvLine = (path.resolve(argvLine))
}

 
const checkPath = (argvLine) => {
  return new Promise((resolve, reject) => {
    fs.lstat(argvLine, (error, content) => {
      if (error){
        reject(error);
      }else {
        
        resolve(content);
        
      }
    })
  })
}

if(process.argv[3]==="--validate"){
  mdLinks.mdLinks(process.argv[2],{validate:true})
    .then((links) => {
     console.log(links)
    })
    .catch(console.error);
}
else if(process.argv[3]==="--stats"){
  mdLinks.mdLinks(process.argv[2])
    .then(links => {
      let Stats=mdLinks.stats(links);
      console.log(`Total: ${Stats.linksTotal}`);
      console.log(`Unique: ${Stats.linksUnique}`);
    })
    .catch(console.error);
  }else {
    mdLinks.mdLinks(process.argv[2])
      .then(links => {
       console.log(links)
      })
      .catch(console.error);
}


/* mdLinks.stats(argvLine, options).
then ()
.catch () */


  
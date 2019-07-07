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

 
if(process.argv[3]==="--validate"){
  mdLinks.mdLinks(process.argv[2],{validate:true})
    .then((links) => {
     console.log(links)
    })
    .catch (error => {
      log('hele3')
    });
      
}
else if(process.argv[3]=== "--stats"){
  mdLinks.mdLinks(process.argv[2])
  .then(links => {
    let stats =mdLinks.linkStats(links);
    log(chalk.yellow.bold('Tus resultados son los siguientes:'));
    log((chalk.red.bold(`Total Links: ${stats.linksTotal}`)));
    log((chalk.red.bold(`Unique Links: ${stats.linksUnique}`)));
  })
  .catch (error => {
    log(error)
  });

} else {
    mdLinks.mdLinks(process.argv[2])
    .then(links => {
      console.log(links)
    })
    .catch(console.error);
  }


/* mdLinks.stats(argvLine, options).
then ()
.catch () */



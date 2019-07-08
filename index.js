#!/usr/bin/env node
const mdLinks = require('./src/md-links');
//const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const log = console.log

let argvLine = process.argv[2]


if (!path.isAbsolute(argvLine)){
  argvLine = (path.resolve(argvLine))
}

if ((process.argv[3]==="--validate" && process.argv[4]==="--stats") || 
  (process.argv[3]==="--stats" && process.argv[4]==="--validate")){

  mdLinks.mdLinks(process.argv[2])
  .then(links => {
    let validateStats = mdLinks.linkStats(links);
    log ('Tu resultado es el siguiente:')
    log(`Total: ${validateStats.linksTotal}`);
    log(`Unique: ${validateStats.linksUnique}`);
    log(`Broken: ${validateStats.linksBroken}`)
  })
  .catch(err => {
    log(err)
  });
      
}
else if(process.argv[3]=== "--stats"){
  mdLinks.mdLinks(process.argv[2])
  .then(links => {
    let stats =mdLinks.linkStats(links);
    log(chalk.yellow.bold('Tus resultados son los siguientes:'));
    log(chalk.red.bold(`Total Links: ${stats.linksTotal}`));
    log(chalk.red.bold(`Unique Links: ${stats.linksUnique}`));
  })
  .catch (err => {
    log(err)
  });

} else if (process.argv[3]==="--validate"){
  mdLinks.mdLinks(process.argv[2],{validate:true})
    .then((links) => {
     log(links)
    })
    .catch (err => {
      log(err)
    });


} else {
    mdLinks.mdLinks(process.argv[2])
    .then(links => {
      log(links)
    })
    .catch (err =>{
      log (err)
    });
  }


/* mdLinks.stats(argvLine, options).
then ()
.catch () */
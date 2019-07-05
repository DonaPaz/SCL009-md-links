#!/usr/bin/env node
const mdLinks = require('./src/md-links');
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const log = console.log

let argvLine = process.argv[2]



if (!path.isAbsolute(argvLine)){
  let absolutePath = (path.resolve(argvLine))
} else {
  return argvLine
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

// const MDLinks = (argvLine, options) => {

//   if (process.argv[3].includes ('--stats')){
//    options.stats = true;
    
//   log(options)
      
//       }

//     }

//checkPath (argvLine)
mdLinks.readFile(argvLine) 
  .then (resolve => {
    log(chalk.blue.bold('Los links encontrados son los siguientes:'));
    log(resolve)
  })

  .catch (error => {
    log(chalk.red.bold('Debes ingresar un archivo Markdown válido, Ej. "markdown.md"'))
  })

  
  
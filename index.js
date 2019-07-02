const mdLinks = require('./mdLinks.js');
const fs = require('fs');
//const path = require('path')
const chalk = require('chalk');

let argvLine = process.argv[2]
// if (!path.isAbsolute(argvLine)){
//   console.log(path.resolve(argvLine))
// }
// else {
//   return argvLine
// }
 
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
    

//checkPath (argvLine)
mdLinks.readFile(argvLine) 
  .then (resolve => {
    console.log(resolve);
  })

  .catch (error => {
    console.log(chalk.red.bold('Debes ingresar un archivo Markdown válido, Ej. "markdown.md"'))
  })


  
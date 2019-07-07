const fs = require('fs');
const path = require('path')
const marked = require('marked');
chalk = require('chalk');
const fileHound = require('filehound');
const fetch = require('node-fetch');

log = console.log
//const fetchUrl = fetch.fetchUrl

// const mdLinks = (argvLine, options) => {

//   if (process.argv[3].includes ('--stats')){
//    options.stats = true;
    
//   log(options)
      
//       }

//     }

const mdLinks = (path, options) => {
  if(options && options.validate){
    
    return new Promise((resolve,reject)=>{
      readdir(path)
      .then((paths) => {
        Promise.all(paths.map((directory) => {
          return searchFile(directory)
        }))
        .then(links => { 
          Promise.all(links.map((searchFile) => {
            return validateLinks(searchFile)
          }))
          .then(validateLinks => {
            resolve(validateLinks)
          })});                    
      })
      .catch (() => {
        readFile(path)
        .then(links => {
          resolve(validateLinks(links)); 
        })
      })
    })
  }
  else{
    return new Promise((resolve, reject)=>{
      readdir(path)
      .then(res => {
        resolve (Promise.all(res.map(file => {
          return readFile(file) 
        })))
      })
      .catch(()=>{                   
        resolve(readFile(path));
      })
             
    })
  }
}

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) {
        //reject(err);
        log(chalk.red.bold('Debes ingresar un archivo o carpeta válido, Ej. "markdown.md", "src" "src/readme.md'))
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
/* readFile(argvLine) 
  .then (resolve => {
    log(chalk.blue.bold('Los links encontrados son los siguientes:'));
    log(resolve)
  })

  .catch (error => {
    log(chalk.red.bold('Debes ingresar un archivo Markdown válido, Ej. "markdown.md"'))
  log(error)
  }) */
  const readdir = (argvLine) => {
    return  fileHound.create()
   .paths(argvLine)
   .ext('md')
   .find();
 }  
 


const linkStats = (links) =>{
  let href = []
    let response = {};
  href = links.map (res =>{
    return res.href;
  })
  response.linksTotal = href.length;
  let hrefSet = new Set(href)
  
  response.linksUnique = hrefSet.size;
  return response
}


const validateLinks = (links) => {
  return Promise.all(links.map(link => {
    return new Promise((resolve, reject) => {
      fetch(link.href)
        .then(res => {
          if(res) {
            link.status = res.status;
            link.statusTxt = 'ok';
            resolve(link);
          }
        })
        .catch(err => {
          link.status = null;
          link.statusTxt = 'fail';
          resolve(link);
        });
    });
  }));
};


module.exports = {
  readFile,
  readdir,
  linkStats,
  mdLinks
  };
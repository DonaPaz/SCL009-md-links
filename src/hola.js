/* const fs = require("fs");

let path = "/path/to/something"; 

fs.lstat(path, (err, stats) => { if(err) return console.log(err); //Handle error 
    console.log(`Is file: ${stats.isFile()}`); 
    console.log(`Is directory: ${stats.isDirectory()}`); 
})


if(process.argv[3]==="--stats"){
    mdLinks.mdLinks(process.argv[2])
      .then((links) => {
        let Stats=mdLinks.stats(links);
        console.log(`Total: ${Stats.linksTotal}`);
        console.log(`Unique: ${Stats.linkSingle}`);
      })
      .catch(console.error);
    }else {
      mdLinks.mdLinks(process.argv[2])
        .then((links) => {
         console.log(links)
        })
.catch(console.error())}



let options = {};
if (process.argv.includes('--validate')) options.validate = true;
if (process.argv.includes('--stats')) options.stats = true;
mdLinks(path.join(process.cwd(), args[0]), options).then((links) => {
  let result = '';
  let successCounter = 0;
  let failCounter = 0;
  links.map(element => {
    fetch(element.href)
      .then(res => {
        if (options.validate) {
          result = (`${element.file}: ${element.line} - ${colors.magenta(element.href)} - ${element.text} ${colors.green(res.status)} ${colors.green(res.ok)}`);
        } else {
          result = (`${colors.grey(element.file)}: ${colors.grey(element.line)} - ${colors.cyan(element.href)} - ${element.text}`);
        }
        if (options.stats) {
          if (res.ok === true) {
            successCounter++;
          } else if (res.ok === false) {
            failCounter++;
          }
          stats = (`${colors.cyan('totals: ')} ${colors.cyan(links.filter(link => link.href).length)}, ${colors.green('success: ')} ${colors.green(successCounter)}, ${colors.red('failed: ')} ${colors.red(failCounter)}`);
        }
        console.log(result);
        if (options.stats) console.log(stats);
        console.log(colors.green('hello'));
      })
      .catch(err => {
        console.error(err);
      });
  });
}).catch((err) => {
  console.error(err);
});


if (options.stats){
  stats = (`${colors.cyan('totals: ')} ${colors.cyan(links.filter(link => link.href).length)}, ${colors.green('success: ')} ${colors.green(successCounter)}, ${colors.red('failed: ')} ${colors.red(failCounter)}`); */
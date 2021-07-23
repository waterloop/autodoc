import { readFiles } from "./utils.mjs";
import { generateHtmlForFiles } from "./html-generator";
import * as path from 'path';
import * as fs from 'fs';

// console.log(process.argv); //gets the path that you put after the command
// console.log(process.cwd());  //gets the current working directory where you call the command

function main() {
  let pathName = path.join(process.cwd(), process.argv[2]);
  // let pathToWriteTo = path.join(process.cwd(),'/autodoc');
  // console.log(pathToWriteTo);

  let content = readFiles(pathName);
  // console.log(content);
  
  let html = generateHtmlForFiles(content, pathName);
  // console.log(html);

  if (!fs.existsSync('./autodocHTML')){
    fs.mkdirSync('./autodocHTML');
  }

  fs.writeFileSync('./autodocHTML/index.html', html);


}

main(); //note that this can't be open when we have tests, should I just have another file for this?

//node --experimental-modules --es-module-specifier-resolution=node ./src/index.mjs src/testing
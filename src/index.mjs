import { readFiles } from "./utils.mjs";
import { generateHtmlForFiles } from "./html-generator";
import * as path from 'path';
import * as fs from 'fs';

function main() {
  let pathName = path.join(process.cwd(), process.argv[2]);

  let content = readFiles(pathName);

  let html = generateHtmlForFiles(content, pathName);

  if (!fs.existsSync('./autodocHTML')) {
    fs.mkdirSync('./autodocHTML');
  }

  fs.writeFileSync('./autodocHTML/index.html', html);


}

main();

//node --experimental-modules --es-module-specifier-resolution=node ./src/index.mjs src/testing
//for refresher, check console.log(process.cwd()) and process.argv[2] 
import * as fs from 'fs';
import * as path from 'path';

//to preface, in order for this file to be called, it needs to be a module, and we cant use that in the .json because it causes issues with testing
//with .mjs, __dirname does not work out of the box and I have to use the following code:

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//--------------------- FUNCTIONS FOR READING ALL FILES ------------------------------------------------------------------------------=--------------------------------------------------=

export function readFiles(dirname) { //figuring out how to access all the files in the directorye
  let descriptors = [];

  //dirname = path.resolve('./src/testing/') + '/'; //need to convert the relative path to the absolute path, but will the autodoc program be inthe actual codebase?

  let fileNames = fs.readdirSync(dirname, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });

  fileNames.forEach((filename) => {
    let fileContent = fs.readFileSync(dirname + filename, 'utf-8');

    let content = fileContent.split('\n')

    content = content.filter((paragraph) => !(paragraph.startsWith('//') || paragraph.startsWith('\r')))
      .map(paragraph => paragraph.replace('\r', ''))

    let parsedContent = parseLinesOfCode(content); //because parseLinesOfCode returns an array with an object inside, appending all objects inside to the descriptors to make it cleaner

    for (let i = 0; i < parsedContent.length; i++) {
      descriptors.push(parsedContent[i]);
    }
  })

  return (descriptors);

}

//---------------------------------------------------------------------------------------------------=--------------------------------------------------------------------------------=



//--------------------- FUNCTIONS FOR READING SINGULAR FILES (Please note, that this no longer has any purpose besides testing, but this was a required building block to get everything to work)------------------------------------------------------------------------------=--------------------------------------------------=

function fileContent(pathName) {
  return fs.readFileSync(path.join(__dirname, pathName), 'utf-8');

}

export function parseFileContent(path) {

  return fileContent(path)
    .split('\n')
    .filter((lineOfCode) => !(lineOfCode.startsWith('//') || lineOfCode.startsWith('\r')))
    .map(lineOfCode => lineOfCode.replace('\r', ''))

}

export function getFilePath(filePath) {
  let newFilePath = path.resolve(filePath); //I really need to determine how this will function 

  //issue with resolve, it makes the path /autodocs/testing/..., it ignores the /src directory 

  newFilePath = newFilePath.substring(newFilePath.indexOf("testing"), newFilePath.length).replace(/\\/g, '/');
  // newFilePath = newFilePath.substring(newFilePath.indexOf("testing"),newFilePath.length).replace(/\\/g, '/'); //will need to determine what to show/what folder (most likely cms-backend?)
  return newFilePath;
}

//--------------------------------------------------=--------------------------------------------------=--------------------------------------------------=


//--------------------- ALGORITHM FOR PARSING TEST FILES ------------------------------------------------------------------------------=--------------------------------------------------=

export function parseLinesOfCode(linesOfCode) {
  // console.log(linesOfCode);
  //keep track of brackets beforehand, and the matching brackets (valid parentheses for square brackets)
  let openBracketsArr = []; //does this even need to be an array?
  let parsedLinesOfCode = [];

  let numIts = 0;
  let numDescribes = 0;
  try {
    for (let i = 0; i < linesOfCode.length; i++) {

      if (linesOfCode[i].includes("describe(")) { //if describe is there, then it will take the descriptor after the index of 
        numIts = 0; //reset number of it descriptors

        //if describe it will check length of openBracketsArr to see how many square brackets it's inside, if it's inside one, then that means that its a secondary descriptor
        if (openBracketsArr.length == 0) {

          numDescribes = 0; //numDescribes resets to 0 for new object in array to reset counter for secondaryDescriptors

          parsedLinesOfCode.push({}); //will append a new object which will contain primaryDescriptor property, secondaryDescriptor property, etc.

          parsedLinesOfCode[openBracketsArr.length].mainDescriptor = linesOfCode[i].substring(linesOfCode[i].indexOf("describe") + 10, linesOfCode[i].lastIndexOf("'")) //appends the string to the mainDescriptor property

        } else if (openBracketsArr.length > 0) {

          numDescribes += 1; //numDescribes increases, this refers to the amount of secondaryDescriptors for each mainDescriptor

          if (parsedLinesOfCode[openBracketsArr.length - 1]["secondaryDescriptors"]) {

            parsedLinesOfCode[openBracketsArr.length - 1].secondaryDescriptors.push({ name: linesOfCode[i].substring(linesOfCode[i].indexOf("describe") + 10, linesOfCode[i].lastIndexOf("'")) })

          }

          else {

            parsedLinesOfCode[openBracketsArr.length - 1]["secondaryDescriptors"] = [{ name: linesOfCode[i].substring(linesOfCode[i].indexOf("describe") + 10, linesOfCode[i].lastIndexOf("'")) }] //adds secondaryDescriptor property

          }
          //openBracketsArr keeps track of which primaryDescriptor/main test we're on.
        }
      }

      else if (linesOfCode[i].includes("it(")) {

        numIts += 1;

        if (parsedLinesOfCode[openBracketsArr.length - 2]["secondaryDescriptors"][numDescribes - 1]["it"]) {

          // console.log(parsedLinesOfCode[openBracketsArr.length - 2]["secondaryDescriptors"][numDescribes - 1].it)
          parsedLinesOfCode[openBracketsArr.length - 2]["secondaryDescriptors"][numDescribes - 1].it.push(linesOfCode[i].substring(linesOfCode[i].indexOf("it") + 4, linesOfCode[i].lastIndexOf("'")))

        } else {
          parsedLinesOfCode[openBracketsArr.length - 2]["secondaryDescriptors"][numDescribes - 1]["it"] = [linesOfCode[i].substring(linesOfCode[i].indexOf("it") + 4, linesOfCode[i].lastIndexOf("'"))];
        }

      }

      if (linesOfCode[i].includes("{") && linesOfCode[i].includes("}")) {

      } else if (linesOfCode[i].includes("{")) { //keeps track of square brackets to keep track of what are primary and secondary descriptors
        openBracketsArr = [...openBracketsArr, "{"];
      } else if (linesOfCode[i].includes("}")) {
        openBracketsArr.pop()
      }

    }
  } catch (err) {
    console.log(err);
  }

  if (openBracketsArr.length != 0) { //if openBracketsArr.length is not 0, this means that it's reading a faulty test file
    parsedLinesOfCode = []; //will reset it to 0
  }

  return parsedLinesOfCode;

}

// function main() {
//   console.log(process.argv);
// }


// main();
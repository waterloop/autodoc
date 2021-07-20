import * as fs from 'fs';
import * as path from 'path';


//--------------------- FUNCTIONS FOR READING ALL FILES ------------------------------------------------------------------------------=--------------------------------------------------=

export function readFiles(dirname) { //figuring out how to access all the files in the directorye
  let descriptors = [];

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

    let parsedContent = parseParagraphs(content); //because parseParagraphs returns an array with an object inside, appending all objects inside to the descriptors to make it cleaner

    for (let i = 0; i < parsedContent.length; i++) {
      descriptors.push(parsedContent[i]);
    }
  })

  return (descriptors);

}

//---------------------------------------------------------------------------------------------------=--------------------------------------------------------------------------------=



//--------------------- FUNCTIONS FOR READING SINGULAR FILES (Please note, that this no longer has any purpose, but this was a required building block to get everything to work)------------------------------------------------------------------------------=--------------------------------------------------=

function fileContent(pathName) {
  return fs.readFileSync(path.join(__dirname, pathName), 'utf-8');

} //will have to run this program inside the 

export function parseFileContent(path) {

  return fileContent(path)
    .split('\n')
    .filter((paragraph) => !(paragraph.startsWith('//') || paragraph.startsWith('\r')))
    .map(paragraph => paragraph.replace('\r', ''))

}

export function getFilePath(filePath) {
  let newFilePath = path.resolve(filePath); //I really need to determine how this will function 

  //issue with resolve, it makes the path /autodocs/testing/..., it ignores the /src directory 

  newFilePath = newFilePath.substring(newFilePath.indexOf("testing"), newFilePath.length).replace(/\\/g, '/');
  // newFilePath = newFilePath.substring(newFilePath.indexOf("testing"),newFilePath.length).replace(/\\/g, '/'); //will need to determine what to show/what folder (most likely cms-backend?)
  return newFilePath;
}

//--------------------------------------------------=--------------------------------------------------=--------------------------------------------------=


export function parseParagraphs(paragraphs) {
  // console.log(paragraphs);
  //keep track of brackets beforehand, and the matching brackets (valid parentheses for square brackets)
  let openArr = [];
  let parsedParagraphs = [];

  let numIts = 0;
  let numDescribes = 0;
  try {
    for (let i = 0; i < paragraphs.length; i++) {

      if (paragraphs[i].includes("describe(")) { //if describe is there, then it will take the descriptor after the index of 
        numIts = 0; //reset numIts counter

        //if describe it will check length of openArr to see how many square brackets it's inside, if it's inside one, then that means that its a secondary descriptor
        if (openArr.length == 0) {

          numDescribes = 0; //numDescribes resets to 0 for new object in array to reset counter for secondaryDescriptors

          parsedParagraphs.push({}); //will append a new object which will contain primaryDescriptor property, secondaryDescriptor property, etc.

          parsedParagraphs[openArr.length].mainDescriptor = paragraphs[i].substring(paragraphs[i].indexOf("describe") + 10, paragraphs[i].lastIndexOf("'")) //appends the string to the mainDescriptor property

        } else if (openArr.length > 0) {

          numDescribes += 1; //numDescribes increases, this refers to the amount of secondaryDescriptors for each mainDescriptor

          if (parsedParagraphs[openArr.length - 1]["secondaryDescriptors"]) {

            parsedParagraphs[openArr.length - 1].secondaryDescriptors.push({ name: paragraphs[i].substring(paragraphs[i].indexOf("describe") + 10, paragraphs[i].lastIndexOf("'")) })

          }
          else {

            parsedParagraphs[openArr.length - 1]["secondaryDescriptors"] = [{ name: paragraphs[i].substring(paragraphs[i].indexOf("describe") + 10, paragraphs[i].lastIndexOf("'")) }] //adds secondaryDescriptor property

          }
          //openArr keeps track of which primaryDescriptor/main test we're on.
        }
      }

      else if (paragraphs[i].includes("it(")) {

        numIts += 1; //need to be able to handle multiple it statements for each describe

        if (parsedParagraphs[openArr.length - 2]["secondaryDescriptors"][numDescribes - 1]["it"]) {

          // console.log(parsedParagraphs[openArr.length - 2]["secondaryDescriptors"][numDescribes - 1].it)
          parsedParagraphs[openArr.length - 2]["secondaryDescriptors"][numDescribes - 1].it.push(paragraphs[i].substring(paragraphs[i].indexOf("it") + 4, paragraphs[i].lastIndexOf("'")))

        } else {
          parsedParagraphs[openArr.length - 2]["secondaryDescriptors"][numDescribes - 1]["it"] = [paragraphs[i].substring(paragraphs[i].indexOf("it") + 4, paragraphs[i].lastIndexOf("'"))];
        }

      }

      if (paragraphs[i].includes("{") && paragraphs[i].includes("}")) {

      } else if (paragraphs[i].includes("{")) { //keeps track of square brackets to keep track of what are primary and secondary descriptors
        openArr = [...openArr, "{"];
      } else if (paragraphs[i].includes("}")) {
        openArr.pop()
      }

    }
  } catch (err) {
    console.log(err);
  }

  if (openArr.length != 0) { //if openArr.length is not 0, this means that it's reading a faulty test file
    parsedParagraphs = []; //will reset it to 0
  }

  return parsedParagraphs;

}

import * as fs from 'fs';
import * as path from 'path';

import generateHtml from './html-generator.js';

//READ FILE FUNCTION

function fileContent(path) {

  return fs.readFileSync(path, "utf8")

}

export function getContent(path) {

  return fileContent(path)
          .split('\n')
          .filter((paragraph) => !(paragraph.startsWith('//') || paragraph.startsWith('\r')))
          .map(paragraph => paragraph.replace('\r', ''))

}

export function getFilePath(filePath) {
  let newFilePath = path.resolve(filePath);
  newFilePath = newFilePath.substring(newFilePath.indexOf("src"));
  return newFilePath;
}

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

          console.log(parsedParagraphs[openArr.length - 2]["secondaryDescriptors"][numDescribes - 1].it)
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

  console.log(parsedParagraphs[0].secondaryDescriptors);
  return parsedParagraphs;

}
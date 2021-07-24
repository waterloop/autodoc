import chai from 'chai';

import generateHtmlForFile, { generateHtmlForFiles } from '../html-generator.mjs';
import { parseFileContent, getFilePath, parseLinesOfCode, readFiles } from '../utils.mjs';
import { expectedHTMLOutput } from './expected-outputs/expected-output';

var expect = chai.expect;

//TO FIX: TESTS AS THEY WILL FAIL AS ALL OTHER COMPUTERS HAVE DIFFERENT FILE PATHS TO THIS 

// import html generator
describe("Html-Generator", () => {
  describe("Generating for singular test files", () => {
    it("should match template", () => {
      let parseResults = parseLinesOfCode(parseFileContent("tests/files-for-tests/geese-info.test.js"))
      let filePath = getFilePath('./src/tests/files-for-tests/geese-info.test.js')
      let html = generateHtmlForFile(parseResults, filePath)
      // console.log(html);
      expect(html).to.equal(expectedHTMLOutput.matchShortTemplate);
    })
    it("should return empty nothing if test file is empty", () => {
      let parseResults = parseLinesOfCode(parseFileContent('tests/files-for-tests/empty.test.js'));
      let filePath = getFilePath('./src/tests/files-for-tests/empty.test.js')
      let html = generateHtmlForFile(parseResults, filePath)
      expect(html).to.equal(expectedHTMLOutput.emptyTemplate);
    })
    it("should handle large test files", () => {
      let parseResults = parseLinesOfCode(parseFileContent('tests/files-for-tests/largetest.test.js'));
      let filePath = getFilePath('./src/tests/files-for-tests/largetest.test.js')
      let html = generateHtmlForFile(parseResults, filePath)
      expect(html).to.equal(expectedHTMLOutput.largeTemplate);
    })
  })

  describe("Generating html for all test files in directory", () => {
    it("should parse all files in directory and put them in a singular html file", () => {
      let parseResults = readFiles('./src/tests/files-for-tests/'); //they utilize relative file pathing, need to see what to do regarding the pre-commit hook
      let filePath = getFilePath('./src/tests/files-for-tests/largetest.test.js');
      let html = generateHtmlForFiles(parseResults, filePath);
      expect(html).to.equal(expectedHTMLOutput.allFileTemplate);
    })
  })
})

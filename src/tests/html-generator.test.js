import chai from 'chai';
import generateHtmlForTest, { generateHtmlForTests } from '../html-generator.js';
import { parseFileContent, getFilePath, parseParagraphs, readFiles } from '../index';
import { expectedHTMLOutput } from './expectedOutputs/expected-output.js';
var expect = chai.expect;

// import html generator
describe("Html-Generator", () => {
  describe("Generating for singular test files", () => {
    it("should match template", () => {
      let parseResults = parseParagraphs(parseFileContent("testing/geese-info.test.js"))
      let filePath = getFilePath('./testing/geese-info.test.js')
      let html = generateHtmlForTest(parseResults, filePath)
      // console.log(html);
      expect(html).to.equal(expectedHTMLOutput.matchShortTemplate);
    })
    it("should return empty nothing if test file is empty", () => {
      let parseResults = parseParagraphs(parseFileContent('/testing/empty.test.js'));
      let filePath = getFilePath('./testing/empty.test.js')
      let html = generateHtmlForTest(parseResults, filePath)
      expect(html).to.equal(expectedHTMLOutput.emptyTemplate);
    })
    it("should handle large test files", () => {
      let parseResults = parseParagraphs(parseFileContent('/testing/largetest.test.js'));
      let filePath = getFilePath('./testing/largetest.test.js')
      let html = generateHtmlForTest(parseResults, filePath)
      expect(html).to.equal(expectedHTMLOutput.largeTemplate);
    })
  })

  describe("Generating html for all test files in directory", () => {
    it("should parse all files in directory and put them in a singular html file", () => {
    let parseResults = readFiles('./src/testing/'); //they utilize relative file pathing, need to see what to do regarding the pre-commit hook
    let filePath = getFilePath('./testing/largetest.test.js');
    let html = generateHtmlForTests(parseResults, filePath);
    expect(html).to.equal(expectedHTMLOutput.allFileTemplate);
  })
  })
})


//all this goes into a singular web page right? Need to handle dealing with multiple files in the testing directory and combining them into a singular large string

//test for different testing files (empty files, specific edge cases)
//node src/index.js /path/to/test/file/directory
//
import chai from 'chai';
import generateHtmlForTest from '../html-generator.js';
import { parseFileContent, getFilePath, parseParagraphs } from '../index';

var expect = chai.expect;

let expectedHTMLOutput = {
  matchShortTemplate:
    `<html>
<body>
<div>
<h1>Geese Info Routes</h1>
<h2>GET /api/geese-info/</h2>
<ul>
<li>it should return a list of geese info when called</li>
</ul>
<p>
For more information on this route, see: testing/geese-info.test.js
</p>
</div>
</body>
</html>`,

  emptyTemplate: ``,

  largeTemplate:
    `<html>
<body>
<div>
<h1>Geese Info Routes</h1>
<h2>GET /api/geese-info/</h2>
<ul>
<li>it should return a list of geese info when called</li>
</ul>
<h2>GET /api/geese-info/:id</h2>
<ul>
<li>it should return a goose pod with specific ID when called</li>
<li>it should return 404 for a non-existent pod when called</li>
</ul>
<h2>GET /api/geese-info/images/:id</h2>
<ul>
<li>it should return a list of images for a goose pod when called</li>
<li>it should return 404 for a non-existent pod or a pod with no images when called</li>
</ul>
<h2>POST /api/geese-info/</h2>
<ul>
<li>it should add a goose pod to the db with a well formed input</li>
<li>it should return 400 with no input supplied</li>
<li>it should return 400 with some required inputs not provided</li>
</ul>
<h2>POST /api/geese-info/images</h2>
<ul>
<li>it should add geese pod images to the db with a well formed input</li>
<li>it should return 400 with no input supplied</li>
<li>it should return 400 with malformed inputs provided</li>
</ul>
<h2>PATCH /api/geese-info/:id</h2>
<ul>
<li>it should update the entry with "id" to match the new body</li>
<li>it should return 400 if an id is not provided</li>
<li>it should return 400 when body is missing</li>
</ul>
<h2>DELETE /api/geese-info/:id</h2>
<ul>
<li>it should delete a goose info entry with "id" that exists</li>
<li>it should return 400 when an id is not provided</li>
<li>it should return 404 if the id does not exist</li>
</ul>
<h2>DELETE /api/geese-info/images/:id</h2>
<ul>
<li>it should delete a goose image entry with "id" that exists</li>
<li>it should return 400 when an id is not provided</li>
<li>it should return 404 if the id does not exist</li>
</ul>
<p>
For more information on this route, see: testing/largetest.test.js
</p>
</div>
</body>
</html>`
}


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
      
    })
  })
})


//all this goes into a singular web page right? Need to handle dealing with multiple files in the testing directory and combining them into a singular large string

//test for different testing files (empty files, specific edge cases)
//node src/index.js /path/to/test/file/directory
//
import chai from 'chai';
import { generateHtml } from '../html-generator.js';
import { getFilePath } from '../index';

var expect = chai.expect;

let expectedTestDescriptors = 
[
  {
    mainDescriptor: 'Geese Info Routes',
    secondaryDescriptors: [{name: 'GET /api/geese-info/', it: ['should return a list of geese info when called']}],
  }
]

//if it really does not work, just use module.exports and require() https://stackoverflow.com/questions/61670459/nodejs-must-use-import-to-load-es-module;

let expectedHTMLOutput = 
`
<html>
<body>
<div>
<h1>Geese Info Routes</h1>
<h2>GET /api/geese-info/</h2>
<ul>
<li>it should return a list of geese info when called</li>
</ul>
<p>
For more information on this route, see: src\testing\geese-info.test.js
</p>
</div>
</body>
</html>`

// import html generator
describe("Html-Generator", () => {
  describe("async api", () => {
    it("should match template", () => {
      let parseResults = expectedTestDescriptors;
      let filePath = getFilePath('./testing/geese-info.test.js')
      let html = generateHtml(parseResults, filePath)
      expect(html).to.equal(expectedHTMLOutput);
      done();
    })
  })

})



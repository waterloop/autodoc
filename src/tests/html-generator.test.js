import chai from 'chai';
import generateHtml from '../html-generator';
import readTestFile from '../index';
var expect = chai.expect;

let expectedOutput = 
`
<html>
  <body>
    <div>
      <h1>File Upload Routes</h1>
      <h2>POST /api/upload</h2>
      <ul>
        <li>it should return a url to the image uploaded
      </ul>
      <p>
      For more information on this route, see: /src/tests/integration/file-upload.test.js }
      </p>
    </div>
  </body>
</html>`

// import html generator
describe("HTML Generated from parsed ", function () {
  describe("async api", function () {
    it("should match template", done => {
      console.log(readTestFile('./testing/geese-info.test.js'))
      expect(readTestFil)
    })
  })

})



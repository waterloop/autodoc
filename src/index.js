import * as fs from 'fs';
import generateHtml from './html-generator.js';

//READ FILE FUNCTION

let fileContent = (path) => {
  return fs.readFileSync(path, "utf8")

}

export default function getContent(path) {
  return fileContent(path)
          .split('\n')
          .filter((paragraph) => !(paragraph.startsWith('//') || paragraph.startsWith('\r')))
          .map(paragraph => paragraph.replace('\r', ''))
          // .filter(paragraph => !(paragraph.endsWith('});') || paragraph.endsWith('})')))
}

//for example testing in testing folder, output is:

// [
//   'describe("File Upload Routes", () => {',
//   '  describe("POST /api/upload", () => {',
//   "    it('should return a url to the image uploaded', async () => {",
//   '      chai',
//   '        .request(app)',
//   "        .post('/api/upload', )",
//   "        .set('Content-Type', 'multipart/form-data')",
//   "        .attach('files', fs.readFileSync('/waterloop/src/tests/files/test.png'), 'test.png')",
//   '        .end((err, res) => {',
//   '          res.should.have.status(200);',
//   "          expect(res.body).to.have.keys(['message', 'data']);",
//   '          expect(res.body.data).to.have.lengthOf(1);',
//   '          expect(res.body.data[0]).to.deep.equal(`/waterloop/tmp/test.png`);',
//   '        });',
//   '    });',
//   '  })',
//   '})',
//   ''
// ]

//remove the )}?

//what is the best way to parse this?

//we know that the first descriptor will be the main one at the top, but if there are multiple 

//could I determine it with 

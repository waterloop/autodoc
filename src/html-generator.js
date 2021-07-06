import getContent from './index.js';



export default function generateHtml(path) {
  let paragraphs = getContent(path);
  let testDescriptors = parseParagraphs(paragraphs);

  // console.log(parsedParagraphs);

  return `
  <html>
    <body>
      <div>
      ${testDescriptors.map((testDescriptor) =>
          `<h1>${testDescriptor.mainDescriptor}</h1>
          ${testDescriptor.secondaryDescriptors.map((secondaryDescriptors) => 
          `<h2>${secondaryDescriptors.name}</h2>
          <ul>
          ${secondaryDescriptors['It'].map((itDescriptors) => 
          `<li>${itDescriptors}</li>`
          )}
          </ul>`
            )}
        </div>`
        )}
      </div>
    </body>
  </html>
  `
}

function parseParagraphs(paragraphs) {
  console.log(paragraphs);
  //keep track of brackets beforehand, and the matching brackets (valid parentheses for square brackets)
  let openArr = [];
  let parsedParagraphs = [];
  
  let numIts = 0;
  let numDescribes = 0;
  
  for (let i = 0; i < paragraphs.length; i++) {

    if (paragraphs[i].includes("describe")) { //if describe is there, then it will take the descriptor after the index of 
      numIts = 0; //reset numIts counter
      
      //if describe it will check length of openArr to see how many square brackets it's inside, if it's inside one, then that means that its a secondary descriptor
      if (openArr.length == 0) {
        numDescribes = 0; //numDescribes resets to 0 for new object in array to reset counter for secondaryDescriptors

        parsedParagraphs.push({}); //will append a new object which will contain primaryDescriptor property, secondaryDescriptor property, etc.

        parsedParagraphs[openArr.length].mainDescriptor = paragraphs[i].substring(paragraphs[i].indexOf("describe") + 10, paragraphs[i].lastIndexOf("'")) //appends the string to the mainDescriptor property
      
      } else if (openArr.length > 0) {
        numDescribes += 1; //numDescribes increases, this refers to the amount of secondaryDescriptors for each mainDescriptor
        parsedParagraphs[openArr.length-1]["secondaryDescriptors"] = [{name : paragraphs[i].substring(paragraphs[i].indexOf("describe") + 10, paragraphs[i].lastIndexOf("'"))}] //adds secondaryDescriptor property
        //openArr keeps track of which primaryDescriptor/main test we're on.
      }
    }

    else if (paragraphs[i].includes("it")) {
      numIts += 1; //need to be able to handle multiple it statements for each describe
      parsedParagraphs[openArr.length-2]["secondaryDescriptors"][numDescribes-1]["It"] = [paragraphs[i].substring(paragraphs[i].indexOf("it") + 4, paragraphs[i].lastIndexOf("'"))];

    }

    if (paragraphs[i].includes("{")) { //keeps track of square brackets to keep track of what are primary and secondary descriptors
      openArr = [...openArr, "{"];
    } else if (paragraphs[i].includes("}")) {
      openArr.pop()
    }

    
  }

  console.log(parsedParagraphs);
  console.log(parsedParagraphs[0].secondaryDescriptor)

  return parsedParagraphs;

  // console.log(parsedParagraphs[0].secondaryDescriptor.It1);

}

let html = generateHtml("./testing/geese-info.test.js");

console.log(html)


[
  'describe("File Upload Routes", () => {',
  '  describe("POST /api/upload", () => {',
  "    it('should return a url to the image uploaded', async () => {",
  '      chai',
  '        .request(app)',
  "        .post('/api/upload', )",
  "        .set('Content-Type', 'multipart/form-data')",
  "        .attach('files', fs.readFileSync('/waterloop/src/tests/files/test.png'), 'test.png')",
  '        .end((err, res) => {',
  '          res.should.have.status(200);',
  "          expect(res.body).to.have.keys(['message', 'data']);",
  '          expect(res.body.data).to.have.lengthOf(1);',
  '          expect(res.body.data[0]).to.deep.equal(`/waterloop/tmp/test.png`);',
  '        });',
  '    });',
  '  })',
  '})',
  ''
]

// `<html>
// <body>
// <div>
// <h1>File Upload Routes</h1> <-- This will be first descripter we find, i.e 
// <h2>POST /api/upload</h2>
// <ul>
// <li>it should return a url to the image uploaded
// </ul>
// <p>
// For more information on this route, see: /src/tests/integration/file-upload.test.js
// </p>
// </div>
// </body>
// </html>`

// describe("File Upload Routes", () => {              //should parse whatever is after the describe(" and stop at ""
//   describe("POST /api/upload", () => {
//     it('should return a url to the image uploaded', async () => {
//       chai
//         .request(app)
//         .post('/api/upload', )
//         .set('Content-Type', 'multipart/form-data')
//         .attach('files', fs.readFileSync('/waterloop/src/tests/files/test.png'), 'test.png')
//         .end((err, res) => {
//           res.should.have.status(200);
//           expect(res.body).to.have.keys(['message', 'data']);
//           expect(res.body.data).to.have.lengthOf(1);
//           expect(res.body.data[0]).to.deep.equal(`/waterloop/tmp/test.png`);
//         });
//     });
//   })
// })

//what is the best way to parse this?
//- the best way to do it would be to use a literal AST... WILL FIGURE OUT FOR LATER ITERATIONS
//- start with the very first "describe" you find, then move on from that (we dont have to abstract because its specifically for cms-backend and each file has one main descriptor but multiple routes to test with individual instructions )
import { parseFileContent, getFilePath, parseParagraphs } from './index.js';

// module.exports.file_content = fileContent;
// module.exports.parse_file_content = parseFileContent;
// module.exports.get_file_path = getFilePath;
// module.exports.parse_paragraphs = parseParagraphs;

// let { file_content, parse_file_content, get_file_path, parse_paragraphs } = require('./index');


export default function generateHtml(testDescriptors , path) {

  // console.log(testDescriptors);

  let html =  //making html output with no indentations to make testing easier
`<html>
<body>
<div>
${testDescriptors.map((testDescriptor) =>
      `<h1>${testDescriptor.mainDescriptor}</h1>
${testDescriptor.secondaryDescriptors.map((secondaryDescriptors) =>
        `<h2>${secondaryDescriptors.name}</h2>
<ul>
${secondaryDescriptors.it.map((itDescriptors) =>
          `<li>${`it ` + itDescriptors}</li>`).join('\n')}
</ul>`).join('\n')}`)}
<p>
For more information on this route, see: ${path} 
</p>
</div>
</body>
</html>`

  return html;
}

let content = parseFileContent("./testing/geese-info.test.js");

let testDescriptors = parseParagraphs(content);

let filePath = getFilePath("./testing/geese-info.test.js");

console.log(generateHtml(testDescriptors,filePath));

// module.exports.generateHTML = generateHtml;

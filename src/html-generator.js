import { getContent, getFilePath, parseParagraphs } from './index.js';

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

let content = getContent("./testing/geese-info.test.js");

let testDescriptors = parseParagraphs(content);

let filePath = getFilePath("./testing/geese-info.test.js");

console.log(generateHtml(testDescriptors,filePath));



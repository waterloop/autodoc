export default function generateHtmlForFile(testDescriptors , path) { 
  let html = ``;
  // console.log(testDescriptors);
  if (testDescriptors.length == 0) {
    return html;
  } else {
html =
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
  }

  return html;
}

export function generateHtmlForFiles(testDescriptors, pathToDir) {
  let html = ``;

  const lengthofDescriptors = testDescriptors.reduce((a, obj) => a + Object.keys(obj).length, 0); 
  if (lengthofDescriptors == 0) {

    return html;
  } else {
html =  //making html output with no indentations to make testing easier
`<html>
<body>
<div>
${testDescriptors.map((testDescriptor) =>
      `<div><h1>${testDescriptor.mainDescriptor}</h1>
${testDescriptor.secondaryDescriptors.map((secondaryDescriptors) =>
        `<h2>${secondaryDescriptors.name}</h2>
<ul>
${secondaryDescriptors.it.map((itDescriptors) =>
          `<li>${`it ` + itDescriptors}</li>`).join('\n')}
</ul>`).join('\n')}</div>`)}
<p>
For more information on this route, see: ${pathToDir}
</p>
</div>
</body>
</html>`
  }
  html = html.replace(',','\n');


  return html;
}



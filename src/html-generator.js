export function generateHtmlForTests(testDescriptors, pathToDir) { //testDescriptors will be an array of the objects
//need to figure out what to do with this
  let html = ``;

  const lengthofDescriptors = testDescriptors.reduce((a, obj) => a + Object.keys(obj).length, 0); //cant use .length because its an array of objects so .length is undefined for this situation
  if (lengthofDescriptors == 0) {

    // console.log("Directory is empty");
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

export default function generateHtmlForTest(testDescriptors , path) { 
  let html = ``;
  // console.log(testDescriptors);
  if (testDescriptors.length == 0) {

    // console.log("Not a test file or empty file, returning empty pg")
    return html;

  } else {
html =  //making html output with no indentations to make testing easier
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

export const expectedHTMLOutput = {
matchShortTemplate:
  `<html>
<body>
<div>
<h1>Shorter Geese Info Routes</h1>
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
</html>`,

allFileTemplate:
`<html>
<body>
<div>
<div><h1>Shorter Geese Info Routes</h1>
<h2>GET /api/geese-info/</h2>
<ul>
<li>it should return a list of geese info when called</li>
</ul></div>
<div><h1>Geese Info Routes</h1>
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
</ul></div>
<p>
For more information on this route, see: testing/largetest.test.js
</p>
</div>
</body>
</html>`
}
const fetch = require('node-fetch');

fetch('http://localhost:3000')
  .then(response => response.json())
  //.then(json => console.log(json) )
  .then(console.log) // console.log tout est objet donc une fonction en particulier elle peut être passée en paramètre
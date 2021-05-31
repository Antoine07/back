const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

http.get(`http://${hostname}:${port}`, res => {

  let data = '';

  // recevoir les données par morceaux : Buffer
  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => console.log(data));
});
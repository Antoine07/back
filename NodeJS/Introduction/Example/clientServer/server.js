const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const date = new Date();
  // JSON.stringify 

  const message = { message: `Hello World ! ${date.toTimeString()}` };
  console.log( JSON.stringify(message) );

  res.end(JSON.stringify({ message }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

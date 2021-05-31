const http = require("http");
const fs = require("fs");
const path = require("path");

// address & port
const hostname = "127.0.0.1";
const port = 3000;

// constante de chemin absolu
const pagesPath = path.join(__dirname, "/pages");

// console.log(pagesPath);

const flux = file => fs.readFileSync(`${pagesPath}${file}`, "utf8");

const server = http.createServer((req, res) => {
  if (req.url.match(/\.css$/)) {
    console.log(req.url);

    const css = flux(req.url);

    res.writeHead(200, { "Content-type": "text/css" });
    res.write(css);
    res.end();

  } else {
    const data = flux("/index.html");

    res.writeHead(200, { "Content-type": "text/html" });
    res.write(data);
    res.end();
  }
});

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);

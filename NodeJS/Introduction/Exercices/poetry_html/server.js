const http = require("http");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const hostname = "127.0.0.1";
const port = 3000;

const pagesPath = path.join(__dirname, "/pages"); // les pages que je vais envoyer au client
const viewsPath = path.join(__dirname, "/views"); // le templating
const dataPath = path.join(__dirname, "/data"); // les données

const server = http.createServer((req, res) => {
  if (req.url.match(/\.css$/)) {
    const cssPath = `${pagesPath}/css/styles.css`;
    const css = fs.readFileSync(cssPath, "utf8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
  } else {

    const phrases = fs
      .readFileSync(`${dataPath}/poem.txt`, { encoding: "utf8" } )
      .toString()
      .split("\n")
      .map((phrase, i) =>
        i % 2 === 0 && phrase.trim()  ? phrase.toUpperCase() : ( !phrase.trim()  ? "  " : phrase )
      );

    ejs.renderFile(`${viewsPath}/index.ejs`, { phrases }, (err, str) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(str);
      res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

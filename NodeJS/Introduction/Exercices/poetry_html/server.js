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
    
    // transforme le flux en chaîne de caractères 
    const tplStr = fs.readFileSync(`${viewsPath}/index.ejs`, 'utf8').toString();

    const tplEjs = ejs.render(tplStr, { phrase : "HELLO EJS" }) ;

    console.log(tplEjs);

    res.writeHead(200, {"Content-type" : "text/html"});
    res.write(tplEjs);
    res.end();

  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

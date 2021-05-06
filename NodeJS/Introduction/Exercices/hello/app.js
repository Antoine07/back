const http = require("http");
const fs = require("fs"); // lire un fichier
const path = require("path"); // calculer le path chemin absolu

// server
const hostname = "127.0.0.1";
const port = 3000;

// chemin absolu vers le dossier pages dans lequel on a placé nos fichiers statiques 
const dirPath = path.join(__dirname, "/pages");

// server
const server = http.createServer( async (req, res) => {

    if( req.url.match('\.css$') ){
        const cssPath =  `${dirPath}/css/styles.css` ;
        const css = await fs.promises.readFile(cssPath , "utf8");
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(css);
        res.end();

    }else{
        const data = await fs.promises.readFile(`${dirPath}/index.html`, "utf8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


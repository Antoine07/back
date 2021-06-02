const http = require("http");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "ny";
const collectionName = "restaurants";
let [restaurants, cuisines] = [null, null];

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    connect = await client.connect();
    // Establish and verify connection
    restaurants = await client.db(dbName).collection(collectionName);

    console.log("Connected successfully to server");
  } catch (e) {
    console.error(e);
    client.close();
  }
};

run().catch(console.dir);

const hostname = "127.0.0.1";
const port = 3000;

const pagesPath = path.join(__dirname, "/pages"); // les pages que je vais envoyer au client
const viewsPath = path.join(__dirname, "/views"); // le templating
const dataPath = path.join(__dirname, "/data"); // les données

const limit_doc = 10;

// fonctions utiles
const handleError = (req, res) => {
  res.writeHead(404, { "Content-type": "text/html" });
  res.write("<html><head></head><body><h1>Error</h1></body></html>");
  res.end();
};

//
const formatDigit = (num, prec = 1_00_000) => Math.floor(num * prec) / prec;

const server = http.createServer((req, res) => {
  // traiter assets fichiers statiques
  if (req.url.match(/\.css$/)) {
    const cssPath =
      (req.url.match(/bootstrap/) ? __dirname : `${pagesPath}`) + req.url;
    const fileCss = fs.readFileSync(cssPath, "utf8");

    res.writeHead(200, { "Content-type": "text/css" });
    res.write(fileCss);
    res.end();
  } else {
    if (req.method === "GET") {
      const meta = { cuisines: [], borough: [] };

      restaurants
        .distinct("cuisine")
        .then((cuisines) => (meta["cuisines"] = cuisines))
        .then(() => restaurants.distinct("borough"))
        .then((borough) => (meta["borough"] = borough))
        .then(() => {
          const { cuisines, borough } = meta;
          ejs.renderFile(
            `${viewsPath}/index.ejs`,
            { cuisines, borough, title: "Bonjour EJS MongoDB & Node.js" },
            (err, str) => {
              if (err) {
                handleError(req, res);

                return;
              }
              res.writeHead(200, { "Content-type": "text/html" });
              res.write(str);
              res.end();
            }
          );
        })
        .catch(() => handleError(req, res));
    }

    if (req.method === "POST") {
      let body = "";

      // par morceau
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        const [borough, cuisine] = body
          .split("&")
          .map((str) => str.split("=")[1]);

        let results = await restaurants
          .aggregate([
            {
              $match: {
                borough: new RegExp(borough, "i"), // ils sont déjà dans un select donc ce n'est pas nécessaire de passer une regex
                cuisine: new RegExp(cuisine, "i"),
              },
            },
            {
              $project: {
                _id: 0,
                name: 1,
                "address.coord": 1,
              },
            },
            { $limit: limit_doc },
          ])
          .toArray();

        // attention aux parenthèses elle force le retour du littéral donc ici il n'y pas de problème de syntaxe.
        results = results.map((result) => ({
          lat: formatDigit(result.address.coord[1]),
          lng: formatDigit(result.address.coord[0]),
          name: result.name,
        }));

        console.log(results);

        ejs.renderFile(
          `${viewsPath}/results.ejs`,
          { results, borough },
          (err, str) => {
            if (err) {
              handleError(req, res);

              return;
            }
            res.writeHead(200, { "Content-type": "text/html" });
            res.write(str);
            res.end();
          }
        );

      });
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

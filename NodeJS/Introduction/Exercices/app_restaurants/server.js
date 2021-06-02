const http = require("http");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "ny";
const collectionName = "restaurants";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let [restaurants, cuisines] = [null, null];

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

const server = http.createServer((req, res) => {
  if (req.url.match(/\.css$/)) {
    const cssPath = `${pagesPath}/css/styles.css`;
    const css = fs.readFileSync(cssPath, "utf8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
  } else {
    // GET
    if (req.method === "GET") {
      restaurants.distinct("cuisine").then((cuisines) => {
        ejs.renderFile(`${viewsPath}/index.ejs`, { cuisines }, (err, str) => {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(str);
          res.end();
        });
      });
    }

    // POST
    if (req.method === "POST") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", async () => {
        console.log("Body: " + body);
        const lenSanitize = body.length - "=&Search=Envoyer".length;

        const data = body
          .slice(0, lenSanitize + 1)
          .split("&")
          .map((str) => str.split("=")[1]);

        const [borough, cuisine] = data;

        let results = await restaurants
          .aggregate([
            {
              $match: {
                borough: new RegExp(borough, "i"),
                cuisine: new RegExp(cuisine, "i"),
              },
            },
            {
              $project: {
                name: 1,
                _id: 0,
                "address.coord": 1,
              },
            },
            { $limit: 10 },
          ])
          .toArray();

        // mapping pour préparer les données
        const formatDigit = (num) =>
          num ? Math.floor(num * 1000) / 1000 : null;

        results = results.map((res) => ({
          lat: formatDigit(res?.address.coord[0]),
          lng: formatDigit(res?.address.coord[1]),
          name: res.name,
        }));

        ejs.renderFile(
          `${viewsPath}/results.ejs`,
          {
            results,
            borough,
          },
          (err, str) => {
            res.writeHead(200, { "Content-Type": "text/html" });
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

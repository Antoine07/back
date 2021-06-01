const http = require("http");
const { MongoClient } = require('mongodb');

const url = require('url');
/*
url.pathname
*/

const hostname = "127.0.0.1";
const port = 3000;
const uri = "mongodb://127.0.0.1:27017";
const dbName = 'ny';
const collectionName = 'restaurants';

const client = new MongoClient(uri , { 
    useUnifiedTopology: true,
    useNewUrlParser : true
});

let restaurants = null;

const run = async () => {
    try{
        await client.connect();
        console.log("Connected to server");
        restaurants = await client.db(dbName).collection(collectionName);
        // test requête sur la base de données

        restaurants.findOne({}).then(console.log)

    }catch(e){
        console.error(e);
        client.close();
    }
}

run().catch(console.log)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const date = new Date();
  // JSON.stringify 

  const message = { message: `Hello World ! ${date.toTimeString()}` };
  console.log( JSON.stringify(message) );

  if(req.method === 'POST'){
      console.log("POST");
      let body = '';
      // on reçoit les choses par morceaux
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => console.log(body) )
  }

  res.end(JSON.stringify({ message }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

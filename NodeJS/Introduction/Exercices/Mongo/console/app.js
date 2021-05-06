const client = require("./src/connect");
const { ExceptionConsole } = require("./src/utils");

const process = require("process");
process.stdin.setEncoding("utf8");

let [flag, step, choices ] = [ true, 0, null];

async function run() {
  try {
    await client.connect();

    const database = client.db("ny");
    const restaurants = database.collection("restaurants");
    const query = { borough: "Bronx", "address.coord": { $exists: true } };
    const projection = { name: 1, "address.coord": 1 };

    process.stdin.on("data", async (data) => {
      try {
        const type = data.toString().trim();

        if (type.toUpperCase() === "Q")
          throw new ExceptionConsole("By");

        if (flag === true) {
          query["cuisine"] = type;
          choices = await restaurants.find(query, projection);
          flag = false;
        }

        while ( await choices.hasNext() && step < 4) {
          const {
            name,
            address: { coord },
          } = await choices.next(); // une exception est lancée lorsqu'on arrive à la fin => on la catch puis on close la connexion

          const [lat, long] = coord;

          console.log(`Name ${name}, coordinates lat ${lat} long ${long}`);
          console.log("-------------------------");
          step++;
        }

        console.log("Résultats suivants tapez entrée \n");
        step = 0;

        process.stdout.write("> ");
      } catch (e) {
        await client.close();
        process.stdin.pause();
        console.log(e.message);
      }
    });
  } catch (e) {
    console.log("pb de connexion", e.message);
    await client.close();
  }finally{
    // ne rien faire ici
  }
}

console.log("Quel type de cuisine cherchez-vous dans le quartier du Bronx? \n");
process.stdout.write("> ");

run().catch(console.dir);

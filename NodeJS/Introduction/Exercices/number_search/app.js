const process = require("process");

process.stdin.setEncoding("utf8"); // Définit l'encodage des caractères dans le flux de la console.

let number = Math.floor(Math.random() * 100);
let count = 10,
  replay = false;
const MAX_ESSAI = 10;

const replayGame = () => {
  console.log("rejouer: y/n");
  replay = true;
  process.stdout.write("> ");
};

process.stdin.on("data", (data) => {
  const choice = data.toString().trim();

  console.log(count);

  if(replay && choice === "y"){
    count = 10;
    number = Math.floor(Math.random() * 100);
    replay = false;
  }

  if (replay && choice === "n") {
    process.stdin.pause();
    replay = false;

    return;
  }

  if (isNaN(parseInt(choice))) {
    console.log(`Attention, proposez un nombre entier compris entre 1 et 100`);

    console.log("vous pouvez encore rejouer");
    process.stdout.write("> ");

    return;
  }

  if (count === 1) {
    console.log("Désolé vous avez perdu !");

    replayGame();

    return;
  }

  if (parseInt(choice) === number) {
    console.log("Bravo vous avez deviner en ", MAX_ESSAI - count, "coup(s)");

    replayGame();
  } else {
    if (choice < number) console.log("Ratez le nombre est plus grand");
    else console.log("Ratez le nombre est plus petit");

    console.log("vous pouvez encore rejouer");
    process.stdout.write("> ");
    count--;
  }
});

console.log("Vous devez deviner un nombre compris entre 1 et 100");
process.stdout.write("> ");
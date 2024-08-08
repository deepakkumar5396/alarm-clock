
const path = require("path");
const player = require("node-wav-player");

const playSound = (fileName) => {
  const filePath = path.resolve(__dirname, fileName);
  console.log(`Attempting to play sound from: ${filePath}`);

  player
    .play({
      path: filePath,
    })
    .then(() => {
      console.log("Alarm Ringing");
    })
    .catch((error) => {
      console.error("Error playing sound:", error);
    });
};

module.exports = { playSound };

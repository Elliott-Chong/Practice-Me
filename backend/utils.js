const generateRoomCode = () => {
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var result = "";
  var charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = { generateRoomCode };

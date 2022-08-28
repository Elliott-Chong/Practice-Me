const jwt = require("jsonwebtoken");
const connection = require("./db.js");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (token) {
      const payload = await jwt.verify(token, "hello");
      if (payload) {
        const user = await query("SELECT * FROM Users WHERE id=?", [
          payload.user.id,
        ]);
        req.user = user[0];
        next();
      }
    } else {
      return res.status(401).send("no token");
    }
  } catch (error) {
    res.status(401).send("invalid token");
  }
};
module.exports = auth;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const connection = require("../db.js");
const util = require("util");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("../auth_middleware.js");
const query = util.promisify(connection.query).bind(connection);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await query("SELECT * FROM Users WHERE name=?", [
      username,
    ]);
    if (response.length == 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid username or password!" }] });
    }
    if (await bcrypt.compare(password, response[0].password)) {
      const payload = {
        user: {
          id: response[0].id,
        },
      };
      jwt.sign(payload, "hello", { expiresIn: 360000000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid username or password!" }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

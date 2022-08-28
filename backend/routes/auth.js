const router = require("express").Router();
const bcrypt = require("bcryptjs");
const connection = require("../db.js");
const util = require("util");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../auth_middleware.js");
const query = util.promisify(connection.query).bind(connection);

router.get("/user", auth_middleware, (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).send("No User");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await query("SELECT * FROM Users WHERE email=?", [email]);
    console.log(response);
    if (response.length == 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email or password!" }] });
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
        .json({ errors: [{ msg: "Invalid email or password!" }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

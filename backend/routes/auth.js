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

router.post(
  "/register",
  body("email", "Please provide a valid email address.").isEmail(),
  body("password", "Password must be at least 6 digits long.").isLength({
    min: 6,
  }),
  body("course", "Please enter a valid course.").not().isEmpty(),
  body("cls", "Please enter a valid class").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, password1, course, cls } = req.body;
    if (password !== password1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords not not match!" }] });
    }

    try {
      const response = await query("SELECT * FROM Users where email=?", [
        email,
      ]);
      if (response.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email has already been taken." }] });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const auto_name = email.split("@")[0].split(".")[0].toLowerCase();
      const results = await query(
        "INSERT INTO Users (email,name, password, course, class) VALUES (?,?,?,?,?)",
        [email, auto_name, hashedPassword, course, cls]
      );
      const payload = {
        user: {
          id: results.insertId,
        },
      };
      jwt.sign(payload, "hello", { expiresIn: 360000000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/score", auth_middleware, async (req, res) => {
  let { delta_score } = req.body;
  delta_score = parseFloat(delta_score);
  try {
    await query("UPDATE Users SET score = score + ? WHERE id = ?", [
      delta_score,
      req.user.id,
    ]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    let result = await query(
      "SELECT id, name, email, class, course, score FROM Users;"
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await query("SELECT * FROM Users WHERE email=?", [email]);
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

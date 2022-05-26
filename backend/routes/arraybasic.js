const router = require("express").Router();
const cls = require("../../ArrayBasicQnsClass.js");
const template = new cls();

router.get("/", (req, res) => {
  let qn = template.generateGetLengthQns("1")[0];
  console.log(qn);
  res.json(qn);
});

module.exports = router;

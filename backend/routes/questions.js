const router = require("express").Router();
const cls = require("../../FunctionScopeQnsClass");
const template = new cls();

router.post("/functionscope", (req, res) => {
  let { topics, difficulty } = req.body;
  let qn = template.generateQuestion();
  let question = qn[0];
  let answer = template.generateAnswer(qn[1]);
  res.json({ question, answer });
});

module.exports = router;

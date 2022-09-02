const router = require("express").Router();

const getQuestionTemplate = (topic) => {
  let template;
  switch (topic) {
    case "scope":
      template = require("../../FunctionScopeQnsClass");
      break;
    case "boolean":
      template = require("../../BooleanQnsClass");
      break;
    case "incre-decre":
      template = require("../../PostPreIncreDecreQnsClass");
      break;
    case "do-while":
      template = require("../../RepetitionDoWhileQnsClass");
      break;
    case "for-loop":
      template = require("../../RepetitionForQnsClass");
      break;
    case "if-else":
      template = require("../../SelectionIfElseQnsClass");
      break;
    case "switch-case":
      template = require("../../SelectionSwitchQnsClass");
      break;
    case "shorthand":
      template = require("../../ShorthandQnsClass");
      break;
    case "array":
      template = require("../../ArrayBasicQnsClass");
      break;
    case "while-loop":
      template = require("../../RepetitionWhileQnsClass");
  }
  return new template();
};

router.post("/", (req, res) => {
  // this route handles the route '/api/questions'
  let { topic, difficulty } = req.body;

  try {
    let template = getQuestionTemplate(topic);
    let qn = template.generateQuestion();
    let question = qn[0];
    let answer = template.generateAnswer(qn[1]);
    res.json({ question, answer });
  } catch (error) {
    // console.error(error);
    console.log("questions error");
    return res.status(500).send("Server error in @POST /api/questions");
  }
});

router.get("/multi", async (req, res) => {});

module.exports = router;

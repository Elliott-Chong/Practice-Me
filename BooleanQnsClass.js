/*
    Contain the following type(s) of question:
    - true && false
    - false && true || false && false
    - ! ( false && true && false || true )
*/
class BooleanOperatorTemplate {
  /*
        Return either true or false value
    */
  generateBooleanValue() {
    if (Math.floor(Math.random() * 10) % 2 == 0) return true;
    return false;
  }

  /*
        Return an array of 'x' amount of boolean value
    */
  generateNoOfValues() {
    var rnd = Math.floor(Math.random() * 10);
    var arrOptions = [],
      x;
    x = rnd % 3 == 0 ? 2 : 3;
    for (var i = 0; i < x; i++) {
      arrOptions.push(this.generateBooleanValue());
    }
    return arrOptions;
  }

  /*
        Return a string concatenated question
    */
  generateQuestion() {
    var values = this.generateNoOfValues();
    var query = "console.log(";
    query += values[0];
    for (var i = 1; i < values.length; i++) {
      if (Math.floor(Math.random() * 10) % 2 == 0) {
        query += " && " + values[i];
      } else {
        query += " || " + values[i];
      }
    }
    query += ")";
    return [query, query];
  }

  /*
        Return the evaulation of the question
    */
  generateAnswer(question) {
    if (eval(question)) {
      return "true";
    } else {
      return "false";
    }
  }
}

module.exports = BooleanOperatorTemplate;

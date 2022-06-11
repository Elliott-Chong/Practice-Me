/*
    Contain the following type(s) of question:
    - basic arimethtic operations (+, -, *, %)
    - shorthand operations (+=, -=, *=, %=)
*/
class ShorthandTemp {
  /*
       Return a random alphabet
   */
  generateAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  /*
        Return a random number from 1 to x
    */
  generateRnd(x) {
    return Math.floor(Math.random() * x) + 1;
  }

  /*
        Return a:
        [0] - string concatenated shorthand operations question
        [1] - string concatenated shorthand operations question with variable for evaluation
    */
  generateQuestion() {
    var alpha = this.generateAlphabet();
    var startingValue = this.generateRnd(10);
    var query = `\tvar ${alpha} = ${startingValue};\n\t`;
    var query2;

    // performing shorthand operation
    var rnd = this.generateRnd(10);
    query +=
      rnd < 6
        ? `${alpha} += ${this.generateRnd(8)}`
        : `${alpha} -= ${this.generateRnd(6)}`;

    // performing arithmetic operation (+, -, *, %)
    query +=
      this.generateRnd(10) < 6
        ? ` + ${this.generateRnd(6)}`
        : ` - ${this.generateRnd(3)}`;

    query += `;\n\t`;
    query2 = query + `${alpha}`;
    query += `console.log( ${alpha} );`;
    return [query, query2];
  }

  /*
        Return the evaulation of the question
    */
  generateAnswer(question) {
    return eval(question);
  }
}

module.exports = ShorthandTemp;

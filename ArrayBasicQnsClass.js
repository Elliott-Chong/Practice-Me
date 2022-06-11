/*
    Contain the following type(s) of question:
    - accessing 1D array
    - accessing 2D array
    - get length of 1D, 2D array
    - .pop() function
    - .push() function
    - basic mathematical operations among values in array
*/
class ArrayBasicTemp {
  constructor() {
    // length related question/ answer
    this.question1 = this.generateGetLengthQns();
    this.answer1 = this.generateAnswer(this.question1[1]);

    // retrieve index related question/ answer
    this.question2 = this.generateGetIndexQns();
    this.answer2 = this.generateAnswer(this.question2[1]);

    // retrieve arithmetic operation on index related question/ answer
    this.question3 = this.generateIndexOperationQns();
    this.answer3 = this.generateAnswer(this.question3[1]);

    // retrieve pop/push methods related question/ answer
    this.question4 = this.generateArrayMethodsQns();
    this.answer4 = this.generateAnswer(this.question4[1]);

    this.category = ["array"];
  }

  /*
       Return a random alphabet
   */
  generateAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  /*
        Return a random number from x to 4 + x
    */
  generateArrayLen(x) {
    return Math.floor(Math.random() * 4) + x;
  }

  /*
        Return an array consisting of:
        [0] - string concatenated array of random size 2 to 4
        [1] - string concatenated array's length
    */
  generateInnerArray() {
    var arrLen = Math.floor(Math.random() * 3) + 2;
    var query = "[ ";
    for (let i = 0; i < arrLen; i++) {
      query += `${Math.floor(Math.random() * 10)}`;
      if (i != arrLen - 1) {
        query += ", ";
      }
    }
    query += " ]";
    return [query, arrLen];
  }

  /*
        Return an 1D/ 2D array consisting of:
        [0] - string concatenated .length question
        [1] - string concatenated .length question with len for evaluation
    */
  generateGetLengthQns() {
    var arrLen = this.generateArrayLen(4);
    var query = "\tvar arr = ";
    if (Math.floor(Math.random() * 10) < 5) {
      // generate 1D array
      query += "[ ";
      for (let i = 0; i < arrLen; i++) {
        query += `${Math.floor(Math.random() * 10)}`;
        if (i != arrLen - 1) {
          query += ", ";
        }
      }
      query += " ];";
    } else {
      // generate array use new keyword
      if (Math.floor(Math.random() * 10) < 6) {
        query += `new Array(${arrLen});`;
      } else {
        query += `new Array(`;
        for (let i = 0; i < arrLen; i++) {
          query += `${Math.floor(Math.random() * 10)}`;
          if (i != arrLen - 1) {
            query += ", ";
          }
        }
        query += `);`;
      }
    }
    query += "\n\tvar len = arr.length;\n";
    var query2 = query + "// length \nlen";
    query += "\tconsole.log( len );";
    return [query, query2];
  }

  /*
        Return an 1D/ 2D array consisting of:
        [0] - string concatenated get value by index question
        [1] - string concatenated get value by index question with variable for evaluation
    */
  generateGetIndexQns() {
    var arrLen = this.generateArrayLen(5);
    var alpha = this.generateAlphabet();
    var query = "\tvar arr = [ ";
    var query2;
    // generate 1D array
    for (let i = 0; i < arrLen; i++) {
      query += `${Math.floor(Math.random() * 10)}`;
      if (i != arrLen - 1) {
        query += ", ";
      }
    }
    query += ` ];\n\tvar ${alpha} = arr[${Math.floor(
      Math.random() * arrLen
    )}];\n`;
    query2 = query + `${alpha}`;
    query += `\tconsole.log( ${alpha} );`;
    return [query, query2];
  }

  /*
        Return an 1D array consisting of:
        [0] - string concatenated index operations question
        [1] - string concatenated index operations question with variable for evaluation
    */
  generateIndexOperationQns() {
    var arrLen = this.generateArrayLen(6);
    //var alpha = this.generateAlphabet();
    var actualArray = [];
    var query = "\tvar arr = [ ";
    var query2;
    // generate array
    for (let i = 0; i < arrLen; i++) {
      var rnd = Math.floor(Math.random() * 10);
      query += `${rnd}`;
      actualArray.push(rnd);
      if (i != arrLen - 1) {
        query += ", ";
      }
    }

    // performing arithmetic operation
    query += ` ];\n\tvar output = arr[${Math.floor(Math.random() * arrLen)}]`;

    var noOfVar;
    noOfVar = Math.floor(Math.random() * 10) % 3 == 0 ? 1 : 2;
    for (var i = 0; i < noOfVar; i++) {
      var rnd = Math.floor(Math.random() * 10);
      query +=
        rnd < 5
          ? ` - arr[${Math.floor(Math.random() * arrLen)}]`
          : ` + arr[${Math.floor(Math.random() * arrLen)}]`;
    }
    query += `;\n`;
    query2 = query + `output`;
    query += `\tconsole.log( output );`;
    return [query, query2];
  }

  /*
       Return either .pop() or .push() question:
       [0] - string concatenated format
       [1] - string concatenated format for evaluation
   */
  generateArrayMethodsQns(/*difficulty*/) {
    var arrLen = this.generateArrayLen(4);
    var alpha = this.generateAlphabet();
    var query = "\tvar arr = ";
    var query2;
    // generate 1D array
    query += "[ ";
    for (let i = 0; i < arrLen; i++) {
      query += `${Math.floor(Math.random() * 10)}`;
      if (i != arrLen - 1) {
        query += ", ";
      }
    }
    query += " ];";

    if (Math.floor(Math.random() * 10) < 5) {
      // pop question
      query += `\n\tvar ${alpha} = arr.pop();`;
      query2 = query + `\n// pop `;
    } else {
      // push question
      query += `\n\tvar ${alpha} = arr.push( ${Math.floor(
        Math.random() * 10
      )} );`;
      query2 = query + `\n// push `;
    }

    query2 += `\n${alpha}`;
    query += `\n\tconsole.log( ${alpha} );`;
    return [query, query2];
  }

  /*
        Return the evaulation of the question
    */
  generateAnswer(question) {
    return eval(question);
  }
}

module.exports = ArrayBasicTemp;

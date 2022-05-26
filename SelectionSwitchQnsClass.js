/*
    Contain the following type(s) of question:
    - var x = 2;
      var output = 0; // can be string
      switch (x) {
        case 1:
           output += 1;
           break;
        case 2:
           output += 2;
        default:
           output += 5;
      } 
      console.log(output);
*/
class SwitchSelectionTemp {
    constructor(difficulty) {
        this.question = this.generateQuestion(difficulty);
        this.answer = this.generateAnswer(this.question[1]);
        this.category = ['switch'];
    }
    /*
        Return a random alphabet
    */
    generateAlphabet() {
        const alphabet = "abcdefghjklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    /*
        Return a random number from 2 to (2 + range -1)
    */
    generateNoOfCase(range) {
        return Math.floor(Math.random() * 2) + range;
    }

    /*
        Return a:
        [0] - string concatenated switch statement
        [1] - string concatenated switch statement with variable for evaluation
    */
    generateQuestion(difficulty) {
        var alpha = this.generateAlphabet();
        var caseValue = Math.floor(Math.random() * 5);
        var query = `\tvar ${alpha} = ${caseValue};\n\tvar output = `;
        var output = Math.floor(Math.random() * 5);
        var query2 = '// switch \n';
        var numCases;

        if (difficulty == '1' || Math.floor(Math.random() * 10) < 3) {
            // expected output is numerical
            query += `${output};\n\n\tswitch (${alpha}) {`;
            numCases = this.generateNoOfCase(2); // either 2 or 3 cases
        } else {
            // expected output is string
            if (Math.floor(Math.random() * 10) < 4) {
                query += `'';\n\n\tswitch (${alpha}) {`;
            } else {
                query += `'${output}';\n\n\tswitch (${alpha}) {`;
            }
            numCases = (Math.floor(Math.random() * 10) % 3 != 0) ? this.generateNoOfCase(4) : this.generateNoOfCase(3); // either 3, 4 or 5 cases
        }

        var switchCaseValue = Math.floor(Math.random() * numCases);
        for (let i = 0; i < numCases; i++) {
            query += `\n\t    case ${switchCaseValue + i}:\n\t\toutput += ${Math.floor(Math.random() * 6) + 1};`;
            // decide if there is break
            if (Math.floor(Math.random() * 10) % 3 != 0) {
                query += `\n\t\tbreak;`;
            }
        }
        // decide if there is default? if so output to perform shorthand operation OR re-initialization
        var rnd = Math.floor(Math.random() * 10);
        if (rnd >= 7) {
            query += `\n\t    default:\n\t\toutput = ${Math.floor(Math.random() * 10)}`;
        } else if (rnd >= 1) {
            query += `\n\t    default:\n\t\toutput += ${Math.floor(Math.random() * 5)}`;
        } else { }

        query2 += query + `}output`;
        query += `\n\t}\n\tconsole.log( output );`;

        return [query, query2];
    }

    /*
        Return the evaulation of the question
    */
    generateAnswer(question) {
        return eval(question);
    }
}

module.exports = SwitchSelectionTemp;
/*
    Contain the following type(s) of question:
    - var a = 2;
      function replace() {
          a = 3;
      }
      replace();
      console.log( a );
*/
class FunctionScopeTemplate {
    constructor(difficulty) {
        this.question = this.generateQuestion(/*difficulty*/);
        this.answer = this.generateAnswer(this.question[1]);
        this.category = ['function'];
    }
    /*
        Return 1 random alphabets
    */
    generateAlphabet() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    /*
        Return a random number from 1 to 5
    */
    generateRnd5() {
        return Math.floor(Math.random() * 5) + 1;
    }

    /*
        Return a random name for the function
    */
    generateFunctionName() {
        var nameArr = ['change', 'replace', 'update']
        return nameArr[Math.floor(Math.random() * 3)];
    }

    /*
        Return an array consisting of:
        [0] - function question
        [1] - function question with variable for evaluation
    */
    generateQuestion(/*difficulty*/) {
        var alpha = this.generateAlphabet();
        var paraName = this.generateAlphabet();
        var fnName = this.generateFunctionName();
        // Determine if there's parameter
        var paraProb = Math.floor(Math.random() * 10);
        var query = `\n\tvar ${alpha} = ${this.generateRnd5()};`;
        var rnd = Math.floor(Math.random() * 10);
        if (rnd % 3 == 1) { // 1,4,7
            // Function involves parameter
            var tempParaName;
            if (paraProb % 3 == 0) {
                // Parameter uses same name as variable
                tempParaName = alpha;
            } else {
                // Parameter uses different name as variable
                tempParaName = paraName;
            }
            query += `\n\tfunction ${fnName}( ${tempParaName} ) {`;

            // Determine if there's shorthand operation within function
            var shorthandProb = Math.floor(Math.random() * 10);
            if (shorthandProb > 3) {
                var rndOps = Math.floor(Math.random() * 10);
                var operation = (rndOps < 4) ? '+=' : (rndOps < 7) ? '-=' : '*=';
                query += `\n\t    ${tempParaName} ${operation} ${this.generateRnd5() + 3};`;
            } else {
                query += `\n\t    ${tempParaName} = ${this.generateRnd5() + 3};`;
            }
            query += `\n\t}\n\t${fnName}( ${alpha} );`;
        } else {
            // Function doesn't involve parameter
            query += `\n\tfunction ${fnName}( ) {`;
            // Determine if 'var' placed in front of variable in function
            var innerVarProb = Math.floor(Math.random() * 10);
            if (innerVarProb % 3 == 0) {
                // keyword 'var' included in variable in function
                query += `\n\t    var ${alpha} = ${this.generateRnd5() + 3};`;
            } else {
                // keyword 'var' NOT included in variable in function
                // Determine if there's shorthand operation within function
                var shorthandProb = Math.floor(Math.random() * 10);
                if (shorthandProb > 3) {
                    var rndOps = Math.floor(Math.random() * 10);
                    var operation = (rndOps < 4) ? '+=' : (rndOps < 7) ? '-=' : '*=';
                    query += `\n\t    ${alpha} ${operation} ${this.generateRnd5() + 3};`;
                } else {
                    query += `\n\t    ${alpha} = ${this.generateRnd5() + 3};`;
                }

            }
            query += `\n\t}\n\t${fnName}( );`;

        }

        var query2 = query + `\n${alpha}`; // NOTE: DO NOT INCLUDE C.L into EVAL fn
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

module.exports = FunctionScopeTemplate;
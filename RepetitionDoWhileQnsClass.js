/*
    Contain the following type(s) of question:
    - var count = 1;
      do {

        count++;
        
      } while(count < 5)
      console.log( count );
*/
class DoWhileRepetitionTemp {
    constructor() {
        this.question = this.generateQuestion();
        this.answer = this.generateAnswer(this.question[1]);
        this.category = ['do while loop'];
    }
    /*
        Return a random alphabet
    */
    generateAlphabet() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    /*
        Return a random number from 0 to 9
    */
    generateRnd10() {
        return Math.floor(Math.random() * 10);
    }

    /*
        Return an array consisting of:
        [0] - string concatenated do while loop question
        [1] - string concatenated do while loop question with counter for evaluation
    */
    generateQuestion() {
        var alpha = this.generateAlphabet();
        var small = Math.floor(Math.random() * 5);
        var big = Math.floor(Math.random() * 10) + 15;
        var query = `\n\tvar ${alpha} = `;
        var query2 = `// do-while `;
        if (this.generateRnd10() % 2 == 0) {
            // Increment do-while Loop
            var sign = (this.generateRnd10() % 2 == 0) ? '<' : '<=';
            query += `${small};\n\tdo {\n\n\t    ${alpha}++;\n\n\t} while( ${alpha} ${sign} ${big} );`;

        } else {
            // Decrement do-while Loop
            var sign = (this.generateRnd10() % 2 == 0) ? '>' : '>=';
            query += `${big};\n\tdo {\n\n\t    ${alpha}--;\n\n\t} while( ${alpha} ${sign} ${small} );`;
        }

        query2 += query + `\n${alpha}`
        query += `\n\tconsole.log( ${alpha} );`

        return [query, query2];
    }

    /*
        Return the evaulation of the question
    */
    generateAnswer(question) {
        return eval(question);
    }
}

module.exports = DoWhileRepetitionTemp;
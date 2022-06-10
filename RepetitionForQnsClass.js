/*
    Contain the following type(s) of question:
    - for (var b = 16; b >= 0; b -= 2) {
        console.log( );
      }
    - for (var w = 19; w > 4; w -= 3) {
        if (w % 2 == 1 ) {
             console.log( );
        }
      }
*/
class ForRepetitionTemp {
    constructor() {
        this.question = this.generateQuestion();
        this.answer = this.generateAnswer(this.question[1]);
        this.category = ['for loop'];
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
        [0] - string concatenated for loop question
        [1] - string concatenated for loop question with counter for evaluation
    */
    generateQuestion() {
        var alpha = this.generateAlphabet();
        var small = Math.floor(Math.random() * 5);
        var big = Math.floor(Math.random() * 10) + 15;
        var query = '\t';
        var query2 = '// for \nvar counter = 0;\n';
        // generate first line of for loop
        if (this.generateRnd10() % 2 == 0) {
            // Increment For Loop
            query += `for (var ${alpha} = ${small}; `;
            if (this.generateRnd10() % 2 == 0) {
                query += `${alpha} < ${big};`;
            } else {
                query += `${alpha} <= ${big};`;
            }

            if (this.generateRnd10() < 4) { // change possibility of increment by
                query += ` ${alpha}++) {\n`;
            } else {
                query += ` ${alpha} += ${Math.floor(Math.random() * 3) + 2}) {\n`;
            }
        } else {
            // Decrement For Loop
            query += `for (var ${alpha} = ${big}; `;
            if (this.generateRnd10() % 2 == 0) {
                query += `${alpha} > ${small};`;
            } else {
                query += `${alpha} >= ${small};`;
            }

            if (this.generateRnd10() < 4) { // change possibility of decrement by
                query += ` ${alpha}--) {\n`;
            } else {
                query += ` ${alpha} -= ${Math.floor(Math.random() * 3) + 2}) {\n`;
            }
        }
        query2 += query;
        // generate body of for loop
        query += `\t    console.log( );\n\t}`
        query2 += `counter++;}\ncounter;`
        return [query, query2];
    }

    /*
        Return the evaulation of the question
    */
    generateAnswer(question) {
        return eval(question);
    }
}

module.exports = ForRepetitionTemp;
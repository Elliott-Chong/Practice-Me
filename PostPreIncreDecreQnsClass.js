/*
    Contain the following type(s) of question:
    - var i = 2;
      i = --i + --i + --i;
      console.log( i );
*/
class PostPreIncreDecreOperatorTemplate {
    constructor() {
        this.question = this.generateQuestion();
        this.answer = this.generateAnswer(this.question[1]);
        this.category = ['post-increment', 'pre-increment', 'post-decrement', 'pre-decrement'];
    }
    /*
        Return a random alphabet
    */
    generateAlphabet() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    /*
        Return a random number from 2 to 5
    */
    generateRnd5() {
        return Math.floor(Math.random() * 4) + 2;
    }

    /*
        Return 1 post/pre-increment/decrement (PPID) value
    */
    generatePPINValue(alpha) {
        var rnd = Math.floor(Math.random() * 10);
        if (rnd <= 2.5) {
            return `++${alpha}`;
        } else if (rnd > 2.5 && rnd <= 5) {
            return `${alpha}++`;
        } else if (rnd > 5 && rnd <= 7.5) {
            return `--${alpha}`;
        }
        return `${alpha}--`;
    }

    /*
        Return an array of 'x' amount of post/pre-increment/decrement values
    */
    generateNoOfValues(alpha) {
        var arrOptions = [], x;
        x = 2;
        for (var i = 0; i < x; i++) {
            arrOptions.push(this.generatePPINValue(alpha));
        }
        return arrOptions;
    }

    /*
        Return an array consisting of:
        [0] - string concatenated PPID question
        [1] - string concatenated PPID question with variable for evaluation
    */
    generateQuestion() {
        var alpha = this.generateAlphabet();
        var values = this.generateNoOfValues(alpha);
        var query = `\tvar ${alpha} = ${this.generateRnd5()};\n\t${alpha} = `;
        var question = values[0];
        for (var i = 1; i < values.length; i++) {
            if (Math.floor(Math.random() * 10) % 2 == 0) {
                question += ' + ' + values[i];
            } else {
                question += ' - ' + values[i];
            }
        }

        var query2 = query + question + `; \n${alpha}`; // NOTE: DO NOT INCLUDE C.L into EVAL fn
        query += question + `;\n\tconsole.log( ${alpha} );`;
        //var query2 = query + `\n\t${alpha}`; 
        return [query, query2];
    }

    /*
        Return the evaulation of the question
    */
    generateAnswer(question) {
        return eval(question);
    }
}
module.exports = PostPreIncreDecreOperatorTemplate;
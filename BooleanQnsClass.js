/*
    Contain the following type(s) of question:
    - true && false
    - false && true || false && false
    - ! ( false && true && false || true )
*/
class BooleanOperatorTemplate {
    constructor(difficulty) {
        this.question = this.generateQuestion(difficulty);
        this.answer = this.generateAnswer(this.question);
        this.category = ['boolean'];
    }
    /*
        Return either true or false value
    */
    generateBooleanValue() {
        if (Math.floor(Math.random() * 10) % 2 == 0)
            return true
        return false
    }

    /*
        Return an array of 'x' amount of boolean value
    */
    generateNoOfValues(difficulty) {
        var rnd = Math.floor(Math.random() * 10);
        var arrOptions = [], x;
        if (difficulty == '1') {
            x = (rnd % 3 == 0) ? 2 : 3;
        } else {
            x = (rnd % 2 == 0) ? 4 : 5;
        }

        for (var i = 0; i < x; i++) {
            arrOptions.push(this.generateBooleanValue());
        }
        return arrOptions;
    }

    /*
        Return a string concatenated question
    */
    generateQuestion(difficulty) {
        var values = this.generateNoOfValues(difficulty);
        var query = values[0];
        for (var i = 1; i < values.length; i++) {
            if (Math.floor(Math.random() * 10) % 2 == 0) {
                query += ' && ' + values[i];
            } else {
                query += ' || ' + values[i];
            }
        }

        if (difficulty == '2' && Math.floor(Math.random() * 10) >= 6) {
            query = ' ! ( ' + query + ' )';
        }
        return query;
    }

    /*
        Return the evaulation of the question
    */
    generateAnswer(question) {
        return eval(question);
    }
}

module.exports = BooleanOperatorTemplate;
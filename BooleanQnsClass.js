/*
    Contain the following type(s) of question:
    - true && false
    - false && true || false && false
    - ! ( false && true && false || true )
*/
class BooleanOperatorTemplate {
    constructor() {
        this.question = this.generateQuestion();
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
    generateNoOfValues() {
        var rnd = Math.floor(Math.random() * 10);
        var arrOptions = [], x;
        x = (rnd % 3 == 0) ? 2 : 3;    
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
        var query = values[0];
        for (var i = 1; i < values.length; i++) {
            if (Math.floor(Math.random() * 10) % 2 == 0) {
                query += ' && ' + values[i];
            } else {
                query += ' || ' + values[i];
            }
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
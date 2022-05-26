const tokens = new Set([
    'true', 'false', '||', '&&', '!',
    'for', '<', '<=', '>', '>=',
    '+=', '-=', '++', '--', '%',
    '+', '-', '*', '/', '**',
    'length', 'new', '1D index', '2D index', 'pop',
    'push', 'if', 'else', 'switch', 'while',
    'do-while', 'function'
]);

class Tracker {
    constructor() {
        this.trackAll = {};
        this.trackIncorrect = {};
        for (const token of tokens) {
            this.trackAll[token] = 0;
            this.trackIncorrect[token] = 0;
        }
    }

    trackQuestion(questionString, countWrong) {
        var values = questionString.split(' ');
        for (const value of values) {
            if (!tokens.has(value))
                continue;

            this.trackAll[value]++;
            if (countWrong == 1)
                this.trackIncorrect[value]++;
        }

        for (const value of values) {
            if (value.includes('--')) {
                this.trackAll['--']++;
                if (countWrong == 1)
                    this.trackIncorrect['--']++;
            }
            if (value.includes('++')) {
                this.trackAll['++']++;
                if (countWrong == 1)
                    this.trackIncorrect['++']++;
            }
            if (value.includes('arr[')) {
                this.trackAll['1D index']++;
                if (countWrong == 1)
                    this.trackIncorrect['1D index']++;
            }
            if (value.includes('][')) {
                this.trackAll['2D index']++;
                if (countWrong == 1)
                    this.trackIncorrect['2D index']++;
            }
            if (value.includes('if')) {
                this.trackAll['if']++;
                if (countWrong == 1)
                    this.trackIncorrect['if']++;
            }
            if (value.includes('function')) {
                this.trackAll['function']++;
                if (countWrong == 1)
                    this.trackIncorrect['function']++;
            }
        }
    }
}

module.exports = Tracker;
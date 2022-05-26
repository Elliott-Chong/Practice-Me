const Tracker = require('./Tracker');
const BoolOpTemp = require('./BooleanQnsClass');
const ShorthandTemp = require('./ShorthandQnsClass');
const PPIDTemp = require('./PostPreIncreDecreQnsClass');
const IfElseTemp = require('./SelectionIfElseQnsClass');
const SwitchTemp = require('./SelectionSwitchQnsClass');
const ForLoopTemp = require('./RepetitionForQnsClass');
const DoWhileTemp = require('./RepetitionDoWhileQnsClass');
const WhileTemp = require('./RepetitionWhileQnsClass');
const ArrayTemp = require('./ArrayBasicQnsClass');
const FunctionTemp = require('./FunctionScopeQnsClass');
var readline = require('readline-sync');

function verifyAnswer(user, actual) {
    if (typeof (actual) == 'string') {
        //console.log('STRING')
        if (user.toUpperCase() == actual.toUpperCase()) {
            console.log('\x1b[32m%s\x1b[0m', 'Correct!\n');
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'Incorrect!\n');
            return 1;
        }
    } else if (typeof (actual) == 'boolean') {
        //console.log('BOOLEAN')
        if (user == actual.toString()) {
            console.log('\x1b[32m%s\x1b[0m', 'Correct!\n');
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'Incorrect!\n');
            return 1;
        }
    } else if (typeof (actual) == 'number') {
        if (isNaN(parseInt(user)) || user != actual) {
            console.log('\x1b[31m%s\x1b[0m', 'Incorrect!\n');
            return 1;
        } else {
            console.log('\x1b[32m%s\x1b[0m', 'Correct!\n');
        }
    }
}

var toContinue, difficulty, score = 0, qnsNum = 0;
var trackerObject = new Tracker();

do {
    var qns = '\nSelect your choice of difficulty:\n    (1) Basic\n    (2) Challenge Yourself\n>> ';
    difficulty = readline.question(qns);
} while (difficulty != '1' && difficulty != '2');

do {
    var chooseTopic = readline.question(`
Select topic to practice:

    (1) Operations (Boolean)
    (2) Operations (Shorthand)
    (3) Operations (Post/Pre In/Decrement)

    (4) Selection (if ... else)
    (5) Selection (switch)

    (6) Repetition (while)
    (7) Repetition (do ... while)
    (8) Repetition (for) 

    (11) Array Length
    (12) Array Indexing
    (13) Array Index Operations
    (14) Array Methods

    (15) Function (Scope of Variables)

    (0) Exit
    >> `);

    switch (chooseTopic) {
        case '1':
            do {
                var bool = new BoolOpTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of\x1b[33m ${bool.question}\x1b[0m ?`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, bool.answer);
                trackerObject.trackQuestion(bool.question, counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${bool.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '2':
            do {
                var short = new ShorthandTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${short.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, short.answer);
                trackerObject.trackQuestion(short.question[0], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${short.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '3':
            do {
                var PPID = new PPIDTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${PPID.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, PPID.answer);
                trackerObject.trackQuestion(PPID.question[0], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${PPID.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '4':
            do {
                var IE = new IfElseTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\x1b[33m${IE.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, IE.answer);
                trackerObject.trackQuestion(IE.question[0], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${IE.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '5':
            do {
                var swt = new SwitchTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${swt.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, swt.answer);
                trackerObject.trackQuestion(swt.question[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${swt.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '6':
            do {
                var justWhile = new WhileTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\x1b[33m${justWhile.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, justWhile.answer);
                trackerObject.trackQuestion(justWhile.question[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${justWhile.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '7':
            do {
                var doWhile = new DoWhileTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\x1b[33m${doWhile.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, doWhile.answer);
                trackerObject.trackQuestion(doWhile.question[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${doWhile.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '8':
            do {
                var forLoop = new ForLoopTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`How many time(s) does the console.log runs?\n\n\x1b[33m${forLoop.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, forLoop.answer);
                trackerObject.trackQuestion(forLoop.question[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${forLoop.answer}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '11':
            do {
                var ARR = new ArrayTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${ARR.question1[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, ARR.answer1);
                trackerObject.trackQuestion(ARR.question1[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${ARR.answer1}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '12':
            do {
                var ARR = new ArrayTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${ARR.question2[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, ARR.answer2);
                trackerObject.trackQuestion(ARR.question2[0], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${ARR.answer2}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '13':
            do {
                var ARR = new ArrayTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${ARR.question3[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, ARR.answer3);
                trackerObject.trackQuestion(ARR.question3[0], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${ARR.answer3}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '14':
            do {
                var ARR = new ArrayTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\n\x1b[33m${ARR.question4[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, ARR.answer4);
                trackerObject.trackQuestion(ARR.question4[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${ARR.answer4}\x1b[0m\n`);
                } else {
                    score++;
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
        case '15':
            do {
                var FN = new FunctionTemp(difficulty);
                console.log(`\n-----------------------------------------\n\x1b[33mQuestion ${++qnsNum}\x1b[0m`);
                console.log(`What is the output of the following code?\n\x1b[33m${FN.question[0]}\x1b[0m`);
                userAnswer = readline.question('>> ');
                var counter = verifyAnswer(userAnswer, FN.answer);
                trackerObject.trackQuestion(FN.question[1], counter);
                if (counter == 1) {
                    console.log(`Correct answer: \x1b[32m${FN.answer}\x1b[0m\n`);
                }
                toContinue = readline.question('Press \x1b[34mEnter\x1b[0m to CONTINUE, \x1b[31mX\x1b[0m to QUIT\n>');
            } while (toContinue == 0);
            break;
    }

} while (chooseTopic != 0);
// console.log('Incorrect', trackerObject.trackIncorrect);
// console.log('Total', trackerObject.trackAll);

const total = trackerObject.trackAll;
const incorrect = trackerObject.trackIncorrect;
const tokens = new Set([
    'true', 'false', '||', '&&', '!',
    'for', '<', '<=', '>', '>=',
    '+=', '-=', '++', '--', '%',
    '+', '-', '*', '/', '**',
    'length', 'new', '1D index', '2D index', 'pop',
    'push', 'if', 'else', 'switch', 'while',
    'do-while', 'function'
]);

console.log(`\nTotal Question\t: \x1b[32m${qnsNum}\x1b[0m`);
console.log(`Correct Question: \x1b[32m${score}\x1b[0m`);

var output = '\nOverall Performance:\n\n';

for (const token of tokens) {
    if (token.length == 1 && total[token] != 0) {
        output += `    '${token}'\t\t: ${total[token] - incorrect[token]}/${total[token]}\n`;

    } else if (total[token] != 0) {
        output += `    '${token}'\t: ${total[token] - incorrect[token]}/${total[token]}\n`;

    }
}
console.log(output);
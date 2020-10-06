const questions = {
    beginner: [
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'What is the result of the *test* **NaN === NaN** ?',
            code: '',
            options: ['true', 'false', "I don't know", 'None of the Above'],
            correctAnswer: 'true',
            explanation: 'NaN is never equal to any value even to itself? It is agreed that not all computations that leads to NaN are the same',
            reference: '[](JavaScript: The Definitive Guide by David Flanagan)',
            githubProfile: '[https://github.com/Mckenney17](McKenney17)',
            twitterProfile: '[https://twitter.com/Oluwarinolasam2](McKenney)',
        },
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'What is the output of these code?',
            code: `
            console.log(5 + '5');
            console.log(5 + 5);
            `,
            options: ['10, 55', '55, 10', '55, 55', '10, 10'],
            correctAnswer: '55, 10',
            explanation: 'If either or both operands of the **+ operator** is *a string*, it performs **concatenation**',
            reference: '[](JavaScript: The Definitive Guide by David Flanagan)',
            githubProfile: '',
            twitterProfile: '',
        },
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'Which of these are **Primitive Types** in JavaScript',
            code: '',
            options: ['String, Number, undefined', 'Array, null, Number', 'Boolean, Object, null', 'Function, undefined, Symbol'],
            correctAnswer: 'String, Number, undefined',
            explanation: '**Primitive Types** in JavaScript are: Number, String, undefined, null, Symbol, BigInt',
            reference: '[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures](MDN: Data Structures)',
            githubProfile: '',
            twitterProfile: '',
        },
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'Which of the following is a **Membership test** operator?',
            code: '',
            options: ['in', '==', '===', '&&'],
            correctAnswer: 'in',
            explanation: 'The **in** operator is used to test, if left operand(property) is present in the right operand(object)',
            reference: '',
            githubProfile: '',
            twitterProfile: '',
        },
        {
            language: 'javascript',
            questionType: 'mulltiple-answers',
            questionStatement: 'Choose from the following the **properties of the global object**',
            code: '',
            options: ['undefined', 'null', 'NaN', 'Infinity'],
            correctAnswer: ['undefined', 'NaN', 'Infinity'],
            explanation: '**undefined, NaN, Infinity** are properties of the **Window Object**',
            reference: '',
            githubProfile: '',
            twitterProfile: '',
        },
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'What is the output of this code?',
            code: `
            console.log(NaN == NaN || 2 && '' || [] && null)
            `,
            options: ['NaN', '2', '', 'null'],
            correctAnswer: 'null',
            explanation: 'The **||** logical operator selects the *truthy value* of its operands, while the **&&** logical operator selects the *falsy value* of its operands',
            reference: '',
            githubProfile: '[https://github.com/Mckenney17](McKenney17)',
            twitterProfile: '[https://twitter.com/Oluwarinolasam2](McKenney)',
        },
        {
            language: 'javascript',
            questionType: 'single-answer',
            questionStatement: 'What is the output of this code?',
            code: `
            function func() {
                var x = 2 + 3;
            }
            console.log(func());
            `,
            options: ['undefined', '5', 'Error', '23'],
            correctAnswer: 'undefined',
            explanation: 'The value of a function defaults to **undefined** if it has no return value',
            reference: '',
            githubProfile: '[https://github.com/Mckenney17](McKenney17)',
            twitterProfile: '[https://twitter.com/Oluwarinolasam2](McKenney)',
        },
    ],


    intermediate: [
        {
            language: 'javascript',
            questionStatement: 'A javascript intermediate question',

        },
        {
            language: 'java',
            questionStatement: 'A java intermediate question',

        },
        {
            language: 'python',
            questionStatement: 'A python intermediate question',

        },
    ],


    advanced: [
        {
            language: 'javascript',
            questionStatement: 'A javascript advanced question',

        },
        {
            language: 'java',
            questionStatement: 'A java advanced question',

        },
        {
            language: 'python',
            questionStatement: 'A python advanced question',

        },
    ],


    ninja: [
        {
            language: 'javascript',
            questionStatement: 'A javascript ninja question',

        },
        {
            language: 'java',
            questionStatement: 'A java ninja question',

        },
        {
            language: 'python',
            questionStatement: 'A python ninja question',

        },
    ],
};

export default questions;

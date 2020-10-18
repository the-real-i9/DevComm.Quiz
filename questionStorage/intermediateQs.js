const intermediateQs = () => ([
    {
        language: 'javascript',
        questionType: 'single-answer',
        questionStatement: 'What is the output of this code?',
        code: `
        const User = (name, age) => {
            this.name = name;
            this.age = age;
        }
        const user1 = new User('Dev', 25);
        console.log(user1);
        `,
        options: ['Error', 'A new Object', 'A new Constructor', 'undefined'],
        correctAnswer: 'Error',
        explanation: 'Arrow functions are not used as Constructors',
        reference: '',
        githubProfile: '[Mckenney17](https://github.com/Mckenney17)',
        twitterProfile: '[McKenney17](https://twitter.com/Oluwarinolasam2)',
    },
    {
        language: 'javascript',
        questionType: 'single-answer',
        questionStatement: 'What part of this code will be hoisted?',
        code: `
        let myAge = 23;
        \n
        function printAge() {
            console.log(myAge);
        }
        `,
        options: ['Both myAge and printAge()', 'Nothing', 'Just myAge', 'Just printAge()'],
        correctAnswer: 'Both myAge and printAge()',
        explanation: 'A function declaration will always get hoisted. Because the variable is declared with let, the variable is hoisted but NOT initialized. Meaning, that it cannot be used until it has been declared.',
        reference: '[W3 Schools: JavaScript Hoisting](https://www.w3schools.com/js/js_hoisting.asp)',
        githubProfile: '[IcedTeaTech](https://github.com/IcedTeaTech)',
        twitterProfile: '[icedteatech](https://twitter.com/icedteatech)',
    },
]);

export default intermediateQs;

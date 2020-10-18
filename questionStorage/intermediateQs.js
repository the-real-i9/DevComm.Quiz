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
        githubProfile: '[McKenney17](https://github.com/Mckenney17)',
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
        correctAnswer: 'Just the function printAge()',
        explanation: 'Variable hoisting will only happen with variables declared with *var*. Functions will be hoisted either when declared or when assigned to a *var*. However, in case of assigning a function to a *var*, only the declaration will be hoisted, not the function body',
        reference: '[W3 Schools: JavaScript Hoisting](https://www.w3schools.com/js/js_hoisting.asp)',
        githubProfile: '[IcedTeaTech](https://github.com/IcedTeaTech)',
        twitterProfile: '[icedteatech](https://twitter.com/icedteatech)'
    }
]);

export default intermediateQs;

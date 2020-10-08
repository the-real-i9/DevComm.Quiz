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
        githubProfile: '[https://github.com/Mckenney17](McKenney17)',
        twitterProfile: '[https://twitter.com/Oluwarinolasam2](McKenney)',
    },
    {
        language: 'java',
        questionStatement: 'A java intermediate question',

    },
    {
        language: 'python',
        questionStatement: 'A python intermediate question',

    },
]);

export default intermediateQs;

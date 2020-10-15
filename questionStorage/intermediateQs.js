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
]);

export default intermediateQs;

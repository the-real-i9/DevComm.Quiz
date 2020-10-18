# How to Contribute

> *There are many ways to contribute to Open Source as you may know. But I'll discuss the primary one first*.

The most important form of contribution is **adding your own question(s)** to the App from any Language.

I'll take a full **question example** to walk you through the steps.

---
## Step 1
---
Open the folder named [questionStorage](./questionStorage/), there you'll see four files:
* beginnerQs.js
* intermediateQs.js
* advancedQs.js
* ninjaQs.js

In each of the files(**e.g. beginnerQs.js**), you'll see this code snippet(provided we have no beginner question yet)

```js
const beginnerQs = () => ([

]);
```
The `Array` the arrow function returns, takes a **list** of objects known as the **Question Objects**.

> Important Note: If you're not familiar with JavaScript:
> * **Arrays** have syntax similar to the `List` data structure in Python. Like this: `[]`.
> * ***Object* Literals** have syntax similar to the `Dictionary` data structure in Python. Like this: `{}`
> ```js
> // javascript object literal syntax
> {
>   propertyName: propertyValue, 
> }
> ```
> *Pretty Easy!!!* **In Python**, the propertyName will be wrapped in quotes(string), it's also string in JS but you don't have to, unless you're accessing it like this: `object['propertyName']`
---
To add a question, go into the `Array` and include an **Object Literal** at the end of the array *provided one or more question object was initially present*. Now you'll have a snippet that looks like this:

```js
const beginnerQs = () => ([
    /* a question object */
    {

    },
    /* another question object */
    {

    },
]);
```
Now you want to fill the question object with these properties, **the values are explained in the steps that follow**.
```js
const beginnerQs = () => ([
    {
        language: /* value */,
        questionType: /* value */,
        questionStatement: /* value */,
        code: /* value */,
        options: /* value */,
        correctAnswer: /* value */,
        explanation: /* value */,
        reference: /* value */,
        githubProfile: /* value */,
        twitterProfile: /* value */,
    },
]);
```
---
## Step 2 (`language` property) (Mandatory)
---
> Value Type: String

This property takes the language string on which you're setting the question.

> Important Note: Provide the full abbreviation name of the language in **lowercase letters** For example, **cplusplus**, **NOT** **C++**, **cs**(for csharp) **NOT** **C#**, **c**, **javascript**, **python**, **ruby**, **html5**, **css3**.
```js
{
    language: 'python',
}
```
---
## Step 3 (`questionType` property) (Mandatory)
---
> Value Type: String

This property can take either of the two values: `single-answer` or `multiple-answers`.
* single-answer: If the question requires the user to select only one answer from the options given.
* multiple-answers: If the question requires the user to select more than one answer from the options given.
```js
{
    language: 'python',
    questionType: 'single-answer',
}
```
---
## Step 4 (`questionStatement` property) (Mandatory)
---
> Value Type: String

This property takes the question statement. For example, *What is the output of this code?*, *How many Object Types are there in Python?*
> Tip: You can use text formatting style to format the sentence like these:
> * **Bold** (\*\*bold text\*\*)
> * *Italic* (\*italized text\*)
> * Underline (\_\_underlined text\_\_)
> * `Code` ( \`code snippet\` )
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
}
```
---
## Step 5 (`code` property) (Optional)
---
> Value Type: Empty String('') or Template String(\`code snippet/block\`)
* If the question has **no code snippet**, the value would be an **empty string** ('').
* If the question has a code snippet, the value will be a code snippet **single-line** or **multi-line**, cleanly indented in **Double Backtics**(a.k.a. Template String).

Case 1: No Code snippet included
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
}
```
Case 2: Code snippet included
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'What is the output of this code?',
    code: `
    def add(a, b):
        sum = a + b
        return sum
    print(add(5, 6))
    `,
}
```
---
## Step 6 (`options` property) (Mandatory)
---
> Value Type: \<String\>Array 

This property takes an Array that contains a list of **4 options**, all list items(options) must be wrapped in quotes, i.e. it must be a **string data type**.

> Note: If array item includes an empty string, **wrap around the empty string an alternate quote** e.g. `"''"`. This is because JavaScript will read it as a JavaScript empty string and not a normal string as you have wanted it to be. An empty string to JavaScript is nothing.\
> *Bonus Tip: An empty string in JavaScript is a **falsy string**. Because String Data Types are truthy values and empty ones are falsy.*
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
}
```
---
## Step 7 (`correctAnswer` property) (Mandatory)
---
> Value Type: String or \<String\>Array
The value of this property is in **two cases**.
* Case 1: If your `questionType` value is **single-answer**, the `correctAnswer` value as you might have guessed will be a **string** that is the **correct answer** amongst the options given in the `options` property.
* Case 2: If your `questionType` value is **multiple-answers**, then the `correctAnswer` value will be an Array of Strings that includes the **correct answers** amongst the options given in the `options` property.

Case 1:
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: 'Dictionary',
}
```
Case 2:
```js
{
    language: 'python',
    questionType: 'multiple-answers',
    questionStatement: 'Select all Sequence Types in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: ['List', 'Tuple', 'String'],
}
```
> Note: Read the note on the previous step.
---
## Step 8 (`explanation` property) (Mandatory)
---
Value Type: String\
Give your explanation, you can also use text formatting syntax here:
> * **Bold** (\*\*bold text\*\*)
> * *Italic* (\*italized text\*)
> * Underline (\_\_underlined text\_\_)
> * `Code` ( \`code snippet\` )
```js
{
    language: 'python',
    questionType: 'multiple-answers',
    questionStatement: 'Select all Sequence Types in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: ['List', 'Tuple', 'String'],
    explanation: '**Sequence Types** in Python are __String, List and Tuple__',
}
```
---
## Step 9 (`reference` property) (Optional)
---
Value Type: '' (empty string) or \<Markdown hyperlink syntax\>String
* Case 1: **No reference**\
Value is an empty string.
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: 'Dictionary',
    explanation: '**Sequence Types** in Python are __String, List and Tuple__',
    reference: '',
}
```
* Case 2: **link text, but no link address**\
Value is this string syntax '\[linkText\]\(\)'\
When you do this, you have an program that converts the link text into a **search query** for google.
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: 'Dictionary',
    explanation: '**Sequence Types** in Python are __String, List and Tuple__',
    reference: '[Learning Python]()',
}
```
* Case 3: **link text, link address**\
Value is this string syntax '\[linkName\]\(linkAddress\)'
```js
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: 'Dictionary',
    explanation: '**Sequence Types** in Python are __String, List and Tuple__',
    reference: '[Learning Python](https://www.learningpython.com)',
}
```
---
## Step 10/11 (`githubProfile/twitterProfile` property) (Optional)
---
> Value Type: '' (empty string) or \<Markdown hyperlink syntax\>String

Even though this is Optional, I bet 90% developers will include this, *(smiles)*. As you'd have guessed, the value is a **hyperlink to your profile**, the guide for **Step 9** applies equally for these two steps.
> Warning: **Case 2 for Step 9** doesn't apply, You must have a username and a profile address. I guess you know that. Also your **link text** is your **username**, while your **link address** is a link to your **respective profiles**.
```js
/* a complete question object */
{
    language: 'python',
    questionType: 'single-answer',
    questionStatement: 'Which of these is **not** a Sequence Type in Python?',
    code: '',
    options: ['List', 'Tuple', 'String', 'Dictionary'],
    correctAnswer: 'Dictionary',
    explanation: '**Sequence Types** in Python are __String, List and Tuple__',
    reference: '[Learning Python](https://www.learningpython.com)',
    githubProfile: '[Mckenney17](https://www.github.com/Mckenney17)',
    twitterProfile: '[Mckenney17](https://www.twitter.com/Oluwarinolasam2)',
}
```

Okay!!! Oh! Oh!  I know this is long, but it's not complex, I just had to be detailed. You don't want a pull request rejected due to things you aren't aware of right?

---
# More ways to contribute
This is just another Open Source like many others out there, definitely there are many ways to contribute. The one above is just the primary contribution. I'll list some:
* Typo Correction.
* Make a question better if you're an expert.
* Fix question errors.
* Improve Explanations.
* Add reference if not added, improve existing ones.
* Fix Issues.
* Better App Design Suggestion.
* Please!!! Raise Issues! Raise Issues! Raise Issues! Raise Issues!
* *List goes on...*

> Final Words:\
I developed this App with the developer community in mind, it came from the idea that, what if as we learn day-by-day, we set quizzes from what we've learnt and share it to others, and also gain from others by solving their own quizzes too. And so I decided to create this. **We own this App together**, I'm just opportuned to be the creator, so lets nuture this baby together. I believe this App will solve some problems posed to the developer community, MOST ESPECIALLY FOR BEGINNERS.\
The highest good remark you could give to me or this App is:
> * Spreading the news about the App.
> * Contibuting to the App: Adding Questions, Fixing Bugs and more...

*I love you, I love the DEV Community. Thanks!*

Follow on [Twitter](https://twitter.com/Oluwarinolasam2)
# How to Contribute

> *There are many ways to contribute to Open Source as you may know. But I'll discuss the primary one first*.

The most important form of contribution is **adding your own question(s)** to the App from any Language.

I'll take a full **question example** to walk you through the steps.

---
## Step 1
---
Open the folder named [question](/src/utils/question), there you'll see three files:
* beginner.json
* intermediate.json
* advance.json

In any of these files, you'll add a new JSON question object,

Here is the JSON question object format, **the values are explained in the steps that follow**.
```json
[
    {
        "language": /* value */,
        "questionType": /* value */,
        "questionStatement": /* value */,
        "code": /* value */,
        "options": /* value */,
        "correctAnswer": /* value */,
        "explanation": /* value */,
        "reference": /* value */,
        "githubHandle": /* value */,
        "twitterHandle": /* value */,
    }
]
```
---
## Step 2 (`language` property) (*)
---
> Type: String

This property takes the language string on which you're setting the question.

> Important Note: Provide the full abbreviation name of the language in **lowercase letters** For example, **cplusplus**, **NOT** **C++**, **cs**(for csharp) **NOT** **C#**, **c**, **javascript**, **python**, **ruby**, **html5**, **css3**.
```json
{
    "language": "python"
}
```
---
## Step 3 (`questionType` property) (*)
---
> Type: String

This property can take either of the two values: `single-answer` or `multiple-answers`.
* single-answer: If the question requires the user to select only one answer from the options given.
* multiple-answers: If the question requires the user to select more than one answer from the options given.
```json
{
    "language": "python",
    "questionType": "single-answer"
}
```
---
## Step 4 (`questionStatement` property) (*)
---
> Type: String

This property takes the question statement. For example, *What is the output of this code?*, *How many Object Types are there in Python?*
> Tip: You can use markdown text formatting style to format the sentence like these:
> * **Bold** (\*\*bold text\*\*)
> * *Italic* (\*italized text\*)
> * Underline (\_\_underlined text\_\_)
> * `Code` ( \`code snippet\` )
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?"
}
```
---
## Step 5 (`code` property) (Optional)
---
> Type: Empty JSON String("") or Sring of code text with explicit special characters
* If the question has **no code snippet**, the value would be an **empty string** ("").
* If the question has a code snippet, the value will be a **single-line** code snippet, with explicit special characters. `(\n, \t, (Space Character))`

> **Caution**: I advice *you should not use the "Tab character (\t)"*. This is due to the fact that it results in too much spacing. I prefer **Four Spaces** for my Tab, so I insert space **(  )** four times.

Case 1: No Code snippet included
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": ""
}
```
Case 2: Code snippet included
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "What is the output of this code?",
    "code": "def add(a, b):\n    sum = a + b\n    return sum\nprint(add(5, 6))"
}
```
---
## Step 6 (`options` property) (*)
---
> Type: \<String\> Array 

This property takes an Array that contains a list of **4 options**, all list items(options) must be wrapped in double-quotes (**""**), i.e. it must be a **JSON string**. *Try as much as possible to make your options compact.*

> Note: If array item includes an empty string, **use a single-quote wrapped by a double-quote** e.g. `"''"`,  or escape the double-quote inside e.g. `"\"\""`. This is because JavaScript will read it as a JavaScript empty string and not a normal string as you have wanted it to be. An empty string to JavaScript is nothing.\
> *Bonus Tip: An empty string in JavaScript is a **falsy string**. Because String Data Types are truthy values and empty ones are falsy.*
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"]
}
```
---
## Step 7 (`correctAnswer` property) (*)
---
> Type: String or \<String\> Array
The value of this property is in **two cases**.
* Case 1: If your `questionType` value is **single-answer**, the `correctAnswer` value as you might have guessed will be a **string** that is the **correct answer** amongst the options given in the `options` property.
* Case 2: If your `questionType` value is **multiple-answers**, then the `correctAnswer` value will be an Array of Strings that includes the **correct answers** amongst the options given in the `options` property.

Case 1:
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": "Dictionary"
}
```
Case 2:
```json
{
    "language": "python",
    "questionType": "multiple-answers",
    "questionStatement": "Select all Sequence Types in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": ["List", "Tuple", "String"]
}
```
> Note: Read the note on the previous step.
---
## Step 8 (`explanation` property) (*)
---
Type: String\
Give your explanation, you can also use text formatting syntax here:
> * **Bold** (\*\*bold text\*\*)
> * *Italic* (\*italized text\*)
> * Underline (\_\_underlined text\_\_)
> * `Code` ( \`code snippet\` )
```json
{
    "language": "python",
    "questionType": "multiple-answers",
    "questionStatement": "Select all Sequence Types in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": ["List", "Tuple", "String"],
    "explanation": "**Sequence Types** in Python are __String, List and Tuple__",
}
```
---
## Step 9 (`reference` property) (Optional)
---
Type: "" (empty string) or \<Markdown hyperlink syntax\>String
* Case 1: **No reference**\
Value is an empty string.
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": "Dictionary",
    "explanation": "**Sequence Types** in Python are __String, List and Tuple__",
    "reference": "",
}
```
* Case 2: **link text, but no link address**\
Value is this string syntax "\[linkText\]\(\)"\
When you do this, you have an program that converts the link text into a **search query** for google.
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": "Dictionary",
    "explanation": "**Sequence Types** in Python are __String, List and Tuple__",
    "reference": "[Learning Python]()",
}
```
* Case 3: **link text, link address**\
Value is this string syntax "\[linkName\]\(linkAddress\)"
```json
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": "Dictionary",
    "explanation": "**Sequence Types** in Python are __String, List and Tuple__",
    "reference": "[Learning Python](https://www.learningpython.com)",
}
```
---
## Step 10/11 (`githubHandle/twitterHandle` property) (Optional)
---
> Type: "" (empty string) or \<Markdown hyperlink syntax\>String

Even though this is Optional, I bet 90% developers will include this, *(smiles)*. As you'd have guessed, the value is a **hyperlink to your profile**, the guide for **Step 9** applies equally for these two steps.
> Warning: **Case 2 for Step 9** doesn't apply, You must have a username and a profile address. I guess you know that. Also your **link name** is your **username**, while your **link address** is a link to your **respective handles**.
```json
/* a complete question object */
{
    "language": "python",
    "questionType": "single-answer",
    "questionStatement": "Which of these is **not** a Sequence Type in Python?",
    "code": "",
    "options": ["List", "Tuple", "String", "Dictionary"],
    "correctAnswer": "Dictionary",
    "explanation": "**Sequence Types** in Python are __String, List and Tuple__",
    "reference": "[Learning Python](https://www.learningpython.com)",
    "githubProfile": "[Mckenney17](https://www.github.com/Mckenney17)",
    "twitterProfile": "[Mckenney17](https://www.twitter.com/Oluwarinolasam2)",
}
```

Okay!!! Oh! Oh!  I know this is long, but it's not complex, I just had to be detailed. You don't want a pull request rejected due to things you aren't aware of right?

Check the question you just added at: [DevComm. Quiz](https://devcomm-quiz.netlify.app/)

![A typical question](quiz-page.png)

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
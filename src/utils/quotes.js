const quotes = [
    {
        quote: "Average habits, Average life. Great habits, Great life. It's that simple.",
        quoteAuthorFirstName: 'Amelia',
        quoteAuthorLastName: 'Warner',
        quoteAuthorTwitterAddress: 'https://twitter.com/facetimeJS',
        quoteAuthorTwitterUsername: 'facetimeJS',
    },
];

const getRandomQuote = () => quotes[Math.trunc(Math.random() * quotes.length)]

export default getRandomQuote
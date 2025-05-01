export interface Book {
  title: string;
  authors: string[];
  publisher: string;
  year: number;
}

const generateRandomBook = (): Book => {
  const titles: readonly string[] = [
    'Code Complete',
    'Clean Code',
    'The Pragmatic Programmer',
    'Design Patterns',
    'Refactoring'
  ];

  const authors: readonly string[][] = [
    ['Steve McConnell'],
    ['Robert C. Martin'],
    ['Andrew Hunt', 'David Thomas'],
    ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
    ['Martin Fowler']
  ];

  const publishers: readonly string[] = ['Microsoft Press', 'Addison-Wesley', 'Prentice Hall'];

  const years: readonly number[] = [2004, 1999, 1994, 2018, 2016];

  const randomIndex = <T>(arr: readonly T[]): number => Math.floor(Math.random() * arr.length);

  return {
    title: titles[randomIndex(titles)],
    authors: authors[randomIndex(authors)],
    publisher: publishers[randomIndex(publishers)],
    year: years[randomIndex(years)]
  };
};

export default generateRandomBook;
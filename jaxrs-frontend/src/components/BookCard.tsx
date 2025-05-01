import React from 'react';

export interface BookProps {
  book: {
    id: string;
    title: string;
    authors?: string[];
    publisher: string;
    year: number;
  };
  index?: number;
}

const BookCard: React.FC<BookProps> = ({ book, index }) => {
  return (
    <div className="card h-100 position-relative">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>Authors:</strong>{' '}
          {Array.isArray(book.authors) ? book.authors.join(', ') : 'Unknown'}
        </p>
        <p className="card-text">
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p className="card-text">
          <strong>Year:</strong> {book.year}
        </p>
      </div>
      {index && (
        <div
          className="position-absolute"
          style={{
            bottom: '10px',
            right: '10px',
            fontSize: '0.9rem',
            color: '#888',
          }}
        >
          #{index}
        </div>
      )}
    </div>
  );
};

export default BookCard;
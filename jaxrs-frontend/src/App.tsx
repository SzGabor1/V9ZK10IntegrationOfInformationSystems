import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard, { BookProps } from './components/BookCard';
import BookForm from './components/BookForm';
import generateRandomBook from './utils/randomBookGenerator';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<BookProps['book'][]>([]);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books`);
        if (response.headers['content-type']?.includes('application/json')) {
          if (Array.isArray(response.data)) {
            setBooks(response.data);
          } else if (response.data.books && Array.isArray(response.data.books)) {
            setBooks(response.data.books);
          } else {
            console.error('Unexpected API response format:', response.data);
            alert('Failed to load books. Unexpected response format.');
          }
        } else {
          console.error('Non-JSON response received:', response.data);
          alert('Failed to load books. Non-JSON response received.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books. Please try again later.');
      }
    };

    fetchBooks();
  }, [API_URL]);

  const addBook = async () => {
    const book = generateRandomBook();
    try {
      const response = await axios.post(`${API_URL}/books`, book);

      const newBook = {
        ...book,
        ...response.data,
        authors: Array.isArray(response.data.authors) ? response.data.authors : book.authors,
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding the book:', error);
      alert('Failed to add the book. Please try again.');
    }
  };

  const handleAddBookManually = async (book: { title: string; authors: string[]; publisher: string; year: number }) => {
    try {

      const response = await axios.post(`${API_URL}/books`, book);


      const newBook = {
        ...book,
        ...response.data,
        authors: Array.isArray(response.data.authors) ? response.data.authors : book.authors,
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding the book manually:', error);
      alert('Failed to add the book manually. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Books Collection</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary mr-2" onClick={addBook}>
          Add Random Book
        </button>
        <BookForm onAddBook={handleAddBookManually} />
      </div>

      <div className="row">
        {Array.isArray(books) && books.length > 0 ? (
          books
            .slice()
            .reverse()
            .map((book, index) => (
              <div className="col-md-4 mb-4" key={book.id}>
                <BookCard book={book} index={books.length - index} /> { }
              </div>
            ))
        ) : (
          <p className="text-center">No books available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
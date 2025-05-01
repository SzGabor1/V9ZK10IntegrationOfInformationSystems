import React, { useState } from 'react';

interface BookFormProps {
  onAddBook: (book: { title: string; authors: string[]; publisher: string; year: number }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !authors || !publisher || !year) {
      alert('Please fill in all fields.');
      return;
    }

    onAddBook({
      title,
      authors: authors.split(',').map((author) => author.trim()),
      publisher,
      year: parseInt(year, 10),
    });

    setTitle('');
    setAuthors('');
    setPublisher('');
    setYear('');
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
        Add Book Manually
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Book</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="authors">Authors (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="authors"
                      value={authors}
                      onChange={(e) => setAuthors(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                      type="text"
                      className="form-control"
                      id="publisher"
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookForm;
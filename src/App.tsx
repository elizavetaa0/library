import React from 'react';
import { BookList, BorrowBook, ReaderList } from './components';

function App() {
  return (
    <div className="App">
      <h1>Library System</h1>
      <BookList />
      <ReaderList />
      <BorrowBook />
    </div>
  );
}

export default App;

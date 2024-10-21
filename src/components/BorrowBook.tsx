import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { bookStore, readerStore } from '../stores';
import { Select, Button } from 'antd';
import style from './styles.module.css';

export const BorrowBook = observer(() => {
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>();
  const [selectedReaderId, setSelectedReaderId] = useState<string | undefined>();
  const [isBookAlreadyBorrowed, setIsBookAlreadyBorrowed] = useState(false);

  useEffect(() => {
    if (selectedBookId && selectedReaderId) {
      const reader = readerStore.getReaders().find((r) => r.id === selectedReaderId);
      if (reader) {
        const alreadyBorrowed = reader.borrowedBooks.some((b) => b.id === selectedBookId);
        setIsBookAlreadyBorrowed(alreadyBorrowed);
      } else {
        setIsBookAlreadyBorrowed(false);
      }
    } else {
      setIsBookAlreadyBorrowed(false);
    }
  }, [selectedBookId, selectedReaderId]);

  const borrowBook = () => {
    if (selectedBookId && selectedReaderId && !isBookAlreadyBorrowed) {
      const book = bookStore.getBooks().find((b) => b.id === selectedBookId);
      if (book) {
        readerStore.borrowBook(selectedReaderId, book);
        setSelectedBookId(undefined);
        setSelectedReaderId(undefined);
      }
    }
  };

  return (
    <div>
      <h2>Взятые книги</h2>
      <div className={style.container__row}>
        <Select
          placeholder='Выбрать читателя'
          className={style.select}
          value={selectedReaderId}
          onChange={setSelectedReaderId}
          options={readerStore.getReaders().map((r) => ({ label: r.lastName, value: r.id }))} 
        />
        <Select
          placeholder='Выбрать книгу'
          className={style.select}
          value={selectedBookId}
          onChange={setSelectedBookId}
          options={bookStore.getBooks().map((b) => ({ label: b.title, value: b.id }))} 
        />
        <Button
          onClick={borrowBook}
          disabled={isBookAlreadyBorrowed || !selectedBookId || !selectedReaderId}
        >
          Добавить
        </Button>
      </div>
      {isBookAlreadyBorrowed && (
        <p className={style.warning__text}>
          Читатель уже взял данную книгу!
        </p>
      )}
    </div>
  );
});

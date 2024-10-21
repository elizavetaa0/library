import { makeAutoObservable, runInAction } from 'mobx';
import { Book } from './bookStore';

export interface Reader {
  id: string;
  lastName: string;
  borrowedBooks: Book[];
}

export class ReaderStore {
  readers: Reader[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  addReader(lastName: string) {
    const newReader: Reader = { id: Date.now().toString(), lastName, borrowedBooks: [] };
    runInAction(() => {
      this.readers.push(newReader);
      this.saveToLocalStorage();
    });
  }

  borrowBook(readerId: string, book: Book) {
    const reader = this.readers.find((r) => r.id === readerId);
  
    if (reader) {
      runInAction(() => {
        const alreadyBorrowed = reader.borrowedBooks.some((b) => b.id === book.id);
        if (!alreadyBorrowed) {
          reader.borrowedBooks.push(book);
          this.saveToLocalStorage();
        }
      });
    }
  }

  getBooksForReader(readerId: string) {
    const reader = this.readers.find((r) => r.id === readerId);
    return reader ? reader.borrowedBooks : [];
  }

  getReaders() {
    return this.readers;
  }

  private saveToLocalStorage() {
    localStorage.setItem('readers', JSON.stringify(this.readers));
  }

  private loadFromLocalStorage() {
    const storedReaders = localStorage.getItem('readers');
    if (storedReaders) {
      this.readers = JSON.parse(storedReaders);
    }
  }
}

export const readerStore = new ReaderStore();

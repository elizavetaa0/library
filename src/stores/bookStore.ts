import { makeAutoObservable, runInAction } from 'mobx';

export interface Book {
  id: string;
  title: string;
  description: string;
}

export class BookStore {
  books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  addBook(title: string, description: string) {
    const newBook: Book = { id: Date.now().toString(), title, description };
    runInAction(() => {
      this.books.push(newBook);
      this.saveToLocalStorage();
    });
  }

  getBooks() {
    return this.books;
  }

  private saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  private loadFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }
}

export const bookStore = new BookStore();

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { bookStore } from '../stores';
import { List, Button, Input, Collapse } from 'antd';
import style from './styles.module.css';

const { Panel } = Collapse;

export const BookList = observer(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addBook = () => {
    if (title && description) {
      bookStore.addBook(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addBook();
    }
  };

  const isBookExists = bookStore.getBooks().some((book) => book.title.toLowerCase() === title.toLowerCase());

  return (
    <div>
      <h2>Книги</h2>
      <div className={style.container__column}>
        <Input
          placeholder='Название'
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          onKeyDown={handleKeyDown}
          className={style.input}
        />
        <Input
          placeholder='Описание'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className={style.input}
        />
        <Button
          onClick={addBook}
          disabled={isBookExists}
          className={style.button}
        >
          Добавить книгу
        </Button>
        {isBookExists && (
          <p className={style.warning__text}>
            Книга с таким названием уже существует!
          </p>
        )}
        <Collapse accordion>
          <Panel header='Список книг' key='1'>
            <List
              dataSource={bookStore.getBooks()}
              renderItem={(book) => (
                <List.Item>
                  <Collapse>
                    <Panel header={book.title} key={book.id}>
                      <p>{book.description}</p>
                    </Panel>
                  </Collapse>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
});

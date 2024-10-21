import { observer } from 'mobx-react-lite';
import { List } from 'antd';
import { Reader } from '../stores/readerStore';

interface ReaderBooksProps {
  reader: Reader;
}

export const ReaderBooks = observer(({ reader }: ReaderBooksProps) => {
  return (
    <div>
      {reader.borrowedBooks.length > 0 ? (
        <List
          dataSource={reader.borrowedBooks}
          renderItem={(book) => (
            <List.Item key={book.id}>
              <strong>{book.title}</strong> - {book.description}
            </List.Item>
          )}
        />
      ) : (
        <p>Нет взятых книг</p>
      )}
    </div>
  );
});

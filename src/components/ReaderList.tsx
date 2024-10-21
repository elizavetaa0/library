import { observer } from 'mobx-react-lite';
import { readerStore } from '../stores';
import { List, Button, Input, Collapse } from 'antd';
import { useState } from 'react';
import style from './styles.module.css';
import { ReaderBooks } from '.';

const { Panel } = Collapse;

export const ReaderList = observer(() => {
  const [lastName, setLastName] = useState('');

  const addReader = () => {
    if (lastName) {
      readerStore.addReader(lastName);
      setLastName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addReader();
    }
  };

  return (
    <div>
      <h2>Читатель</h2>
      <div className={style.container__column}>
        <Input
          placeholder='Фамилия'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyDown}
          className={style.input}
        />
        <Button
          onClick={addReader}
          className={style.button}
        >
          Добавить читателя
        </Button>
        <List
          dataSource={readerStore.readers}
          renderItem={(reader) => (
            <List.Item key={reader.id}>
              <Collapse>
                <Panel header={reader.lastName} key={reader.id}>
                  <ReaderBooks reader={reader} />
                </Panel>
              </Collapse>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
});

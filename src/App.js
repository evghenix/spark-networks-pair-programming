import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Converter from './components/Converter';

const App = () => {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history') || '[]'));

  const handleSubmit = (payload) => {
    const newHistory = [payload, ...history];
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  return (
    <>
      <Converter onSubmit={handleSubmit} />
      <h1>History</h1>
      <ul>
        {history.map(({ conversionDate, sourceCur, targetCur, sourceVal, resultVal }) => (
          <li key={conversionDate}>{`${resultVal} ${targetCur} was ${sourceVal} ${sourceCur}`}</li>
        ))}
      </ul>
    </>
  );
};

ReactDom.render(<App />, document.getElementById('root'));

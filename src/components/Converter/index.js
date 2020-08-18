import React, { useState, useEffect } from 'react';
import useService from '../../hooks/useService';
import getRatesService from '../../services/getRatesService';

const Converter = ({ onSubmit }) => {
  const [sourceVal, setSourceVal] = useState(10);
  const [resultVal, setResultVal] = useState(0);
  const [sourceCur, setSourceCur] = useState('USD');
  const [targetCur, setTargetCur] = useState('EUR');

  const [response, fetchRates, isLoading, hasError] = useService(getRatesService);

  useEffect(() => {
    fetchRates({ base: sourceCur });
  }, [sourceCur]);

  if (!response || isLoading || hasError) return null;

  const { rates } = response;

  const handleInputChange = ({ target }) => {
    setSourceVal(target.value);
  };

  const handleButtonClick = () => {
    const newResult = sourceVal * rates[targetCur];
    setResultVal(newResult);

    onSubmit({ conversionDate: Date.now(), sourceCur, targetCur, sourceVal, resultVal: newResult });
  };

  const handleSourceCurChange = ({ target }) => {
    const { value } = target;
    setSourceCur(value);
  };

  const handleTargetCurChange = ({ target }) => {
    const { value } = target;
    setTargetCur(value);
  };

  return (
    <div>
      <div>{resultVal}</div>
      <input type="text" value={sourceVal} onChange={handleInputChange} />
      <select onChange={handleSourceCurChange} defaultValue={sourceCur}>
        {Object.keys(rates).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <select onChange={handleTargetCurChange} defaultValue={targetCur}>
        {Object.keys(rates).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={handleButtonClick}>Convert</button>
    </div>
  );
};

export default Converter;

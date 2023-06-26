import React, { useState } from 'react';

const Tables = () => {
  const [rows, setRows] = useState([]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleAddRow = () => {
    if (inputValue1.trim() !== '' && inputValue2.trim() !== '') {
      setRows([...rows, [inputValue1, inputValue2]]);
      setInputValue1('');
      setInputValue2('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue1}
        onChange={handleInputChange1}
        placeholder="Enter category "
      />
      <input
        type="text"
        value={inputValue2}
        onChange={handleInputChange2}
        placeholder=" Enter budget"
      />
      <button onClick={handleAddRow}>Add Row</button>
      <table>
        <thead>
          <tr>
            <th>Value 1</th>
            <th>Value 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;

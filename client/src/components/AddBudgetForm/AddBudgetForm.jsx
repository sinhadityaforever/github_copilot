import React, { useEffect, useRef,useState } from 'react';

import "./AddBudgetForm.css";

const AddBudgetForm = () => {
    const [month, setMonth] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform any desired logic with the submitted values
      console.log('Submitted month:', month);
      console.log('Submitted amount:', amount);
    };
  
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">SET BUDGET</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="monthInput" className="form-label">Month</label>
              <input
                type="text"
                className="form-control"
                id="monthInput"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amountInput" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amountInput"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddBudgetForm;
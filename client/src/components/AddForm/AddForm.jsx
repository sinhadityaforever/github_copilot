import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserBudgetApi } from '../../api/apiCalls';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUserBudget } from '../../features/transactionState/transactionStateSlice';

import './AddForm.css';

//id 1 means month card, id 2 means year card
const AddForm = ({ name, id }) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.transactionState.userInfo);

	const [amount, setAmount] = useState(
		id === 1 ? userData.monthBudget : userData.yearBudget
	);

	const handleSubmit = async (e) => {
		const token = localStorage.getItem('token');
		e.preventDefault();
		var pattern = /^(?!$)\d+$/;
		if (!pattern.test(amount)) {
			toast.error('Please enter a valid amount');
			return;
		} else {
			await updateUserBudgetApi(
				token,
				id === 1 ? { monthBudget: amount } : { yearBudget: amount }
			);
			dispatch(updateUserBudget({ id, amount }));
		}

		console.log('Submitted amount:', amount);
	};

	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="monthInput" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="monthInput"
							value={
								id === 1
									? new Date().toLocaleString('default', { month: 'long' })
									: new Date().getFullYear()
							}
							// onChange={(e) => setMonth(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="amountInput" className="form-label">
							Overall Budget
						</label>
						<input
							type="number"
							className="form-control"
							id="amountInput"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddForm;

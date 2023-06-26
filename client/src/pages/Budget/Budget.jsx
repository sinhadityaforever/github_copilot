import React, { useEffect, useState } from 'react';
import './Budget.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Category from '../../components/Category/Category';
import NewTable from '../../components/NewTable/NewTable';
import Enter from '../../components/Enter/Enter';
import AddForm from '../../components/AddForm/AddForm';
import FinanceScore from '../../components/FinanceScore/FinanceScore';

import { addCategoryBudget } from '../../features/transactionState/transactionStateSlice';
import { addBudgetDataApi } from '../../api/apiCalls';

function Budget() {
	const token = localStorage.getItem('token');
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			const isMobileView = window.matchMedia('(max-width: 768px)').matches;
			setIsMobile(isMobileView);
		};
		handleResize();

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const dispatch = useAppDispatch();

	const [selectedCategoryId, setSelectedCategoryId] = useState();

	const [newValue, setNewValue] = useState(0);
	var budgetData = useAppSelector(
		(state) => state.transactionState.categoryWiseBudget
	);
	var allowedBudgetData = [...budgetData];
	// var defaultBudgetObject = allowedBudgetData.filter(
	// 	(budget) => budget.categoryId === selectedCategoryId
	// )[0];
	// if (!defaultBudgetObject) {
	// 	defaultBudgetObject = {
	// 		categoryId: selectedCategoryId,
	// 		budget: 0
	// 	};
	// }
	const [defaultBudget, setDefaultBudget] = useState(0);

	const handleCategory = (category) => {
		setSelectedCategoryId(category.id);
		console.log(category.value);
		const defaultBudgetUpdated = allowedBudgetData.find(
			(budget) => budget.categoryId === category.id
		);
		setDefaultBudget(defaultBudgetUpdated ? defaultBudgetUpdated.budget : 0);
	};

	const newBudgetHandler = (e) => {
		setNewValue(e.target.value);
	};
	const setBudgetHandler = async () => {
		await addBudgetDataApi(token, {
			categoryId: selectedCategoryId,
			budget: newValue
		});
		setDefaultBudget(newValue);
		dispatch(
			addCategoryBudget({ categoryId: selectedCategoryId, budget: newValue })
		);
	};
	const transactionsData = [];

	const tableTransactionsData = [...transactionsData];
	tableTransactionsData.sort((a, b) => new Date(b.date) - new Date(a.date));

	const recentTransactions = tableTransactionsData.slice(0, 9);

	return (
		<div className="Budget">
			{isMobile && <h1 className="budget-title">Budget</h1>}
			<br />
			<br />

			{isMobile ? (
				<div className="grid-contain">
					<div style={{ position: 'relative' }}>
						<FinanceScore />
					</div>
					<div className="budget-box-container">
						<div className="budget-box">
							<AddForm name={'THIS MONTH'} id={1} />
						</div>
						<div className="budget-box">
							<AddForm name="THIS YEAR" id={2} />
						</div>
					</div>
				</div>
			) : (
				<div className="grid-contain">
					<div className="budget-box-container">
						<div className="budget-box">
							<AddForm name="THIS MONTH" id={1} />
						</div>
						<div className="budget-box">
							<AddForm name="THIS YEAR" id={2} />
						</div>
					</div>

					<div style={{ position: 'relative', top: '-35px' }}>
						<FinanceScore />
					</div>
				</div>
			)}

			<h4
				style={{ marginLeft: '10px', marginTop: '2rem', marginBottom: '2rem' }}
			>
				Set category-wise budget:
			</h4>
			<br />

			<div className="grid-container">
				<div className="first-grid-container">
					{/* //Select Category Component */}
					<Enter selectedCategory={handleCategory} />
				</div>

				<div class="form__linput merge">
					<input
						class="form__input"
						type="number"
						name="fname"
						id="fname"
						pattern="\w{1,}"
						value={defaultBudget}
						style={{ height: '54px' }}
					></input>
					<label class="form__label" for="fname">
						CURRENT BUDGET
					</label>
				</div>

				<div
					class="form__linput merge"
					style={{ position: 'relative', top: '1px' }}
				>
					<input
						class="form__input"
						type="number"
						name="lname"
						id="lname"
						required
						value={newValue}
						onChange={newBudgetHandler}
						style={{ position: 'relative', top: '-4px', height: '57px' }}
					/>
					<label class="form__label" for="lname">
						NEW BUDGET
					</label>
				</div>

				<div className="light">
					<button onClick={setBudgetHandler} className="merge btnstyle">
						<div className="font">
							<strong>+ SET</strong>
						</div>
					</button>
					{/* <label class="form__label" for="button">+ Add</label> */}
				</div>
			</div>
			<br />

			<NewTable rows={recentTransactions} />
			<br />
			<br />
			<br />
			<h4>Deeper look at category-wise budget:</h4>
			<div className="categorywise-budget-bars">
				<Category />
			</div>
			<br />
			<br />
		</div>
	);
}

export default Budget;

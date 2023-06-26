import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import './Category.css';

const inlineStyle = {
	height: '15px'
};

const BudgetItem = (props) => {
	return (
		<section className="budget-item-container">
			<BudgetItemName {...props} />
			<AllocationItem {...props} />
			<ProgressBar {...props} />
		</section>
	);
};

const BudgetItemName = ({ categoryName }) => {
	return (
		<div className="budget-item" title={categoryName}>
			{categoryName}
		</div>
	);
};

const AllocationItem = ({ categorySpent, categoryBudget }) => {
	return (
		<div className="allocation">
			<span className={'money '}>
				{categorySpent > categoryBudget ? 'Exceeded by: ' : 'Safe to spend: '}
			</span>
			<span
				className={
					'money ' +
					(categorySpent > categoryBudget ? 'over-budget' : 'under-budget')
				}
			>
				₹{Math.abs(categoryBudget - categorySpent)}
			</span>
		</div>
	);
};

const ProgressBar = ({ categorySpent, categoryBudget }) => {
	return (
		<div
			className={
				'progress-bar ' + (categorySpent > categoryBudget ? 'over-budget' : '')
			}
			style={inlineStyle}
		>
			<progress max={categoryBudget} value={categorySpent}>
				{categorySpent}
			</progress>
		</div>
	);
};

const Category = () => {
	const [rows, setRows] = useState([]);
	var categories = useAppSelector((state) => state.transactionState.categories);
	var budgetData = useAppSelector(
		(state) => state.transactionState.categoryWiseBudget
	);
	useEffect(() => {
		const tableRows = budgetData.map((item) => {
			const category = categories.find((cat) => cat.id === item.categoryId);
			return {
				categoryId: item.categoryId,
				categoryName: category ? category.value : '',
				categoryBudget: item.budget,
				categorySpent: item.amountSpent
			};
		});
		setRows(tableRows);
	}, [budgetData, categories]);
	return (
		<div>
			{rows.map((item) => {
				return <BudgetItem {...item} />;
			})}
		</div>
	);
};

export default Category;

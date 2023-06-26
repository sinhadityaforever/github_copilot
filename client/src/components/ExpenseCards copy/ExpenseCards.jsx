import React from 'react';
import './ExpenseCards.css';

import { expenseCardData } from '../../Data copy/Data';

import BudgetCard from '../ExpenseCard copy/ExpenseCard';
import { useAppSelector } from '../../app/hooks';

const BudgetCards = () => {
	const categories = useAppSelector(
		(state) => state.transactionState.categories
	);
	return (
		<div className="Cards">
			{expenseCardData.map((card, id) => {
				return (
					<div className="parentContainer" key={id}>
						<BudgetCard
							categories={categories
								.filter((category) => category.type === card.type)
								.map((category) => category.value)}
							title={card.title}
							color={card.color}
							png={card.png}
							type={card.type}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default BudgetCards;

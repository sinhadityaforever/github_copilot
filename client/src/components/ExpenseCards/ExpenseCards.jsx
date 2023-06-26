import React from 'react';
import './ExpenseCards.css';

import { expenseCardData } from '../../Data/Data';

import ExpenseCard from '../ExpenseCard/ExpenseCard';
import { useAppSelector } from '../../app/hooks';

const ExpenseCards = () => {
	const categories = useAppSelector(
		(state) => state.transactionState.categories
	);
	return (
		<div className="Cards">
			{expenseCardData.map((card, id) => {
				return (
					<div className="parentContainer" key={id}>
						<ExpenseCard
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

export default ExpenseCards;

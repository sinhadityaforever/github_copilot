import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './CategoryChart.css';
function CategoryChart({ transactionsData }) {
	//Parsing data for graph
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
	const expenseTransactions = transactionsData.filter((transaction) => {
		const transactionDate = new Date(transaction.date);

		if (
			transaction.type === 'expense' &&
			transactionDate.getMonth() === new Date().getMonth()
		) {
			return transaction;
		}
	});
	const expenseCategories = [
		...new Set(expenseTransactions.map((transaction) => transaction.category))
	];
	const expenseAmountSums = expenseCategories.map((category) => {
		const categoryTransactions = expenseTransactions.filter(
			(transaction) => transaction.category === category
		);
		const categoryAmountSum = categoryTransactions.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);
		return categoryAmountSum;
	});
	//Parsing ends

	const initializer = {
		series: expenseAmountSums,

		options: {
			labels: expenseCategories,
			chart: {
				type: 'donut',
				foreColor: 'white'
			},
			responsive: [
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 280,
							height: 280
						},
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		}
	};

	const styles = isMobile ? { marginLeft: '3rem' } : {};

	return (
		<div className="chart">
			{transactionsData.length > 0 &&
			expenseAmountSums.length > 0 &&
			expenseCategories.length > 0 ? (
				<ReactApexChart
					style={styles}
					series={initializer.series}
					options={initializer.options}
					type="donut"
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default CategoryChart;

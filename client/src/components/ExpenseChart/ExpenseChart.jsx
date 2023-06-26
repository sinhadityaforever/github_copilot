import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ExpenseChart({ transactionsData }) {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			const isMobileView = window.matchMedia('(max-width: 768px)').matches;
			setIsMobile(isMobileView);
		};

		// Initial check on component mount
		handleResize();

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	var expense = 0;
	var income = 0;

	const getData = () => {
		transactionsData.forEach((item) => {
			const itemDate = new Date(item.date);
			if (
				item.type === 'expense' &&
				itemDate.getMonth() === new Date().getMonth()
			) {
				expense += item.amount;
			} else if (
				item.type === 'income' &&
				itemDate.getMonth() === new Date().getMonth()
			) {
				income += item.amount;
			}
		});
	};
	getData();

	const initializer = {
		series: [
			{
				data: [income, expense]
			}
		],
		options: {
			colors: ['#03DAC5'],

			title: {
				text: 'This Month',
				align: 'left',
				margin: 10,
				offsetX: 10,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '20px',
					fontWeight: 'bold',
					fontFamily: undefined,
					color: 'white'
				}
			},

			chart: {
				type: 'bar',

				foreColor: 'white'
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					horizontal: false
				}
			},
			dataLabels: {
				enabled: true
			},
			xaxis: {
				categories: ['Income', 'Expense']
			}
		}
	};

	const styles = isMobile
		? { marginTop: '5rem', marginLeft: '2rem' }
		: { marginTop: '5rem' };

	return (
		<div>
			<ReactApexChart
				style={styles}
				options={initializer.options}
				series={initializer.series}
				type="bar"
				height={isMobile ? '200' : 200}
				width={isMobile ? '300' : 450}
			/>
		</div>
	);
}

export default ExpenseChart;

import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const AreaChart = ({ lastFiveYearData }) => {
	const data = [...lastFiveYearData];
	const date = new Date();
	const thisYear = date.getFullYear();
	const incomes = data
		.sort((a, b) => a.index - b.index)
		.map((item) => item.income);

	const expenses = data
		.sort((a, b) => a.index - b.index)
		.map((item) => item.expense);

	const savings = data
		.sort((a, b) => a.index - b.index)
		.map((item) => item.income - item.expense);

	const years = [
		thisYear - 4,
		thisYear - 3,
		thisYear - 2,
		thisYear - 1,
		thisYear
	];

	const incomeData = years.map((year, index) => {
		return {
			x: year,
			y: incomes[index]
		};
	});
	const expenseData = years.map((year, index) => {
		return {
			x: year,
			y: expenses[index]
		};
	});
	const savingsData = years.map((year, index) => {
		return {
			x: year,
			y: savings[index]
		};
	});

	const chartRef = useRef(null);
	var colorPalette = ['#00D8B6', '#008FFB', '#FF4560'];

	useEffect(() => {
		const options = {
			chart: {
				height: 340,
				width: 400,
				type: 'area',
				zoom: {
					enabled: false
				}
			},
			responsive: [
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 290
						},
						yaxis: {
							labels: {
								show: false
							}
						}
					}
				}
			],
			stroke: {
				curve: 'straight'
			},
			colors: colorPalette,
			series: [
				{
					name: 'Income',
					data: incomeData
				},
				{
					name: 'Savings',
					data: savingsData
				},
				{
					name: 'Expense',
					data: expenseData
				}
			],
			fill: {
				opacity: 1
			},
			// title: {
			// 	text: '',
			// 	align: 'left',
			// 	style: {
			// 		fontSize: '18px',
			// 		color: 'white'
			// 	}
			// },
			markers: {
				size: 0,
				style: 'hollow',
				hover: {
					opacity: 5
				}
			},
			tooltip: {
				intersect: true,
				shared: false
			},
			xaxis: {
				tooltip: {
					enabled: true
				},
				labels: {
					show: true,
					style: {
						colors: 'white'
					}
				},
				axisTicks: {
					show: true
				}
			},
			yaxis: {
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				},
				labels: {
					show: false,
					style: {
						colors: 'white'
					}
				}
			},
			legend: {
				show: true,
				labels: {
					colors: 'white'
				}
			}
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, []);

	return <div className="chart-container" id="area" ref={chartRef}></div>;
};

export default AreaChart;

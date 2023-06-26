import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const StackedBarChart = ({ sixMonthsCategoryData, categories }) => {
	const chartRef = useRef(null);
	const data = [...sixMonthsCategoryData];
	const result = data.map(({ categoryId, data }) => {
		const category = categories.find((category) => category.id === categoryId);
		const reversedData = data.slice().reverse();
		return { name: category.value, data: reversedData };
	});

	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const currentDate = new Date();
	const lastSixMonths = [];

	for (let i = 0; i <= 5; i++) {
		const monthIndex = currentDate.getMonth() - i;
		const year =
			currentDate.getFullYear() + Math.floor((currentDate.getMonth() - i) / 12);
		const month = monthNames[monthIndex >= 0 ? monthIndex : monthIndex + 12];
		lastSixMonths.push(month + ' ' + year);
	}

	useEffect(() => {
		const options = {
			series: result,
			chart: {
				type: 'bar',
				height: 350,
				width: 350,
				stacked: true,
				stackType: '100%'
			},
			responsive: [
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 300
						},

						legend: {
							position: 'bottom'
						}
					}
				}
			],
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			stroke: {
				width: 1,
				colors: ['#fff']
			},
			// title: {
			// 	text: '100% Stacked Bar',
			// 	style: {
			// 		color: 'white'
			// 	}
			// },
			xaxis: {
				categories: lastSixMonths,
				labels: {
					style: {
						colors: 'white'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: 'white'
					}
				}
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val;
					}
				}
			},
			fill: {
				opacity: 1
			},
			legend: {
				position: 'top',
				horizontalAlign: 'left',
				offsetX: 40,
				labels: {
					colors: 'white'
				}
			}
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		// Clean up on component unmount
		return () => {
			chart.destroy();
		};
	}, []);

	return <div id="chart" ref={chartRef}></div>;
};

export default StackedBarChart;

import React, { useEffect, useRef } from 'react';
import 'apexcharts/dist/apexcharts.css';
import ApexCharts from 'apexcharts';
import { useAppSelector } from '../../app/hooks';

const Histogram = ({ lastFiveYearData }) => {
	const chartRef = useRef(null);
	const date = new Date();
	const data = [...lastFiveYearData];
	const thisYear = date.getFullYear();
	const incomes = data
		.sort((a, b) => a.index - b.index)
		.map((item) => item.income);

	const expenditures = data
		.sort((a, b) => a.index - b.index)
		.map((item) => item.expense);

	useEffect(() => {
		const options = {
			series: [
				{
					name: 'Income',
					data: incomes
				},
				{
					name: 'Expenditure',
					data: expenditures
				}
			],
			chart: {
				type: 'bar',
				height: 400,
				width: 400
			},
			responsive: [
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 300
						},
						yaxis: {
							labels: {
								show: false
							}
						}
					}
				}
			],
			plotOptions: {
				bar: {
					vertical: true,
					dataLabels: {
						position: 'top'
					}
				}
			},
			dataLabels: {
				enabled: true,
				offsetX: -6,
				style: {
					fontSize: '12px',
					colors: ['#fff']
				}
			},
			stroke: {
				show: true,
				width: 1,
				colors: ['#fff']
			},
			tooltip: {
				shared: true,
				intersect: false
			},
			xaxis: {
				categories: [
					thisYear - 4,
					thisYear - 3,
					thisYear - 2,
					thisYear - 1,
					thisYear
				],
				labels: {
					show: true,
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
			legend: {
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
	}, [expenditures, incomes, thisYear]);

	return <div id="chart" ref={chartRef}></div>;
};

export default Histogram;

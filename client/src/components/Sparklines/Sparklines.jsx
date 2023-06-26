import React, { useEffect, useState } from 'react';
import 'apexcharts/dist/apexcharts.css';
import ApexCharts from 'apexcharts';
import { useAppSelector } from '../../app/hooks';

class Sparklines extends React.Component {
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
	}

	componentDidMount() {
		this.renderChart();
	}

	renderChart() {
		const data = this.props.thisYearData;
		const thisYearData = [...data];
		const income = thisYearData
			.sort((a, b) => b.index - a.index)
			.map((item) => item.income);

		const total = income.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		const formattedMoney = total.toLocaleString('en-US', {
			style: 'currency',
			currency: 'INR',
			maximumFractionDigits: 0
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
		const lastTwelveMonths = [];

		for (let i = 11; i >= 0; i--) {
			const monthIndex = currentDate.getMonth() - i;
			const year =
				currentDate.getFullYear() +
				Math.floor((currentDate.getMonth() - i) / 12);
			const month = monthNames[monthIndex >= 0 ? monthIndex : monthIndex + 12];
			lastTwelveMonths.push(month + ' ' + year);
		}

		var sparklineData = income;

		var spark1 = {
			chart: {
				id: 'sparkline1',
				group: 'sparklines',
				type: 'area',
				height: 160,
				sparkline: {
					enabled: true
				},
				parentHeightOffset: 0
			},
			stroke: {
				curve: 'straight'
			},
			fill: {
				opacity: 1
			},
			series: [
				{
					name: 'Income',
					data: sparklineData
				}
			],
			labels: lastTwelveMonths,
			yaxis: {
				min: 0
			},
			colors: ['#5DEBB8'],
			title: {
				text: formattedMoney,
				offsetX: 30,
				style: {
					fontSize: '24px',
					color: 'white',
					cssClass: 'apexcharts-yaxis-title'
				}
			},
			subtitle: {
				text: 'Salary',
				offsetX: 30,
				style: {
					fontSize: '14px',
					color: 'white',
					cssClass: 'apexcharts-yaxis-title'
				}
			}
		};

		var chartOptions = {
			...spark1,
			chart: {
				...spark1.chart,
				parentHeightOffset: 0
			}
		};

		new ApexCharts(this.chartRef.current, chartOptions).render();
	}

	render() {
		return <div ref={this.chartRef} />;
	}
}

export default Sparklines;

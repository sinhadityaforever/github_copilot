import React from 'react';
import ApexCharts from 'apexcharts';

class Sparklines3 extends React.Component {
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
		const savings = thisYearData
			.sort((a, b) => b.index - a.index)
			.map((item) => item.income - item.expenditure);

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

		const total = savings.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);

		const formattedMoney = total.toLocaleString('en-US', {
			style: 'currency',
			currency: 'INR',
			maximumFractionDigits: 0
		});

		var spark3 = {
			chart: {
				id: 'sparkline3',
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
					name: 'Savings',
					data: savings
				}
			],
			labels: lastTwelveMonths,
			yaxis: {
				min: 0
			},

			colors: ['#008FFB'],
			title: {
				text: formattedMoney,
				offsetX: 30,
				style: {
					fontSize: '24px',
					cssClass: 'apexcharts-yaxis-title',
					color: 'white'
				}
			},
			subtitle: {
				text: 'Savings',
				offsetX: 30,
				style: {
					fontSize: '14px',
					color: 'white',
					cssClass: 'apexcharts-yaxis-title'
				}
			}
		};

		var chartOptions = {
			...spark3,
			chart: {
				...spark3.chart,
				parentHeightOffset: 0
			}
		};

		new ApexCharts(this.chartRef.current, chartOptions).render();
	}

	render() {
		return <div ref={this.chartRef} />;
	}
}

export default Sparklines3;

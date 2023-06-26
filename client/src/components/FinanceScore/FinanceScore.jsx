import React, { useEffect, useRef } from 'react';
import 'apexcharts/dist/apexcharts.css';
import ApexCharts from 'apexcharts';
import { useAppSelector } from '../../app/hooks';

const FinanceScore = () => {
	const chartRef = useRef(null);
	const budgetData = useAppSelector(
		(state) => state.transactionState.categoryWiseBudget
	);

	useEffect(() => {
		function calculateCategoryScore(budget, amountSpent) {
			if (amountSpent <= budget) {
				const spentPercentage = (amountSpent / budget) * 100;
				return 100 - Math.pow(spentPercentage, 0.5); // Non-linear mapping
			}
			return 0;
		}

		let totalScore = 0;
		let totalCount = 0;
		budgetData.forEach((category) => {
			const { budget, amountSpent } = category;
			const categoryScore = calculateCategoryScore(budget, amountSpent);

			totalScore += categoryScore;
			totalCount++;
		});

		const score = totalScore / totalCount;

		var options = {
			series: score < 0 ? [0] : [score],
			chart: {
				height: 350,
				position: 'relative',
				top: '-20px',

				type: 'radialBar',
				toolbar: {
					show: true
				}
			},
			plotOptions: {
				radialBar: {
					startAngle: -135,
					endAngle: 225,
					hollow: {
						margin: 0,
						size: '70%',
						background: '#fff',
						image: undefined,
						imageOffsetX: 0,
						imageOffsetY: 0,
						position: 'front',
						dropShadow: {
							enabled: true,
							top: 3,
							left: 0,
							blur: 4,
							opacity: 0.24
						}
					},
					track: {
						background: '#fff',

						strokeWidth: '90%',

						margin: 0, // margin is in pixels
						dropShadow: {
							enabled: true,
							top: -3,
							left: 0,
							blur: 4,
							opacity: 0.35
						}
					},

					dataLabels: {
						show: true,
						name: {
							offsetY: -10,
							show: true,
							color: '#888',
							fontSize: '17px'
						},
						value: {
							formatter: function (val) {
								return parseInt(val);
							},
							color: '#111',
							fontSize: '36px',
							show: true
						}
					}
				}
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'horizontal',
					shadeIntensity: 0.5,
					gradientToColors: ['#02d5b2'],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 100]
				}
			},
			stroke: {
				lineCap: 'round'
			},

			labels: ['Budget Score']
		};

		var chart = new ApexCharts(document.querySelector('#chart'), options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [budgetData]);

	return <div id="chart" ref={chartRef}></div>;
};

export default FinanceScore;

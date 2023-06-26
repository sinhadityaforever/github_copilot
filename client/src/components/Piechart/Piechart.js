import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const DonutChart = ({ sixMonthsCategoryData, categories }) => {
	const chartRef = useRef(null);

	const data = [...sixMonthsCategoryData];
	const result = data.map(({ categoryId, data }) => {
		const category = categories.find((category) => category.id === categoryId);
		const sum = data.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		return { category: category.value, value: sum };
	});

	const values = result.map((item) => item.value);
	const categoriesName = result.map((item) => item.category);

	useEffect(() => {
		const options = {
			series: values,
			chart: {
				width: 450,
				height: 450,
				foreColor: 'white',
				type: 'donut',
				dropShadow: {
					enabled: true,
					color: '#fff',
					top: -1,
					left: 3,
					blur: 3,
					opacity: 0.2
				}
			},
			responsive: [
				{
					breakpoint: 768,
					options: {
						chart: {
							width: 300,
							height: 300
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
				width: 0
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							total: {
								showAlways: true,
								show: true,
								color: 'white'
							},
							name: {
								color: 'white'
							}
						}
					}
				}
			},
			labels: categoriesName,
			dataLabels: {
				style: {
					color: 'white'
				},
				dropShadow: {
					blur: 3,
					opacity: 0.8
				}
			},
			fill: {
				// type: 'pattern',
				opacity: 1,
				pattern: {
					enabled: true,
					style: [
						'verticalLines',
						'squares',
						'horizontalLines',
						'circles',
						'slantedLines'
					]
				}
			},
			states: {
				hover: {
					filter: 'none'
				}
			},
			theme: {
				palette: 'palette2'
			},

			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [categoriesName, values]);

	return <div id="chart" ref={chartRef}></div>;
};

export default DonutChart;

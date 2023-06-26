import React, { Component } from 'react';
import Chart from 'react-apexcharts';

import ApexCharts from 'apexcharts';
import './Insights.css';
import Histogram from '../../components/Histogram/Histogram';
import Sparklines from '../../components/Sparklines/Sparklines';
import Sparklines2 from '../../components/Sparklines2/Sparklines2';
import Sparklines3 from '../../components/Sparklines3/Sparklines3';
import DonutChart from '../../components/Piechart/Piechart';
import AreaChart from '../../components/Areachart/Areachart';
import StackedBarChart from '../../components/Savingschart/Savingschart';
import { fontFamily } from '@mui/system';
import { useAppSelector } from '../../app/hooks';

function Insights() {
	const lastFiveYearData = useAppSelector(
		(state) => state.transactionState.lastFiveYearData
	);
	const thisYearData = useAppSelector(
		(state) => state.transactionState.thisYearData
	);
	const sixMonthsCategoryData = useAppSelector(
		(state) => state.transactionState.sixMonthsCategoryData
	);
	const categories = useAppSelector(
		(state) => state.transactionState.categories
	);

	return (
		<div className="container">
			<div className="heading1-container">
				<h1
					style={{
						color: 'white',
						marginTop: '2rem',
						fontSize: '2rem',
						fontWeight: 'bolder'
					}}
				>
					This Year
				</h1>
			</div>
			<div class="row sparkboxes mt-2 mb-4">
				<div class="col-md-4">
					<div class="column1">
						<Sparklines thisYearData={thisYearData} />
					</div>
				</div>
				<div class="col-md-4">
					<div class="column2">
						<Sparklines2 thisYearData={thisYearData} />
					</div>
				</div>
				<div class="col-md-4">
					<div class="column3">
						<Sparklines3 thisYearData={thisYearData} />
					</div>
				</div>
			</div>

			<div>
				<h1
					style={{
						color: 'white',
						marginTop: '1rem',
						fontSize: '2rem',
						fontWeight: 'bolder',
						marginTop: '4rem'
					}}
				>
					Last 5 Years
				</h1>
			</div>
			<div class="row mt-2 mb-4">
				<div class="col-md-6 box-container">
					<div class="box">
						<Histogram lastFiveYearData={lastFiveYearData} />
					</div>
				</div>

				<div class="col-md-6 box-container">
					<div class="box">
						<AreaChart lastFiveYearData={lastFiveYearData} />
					</div>
				</div>
			</div>
			<div>
				<h1
					style={{
						color: 'white',
						marginTop: '1rem',
						fontSize: '2rem',
						fontWeight: 'bolder',
						marginTop: '4rem'
					}}
				>
					Category-wise expenses (Last 6 Months)
				</h1>
			</div>
			<div class="row mt-2 mb-4">
				<div class="col-md-6 box-container">
					<div class="box">
						<DonutChart
							sixMonthsCategoryData={sixMonthsCategoryData}
							categories={categories}
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="box box-container">
						<StackedBarChart
							sixMonthsCategoryData={sixMonthsCategoryData}
							categories={categories}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Insights;

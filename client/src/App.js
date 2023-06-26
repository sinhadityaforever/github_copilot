import { useEffect, useState } from 'react';
import './App.css';
import * as ReactDOM from 'react-dom/client';

import Budget from './pages/Budget/Budget';
import Dashboard from './pages/Dashboard/Dashboard';
import Insights from './pages/Insights/Insights';
import Profile from './pages/profile/Profile';
import Sidebar from './components/Sidebar';
import { useAppDispatch } from './app/hooks';
import {
	getBudgetDataApi,
	getTransactionsApi,
	getUserInfoApi
} from './api/apiCalls';
import { toast, ToastContainer } from 'react-toastify';
import {
	login,
	setCategoryBudget,
	setTransactionData,
	setUserInfo
} from './features/transactionState/transactionStateSlice';
import PreloaderScreen from './pages/PreloaderScreen/PreloaderScreen';

import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (token) {
			getUserInfoApi(token)
				.then((response) => {
					console.log(response);
					dispatch(setUserInfo(response));
					dispatch(login());
					setIsLoading(false);
				})
				.catch((error) => {
					navigate('/login');
				});

			getTransactionsApi(token)
				.then((response) => {
					response.transactions.forEach((element) => {
						element.transactionId = element._id;
					});
					dispatch(setTransactionData(response));
				})
				.catch((error) => {
					toast.error(
						'An error occurred while loading transactions, Please refresh'
					);
				});

			getBudgetDataApi(token)
				.then((response) => {
					dispatch(setCategoryBudget(response.budgetData));
					setIsLoading(false);
				})
				.catch((error) => {
					toast.error(
						'An error occurred while loading Budgets, Please refresh'
					);
				});
		} else {
			navigate('/login');
		}
	}, [dispatch, navigate, token]);

	const [sidebarOption, setSidebarOption] = useState(0);
	const handleChildProp = (childProp) => {
		setSidebarOption(childProp);
	};

	const renderComponent = () => {
		switch (sidebarOption) {
			case 0:
				return <Dashboard />;
			case 1:
				return <Budget />;
			case 2:
				return <Insights />;
			case 3:
				return <Profile />;

			default:
				return <Dashboard />;
		}
	};

	return (
		<React.Fragment>
			{isLoading ? (
				<PreloaderScreen />
			) : (
				<div className="App">
					<ToastContainer />
					<div className="AppGlass">
						<Sidebar onChildProp={handleChildProp} />

						{renderComponent()}
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

export default App;

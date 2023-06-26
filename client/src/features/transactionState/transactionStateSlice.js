import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: {},
	isLoggedIn: false,
	showEditModal: false,
	editModalData: {},
	categories: [
		{ id: 0, value: 'Food', type: 'expense' },
		{ id: 1, value: 'Business', type: 'income' },
		{ id: 2, value: 'Clothes', type: 'expense' },
		{ id: 3, value: 'Education', type: 'expense' },
		{ id: 4, value: 'Entertainment', type: 'expense' },
		{ id: 5, value: 'Health', type: 'expense' },
		{ id: 6, value: 'Gifts', type: 'expense' },
		{ id: 7, value: 'Investments', type: 'income' },
		{ id: 8, value: 'Other', type: 'expense' },
		{ id: 9, value: 'Salary', type: 'income' },
		{ id: 10, value: 'Other', type: 'income' }
	],

	transactions: [],

	//Note: index 0 represents current year, index -1 represents previous year and so on
	lastFiveYearData: [],

	//Note: index 0 represents current month, index -1 represents previous month and so on
	thisYearData: [],

	//Note: in data array, index 0 represents current month, index 1 represents previous month and so on
	sixMonthsCategoryData: [],

	categoryWiseBudget: []
};

const transactionStateSlice = createSlice({
	name: 'transactionState',
	initialState,
	reducers: {
		addTransaction: (state, action) => {
			//todo: edit the lastId logic
			action.payload.amount = parseInt(action.payload.amount);

			const currMonth = new Date().getMonth();
			const newMonth = new Date(action.payload.date).getMonth();
			const monthDiff = currMonth - new Date(action.payload.date).getMonth();
			const rev = {
				0: 5,
				1: 4,
				2: 3,
				3: 2,
				4: 1
			};

			state.transactions.push({
				...action.payload
			});
			if (action.payload.type === 'income') {
				state.lastFiveYearData[0].income += action.payload.amount;
				state.thisYearData[monthDiff].income += action.payload.amount;
			} else {
				state.lastFiveYearData[0].expense += action.payload.amount;
				state.thisYearData[monthDiff].expenditure += action.payload.amount;
				const categoryIdToUpdate = state.categories.find(
					(category) =>
						category.value === action.payload.category &&
						category.type === 'expense'
				).id;
				const categoryToUpdate = state.sixMonthsCategoryData.find(
					(category) => category.categoryId === categoryIdToUpdate
				);
				if (categoryToUpdate) {
					categoryToUpdate.data[rev[monthDiff]] += action.payload.amount;
				}

				if (newMonth === currMonth) {
					console.log('hit');
					const budgetToUpdate = state.categoryWiseBudget.find(
						(item) => item.categoryId === categoryIdToUpdate
					);
					if (budgetToUpdate) {
						budgetToUpdate.amountSpent += action.payload.amount;
					}
				}
			}
		},
		openModal: (state, action) => {
			// const editId = action.payload;
			// state.editModalData = state.transactions.find(
			// 	(transaction) => transaction.transactionId === editId
			// );
			// console.log(state.editModalData);
			state.showEditModal = true;
		},
		closeModal: (state) => {
			// state.editModalData = {};
			state.showEditModal = false;
		},
		editTransaction: (state, action) => {
			var { transactionId, name, date, category, amount } = action.payload;
			amount = parseInt(amount);
			const transactionToEdit = state.transactions.find(
				(transaction) => transaction.transactionId === transactionId
			);
			const prevAmount = transactionToEdit.amount;
			const initialMonth = new Date(transactionToEdit.date).getMonth();
			const currMonth = new Date().getMonth();
			const finalMonth = new Date(date).getMonth();

			transactionToEdit.name = name;
			transactionToEdit.date = date;
			transactionToEdit.category = category;
			transactionToEdit.amount = amount;

			if (transactionToEdit.type === 'income') {
				const monthDiff = new Date().getMonth() - new Date(date).getMonth();
				state.lastFiveYearData[0].income -= prevAmount;
				state.lastFiveYearData[0].income += amount;
				state.thisYearData[monthDiff].income -= prevAmount;
				state.thisYearData[monthDiff].income += amount;
			} else {
				const monthDiff = new Date().getMonth() - new Date(date).getMonth();
				const rev = {
					0: 5,
					1: 4,
					2: 3,
					3: 2,
					4: 1
				};
				state.lastFiveYearData[0].expense -= prevAmount;
				state.lastFiveYearData[0].expense += amount;
				state.thisYearData[monthDiff].expenditure -= prevAmount;
				state.thisYearData[monthDiff].expenditure += amount;
				console.log(category);
				const categoryIdToUpdate = state.categories.find(
					(_category) =>
						_category.value === category && _category.type === 'expense'
				).id;
				const categoryToUpdate = state.sixMonthsCategoryData.find(
					(category) => category.categoryId === categoryIdToUpdate
				);
				if (categoryToUpdate) {
					categoryToUpdate.data[rev[monthDiff]] -= prevAmount;
					categoryToUpdate.data[rev[monthDiff]] += amount;
				}

				if (finalMonth === currMonth) {
					const budgetToUpdate = state.categoryWiseBudget.find(
						(item) => item.categoryId === categoryIdToUpdate
					);
					if (initialMonth === currMonth) {
						budgetToUpdate.amountSpent -= prevAmount;
						budgetToUpdate.amountSpent += amount;
					} else {
						budgetToUpdate.amountSpent += amount;
					}
				} else {
					if (initialMonth === currMonth) {
						const budgetToUpdate = state.categoryWiseBudget.find(
							(item) => item.categoryId === categoryIdToUpdate
						);
						budgetToUpdate.amountSpent -= prevAmount;
					}
				}
			}
		},
		deleteTransaction: (state, action) => {
			console.log(action.payload);
			const transactionToDelete = state.transactions.find(
				(transaction) => transaction.transactionId === action.payload
			);
			const transactionMonth = new Date(transactionToDelete.date).getMonth();
			if (transactionToDelete.type === 'income') {
				const monthDiff =
					new Date().getMonth() - new Date(transactionToDelete.date).getMonth();

				state.lastFiveYearData[0].income -= transactionToDelete.amount;
				state.thisYearData[monthDiff].income -= transactionToDelete.amount;
			} else {
				const monthDiff =
					new Date().getMonth() - new Date(transactionToDelete.date).getMonth();
				const rev = {
					0: 5,
					1: 4,
					2: 3,
					3: 2,
					4: 1
				};
				state.lastFiveYearData[0].expense -= transactionToDelete.amount;
				state.thisYearData[monthDiff].expenditure -= transactionToDelete.amount;
				const categoryIdToUpdate = state.categories.find(
					(category) =>
						category.value === transactionToDelete.category &&
						category.type === 'expense'
				).id;
				const categoryToUpdate = state.sixMonthsCategoryData.find(
					(category) => category.categoryId === categoryIdToUpdate
				);
				if (categoryToUpdate) {
					categoryToUpdate.data[rev[monthDiff]] -= transactionToDelete.amount;
				}
				if (transactionMonth === new Date().getMonth()) {
					const budgetToUpdate = state.categoryWiseBudget.find(
						(item) => item.categoryId === categoryIdToUpdate
					);
					budgetToUpdate.amountSpent -= transactionToDelete.amount;
				}
			}
			state.transactions = state.transactions.filter(
				(transaction) => transaction.transactionId !== action.payload
			);
		},

		setCategoryBudget(state, action) {
			const datas = action.payload;
			const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)

			state.categoryWiseBudget = datas.map((category) => {
				const categoryTransactions = state.transactions.filter(
					(transaction) =>
						transaction.category ===
							state.categories[category.categoryId].value &&
						transaction.type === 'expense' &&
						new Date(transaction.date).getMonth() === currentMonth
				);
				console.log(JSON.stringify(categoryTransactions));
				const amountSpent = categoryTransactions.reduce(
					(acc, curr) => acc + curr.amount,
					0
				);
				console.log(amountSpent);
				return {
					...category,
					amountSpent
				};
			});

			console.log(JSON.stringify(state.categoryWiseBudget) + 'hello');
		},

		addCategoryBudget: (state, action) => {
			const { categoryId, budget } = action.payload;
			console.log(categoryId, budget);
			const budgetToUpdate = state.categoryWiseBudget.find(
				(category) => category.categoryId === categoryId
			);
			if (!budgetToUpdate) {
				const currentMonth = new Date().getMonth();
				const category = state.categories.find((cat) => cat.id === categoryId);
				const categoryTransactions = state.transactions.filter(
					(transaction) =>
						transaction.category === category.value &&
						transaction.type === 'expense' &&
						new Date(transaction.date).getMonth() === currentMonth
				);
				const amountSpent = categoryTransactions.reduce(
					(acc, curr) => acc + curr.amount,
					0
				);

				state.categoryWiseBudget.push({
					categoryId,
					budget,
					amountSpent
				});

				return;
			}
			console.log(budgetToUpdate);
			budgetToUpdate.budget = budget;
		},
		deleteCategoryBudget: (state, action) => {
			const categoryId = action.payload;
			console.log(categoryId);
			state.categoryWiseBudget = state.categoryWiseBudget.filter(
				(category) => category.categoryId !== categoryId
			);
		},
		login: (state, action) => {
			state.isLoggedIn = true;
		},
		logout: (state, action) => {
			localStorage.clear();
			state.isLoggedIn = false;
		},
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		setTransactionData: (state, action) => {
			state.transactions = action.payload.transactions;
			state.transactions.forEach((transaction) => {
				transaction.date = new Date(transaction.date)
					.toISOString()
					.split('T')[0];
			});
			state.lastFiveYearData = action.payload.lastFiveYearData;
			state.thisYearData = action.payload.thisYearData;
			state.sixMonthsCategoryData = action.payload.sixMonthsCategoryData;
		},
		updateUserBudget: (state, action) => {
			const { id, amount } = action.payload;
			id === 1
				? (state.userInfo.monthBudget = amount)
				: (state.userInfo.yearBudget = amount);
		}
	}
});

export const {
	addTransaction,
	openModal,
	closeModal,
	editTransaction,
	deleteTransaction,
	addCategoryBudget,
	deleteCategoryBudget,
	login,
	logout,
	setUserInfo,
	setTransactionData,
	setCategoryBudget,
	updateUserBudget
} = transactionStateSlice.actions;
export default transactionStateSlice.reducer;

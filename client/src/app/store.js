import { configureStore } from '@reduxjs/toolkit';
import transactionStateReducer from '../features/transactionState/transactionStateSlice';

export const store = configureStore({
	reducer: {
		transactionState: transactionStateReducer
	}
});

import axios from 'axios';
import { toast } from 'react-toastify';
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

//auth calls
export const signupApi = async (body) => {
	toast.info('Signing up...');
	const { firstname, lastname, email, password } = body;
	try {
		const response = await api.post('/auth/signup', {
			firstname,
			lastname,
			email,
			password
		});
		toast.success(response.data.message + ' Please login to continue');
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const loginApi = async (body) => {
	toast.info('Logging in...');
	const { email, password } = body;
	try {
		const response = await api.post('/auth/login', {
			email,
			password
		});
		toast.success('Logged in successfully');
		return response.data.token;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

//user calls
export const getUserInfoApi = async (token) => {
	try {
		const response = await api.get(`/user/getUser`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const updateUserInfoApi = async (token, body) => {
	try {
		const response = await api.put(`/user/updateUser`, body, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('User info updated successfully');
		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const getNewAvatarApi = async (token) => {
	toast.info('Getting new avatar...', {
		autoClose: 500
	});
	try {
		const response = await api.get(`/user/getNewAvatar`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const updateUserBudgetApi = async (token, body) => {
	try {
		const response = await api.post(`/user/updateUserBudget`, body, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('Budget updated successfully');
		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

//transaction calls
export const getTransactionsApi = async (token) => {
	try {
		const response = await api.get(`/transactions`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const addTransactionApi = async (token, body) => {
	try {
		const response = await api.post(`/transactions`, body, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('Transaction added successfully');
		return response.data.transactionId;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const deleteTransactionApi = async (token, transactionId) => {
	try {
		const response = await api.delete(`/transactions/${transactionId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('Transaction deleted successfully');
		return response;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

export const updateTransactionApi = async (token, transactionId, body) => {
	try {
		const response = await api.put(`/transactions/${transactionId}`, body, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('Transaction updated successfully');
		return response;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

//budget calls
export const getBudgetDataApi = async (token) => {
	try {
		const response = await api.get(`/budget`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const addBudgetDataApi = async (token, body) => {
	try {
		const { categoryId, budget } = body;
		const response = await api.post(
			`/budget`,
			{ categoryId, budget },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		toast.success('Budget added successfully');
		return response.data;
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || 'An error occurred while adding budget';
		toast.error(errorMessage);
		throw error;
	}
};

export const deleteBudgetDataApi = async (token, categoryId) => {
	try {
		const response = await api.delete(`/budget/${categoryId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		toast.success('Budget deleted successfully');
		return response;
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'An error occurred';
		toast.error(errorMessage);
		throw error;
	}
};

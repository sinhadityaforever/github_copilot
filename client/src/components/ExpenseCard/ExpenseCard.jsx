import React, { useState } from 'react';
import './ExpenseCard.css';

import { motion, AnimateSharedLayout } from 'framer-motion';
import {
	TextField,
	Button,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { addTransaction } from '../../features/transactionState/transactionStateSlice';
import { addTransactionApi } from '../../api/apiCalls';

// parent Card

const ExpenseCard = (props) => {
	return (
		<AnimateSharedLayout>
			<CompactCard param={props} />
		</AnimateSharedLayout>
	);
};

const lightColor = {
	input: {
		color: 'white',
		'&::placeholder': {
			opacity: 1
		}
	},
	label: {
		color: 'white'
	}
};

// Compact Card
function CompactCard({ param }) {
	const currDate = new Date();
	const prevSixMonthDate = new Date(currDate.setMonth(currDate.getMonth() - 5));
	const currMonth = currDate.getMonth();
	const [name, setName] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('Other');
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const dispatch = useAppDispatch();
	const nameHandler = (event) => {
		setName(event.target.value);
	};
	const categoryHandler = (event) => {
		setCategory(event.target.value);
	};
	const dateHandler = (event) => {
		console.log('trigerred');

		setDate(event.target.value);
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const onlyNumbers = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
		event.target.value = onlyNumbers;
		setAmount(event.target.value);
	};

	const submitHandler = async () => {
		if (!name || !amount || !category || !date) {
			console.log(name, amount, category, date);
			return;
		}

		const token = localStorage.getItem('token');
		const transactionId = await addTransactionApi(token, {
			name,
			date,
			type: param.type,
			category,
			amount
		});

		dispatch(
			addTransaction({
				name,
				date,
				type: param.type,
				category,
				amount,
				transactionId
			})
		);
	};

	const Png = param.png;
	return (
		<motion.div
			className="CompactCard"
			style={{
				background: '#BB86FC'
				// boxShadow: param.color.boxShadow
			}}
		>
			<div className="topDiv">
				<div className="title">
					<span>{param.title}</span>
				</div>
				<div className="topIcon">
					<Png size="2rem" />
				</div>
			</div>
			<div className="topInput">
				<div className="expense-name">
					<TextField
						sx={lightColor}
						label="Name"
						variant="standard"
						onChange={nameHandler}
					></TextField>
				</div>
				<div className="amount">
					<TextField
						variant="standard"
						type="text"
						label="Amount"
						onInput={handleInputChange}
						sx={lightColor}
					/>
				</div>
			</div>
			<div className="bottomInput">
				<div className="date">
					<TextField
						variant="standard"
						type="date"
						inputProps={{
							max: new Date().toISOString().split('T')[0],
							min: prevSixMonthDate.toISOString().split('T')[0]
						}}
						defaultValue={new Date().toISOString().split('T')[0]}
						onChange={dateHandler}
						sx={lightColor}
					/>
				</div>
				<div className="category">
					<FormControl fullWidth>
						<InputLabel id="category">Category</InputLabel>
						<Select
							sx={{
								color: 'white'
							}}
							onChange={categoryHandler}
							required
							variant="standard"
							labelId="category"
							label="Category"
							value={category}
						>
							{param.categories.map((category) => {
								return <MenuItem value={category}>{category}</MenuItem>;
							})}
						</Select>
					</FormControl>
				</div>
			</div>
			<Button
				onClick={submitHandler}
				className="add-button"
				variant="contained"
				sx={{
					backgroundColor: '#1D1D1D',
					':hover': { backgroundColor: '#636363' }
				}}
			>
				Add
			</Button>
		</motion.div>
	);
}

// Expanded Card

export default ExpenseCard;

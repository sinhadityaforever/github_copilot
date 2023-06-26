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

// parent Card

const BudgetCard = (props) => {
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
	const [name, setName] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('Other');
	const [date, setDate] = useState();
	const dispatch = useAppDispatch();
	const nameHandler = (event) => {
		setName(event.target.value);
	};
	const categoryHandler = (event) => {
		setCategory(event.target.value);
	};
	const dateHandler = (event) => {
		setDate(event.target.value);
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const onlyNumbers = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
		event.target.value = onlyNumbers;
		setAmount(event.target.value);
	};

	const submitHandler = () => {
		if (!name || !amount || !category || !date) return;
		dispatch(
			addTransaction({
				name,
				date,
				type: param.type,
				category,
				amount
			})
		);
	};

	const Png = param.png;
	return (
		<motion.div
			className="CompactCard"
			style={{
				background: 'rgb(3, 218, 197)'
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
						onInput={dateHandler}
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
							{/* <MenuItem value={'groceries'}>Groceries</MenuItem>
							<MenuItem value={'clothes'}>Clothes</MenuItem>
							<MenuItem value={'investments'}>Investment</MenuItem> */}
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

export default BudgetCard;

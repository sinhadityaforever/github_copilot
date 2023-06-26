import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './NewTable.css';
import { Button, Card } from '@mui/material';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategoryBudget } from '../../features/transactionState/transactionStateSlice';
import { useEffect } from 'react';
import { deleteBudgetDataApi } from '../../api/apiCalls';

const makeStyle = (type) => {
	if (type === 'delete') {
		return {
			background: '#f1807d',
			color: 'black'
		};
		// } else if (type === 'expense') {
		// 	return {
		// 		background: '#BB86FC',
		// 		color: 'black'
		// 	};
	}
};

export default function BasicTable() {
	const token = localStorage.getItem('token');
	const [rows, setRows] = React.useState([]);
	const dispatch = useAppDispatch();

	var categories = useAppSelector((state) => state.transactionState.categories);
	var budgetData = useAppSelector(
		(state) => state.transactionState.categoryWiseBudget
	);
	useEffect(() => {
		const tableRows = budgetData.map((item) => {
			const category = categories.find((cat) => cat.id === item.categoryId);
			return {
				categoryId: item.categoryId,
				categoryName: category ? category.value : '',
				categoryBudget: item.budget,
				amountSpent: item.amountSpent
			};
		});
		setRows(tableRows);
	}, [budgetData, categories]);

	const handleDelete = (categoryId) => async () => {
		await deleteBudgetDataApi(token, categoryId);
		dispatch(deleteCategoryBudget(categoryId));
	};
	return (
		<div style={{ marginLeft: '0.6rem' }}>
			<div className="Table">
				<h4>Category-wise Budget Table:</h4>
				<br />
				{rows && rows.length > 0 ? (
					<TableContainer
						component={Paper}
						style={{
							boxShadow: '0px 90px 20px 0px #0000000d',
							maxHeight: '20rem'
						}}
					>
						<Table
							sx={{ minWidth: 650, maxHeight: '15rem' }}
							aria-label="simple table"
							style={{ backgroundColor: '#544d4d' }}
						>
							<TableHead>
								<TableRow>
									<TableCell sx={{ color: 'white' }}>Category</TableCell>
									<TableCell sx={{ color: 'white' }}>Budget</TableCell>
									<TableCell sx={{ color: 'white' }}>Amount Spent</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										Delete
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody style={{ color: 'white' }}>
								{rows.map((row) => (
									<TableRow
										key={row.categoryId}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 }
										}}
									>
										<TableCell
											sx={{ color: 'white' }}
											component="th"
											scope="row"
										>
											{row.categoryName}
										</TableCell>
										<TableCell sx={{ color: 'white' }} align="left">
											{row.categoryBudget}
										</TableCell>
										<TableCell sx={{ color: 'white' }} align="left">
											{row.amountSpent}
										</TableCell>
										<TableCell
											sx={{ color: 'white' }}
											align="left"
											className="cursor"
										>
											<Button
												sx={{
													backgroundColor: '#E65065',
													color: 'white ',
													fontSize: '0.7rem'
												}}
												onClick={handleDelete(row.categoryId)}
											>
												<UilTrashAlt />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<span>No Records Found</span>
				)}
			</div>
		</div>
	);
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css';
import { Button, Card, Tab } from '@mui/material';
import { UilPen } from '@iconscout/react-unicons';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '../../features/transactionState/transactionStateSlice';
import EditTransactionDialog from '../EditTransactionDialog/EditTransactionDialog';

const makeStyle = (type) => {
	if (type === 'income') {
		return {
			background: '#03DAC5',
			color: 'white'
		};
	} else if (type === 'expense') {
		return {
			background: '#BB86FC',
			color: 'white'
		};
	}
};

export default function BasicTable({ rows }) {
	const [selectedToEdit, setSelectedToEdit] = React.useState({});
	const handleSelectedToEdit = ({
		defaultName,
		defaultAmount,
		defaultCategory,
		defaultDate,
		transactionId
	}) => {
		// console.log(transactionId);
		setSelectedToEdit({
			defaultName,
			defaultAmount,
			defaultCategory,
			defaultDate,
			transactionId
		});
	};
	const dispatch = useAppDispatch();
	const handleModal = (transactionId) => {
		dispatch(openModal());
	};

	return (
		<div className="Table">
			<EditTransactionDialog defaultData={selectedToEdit} />
			<h3>Recent Transactions</h3>
			{rows && rows.length > 0 ? (
				<TableContainer
					component={Paper}
					className="tableContainer"
					style={{
						boxShadow: '0px 13px 20px 0px #80808029',
						maxHeight: '15rem'
						// maxWidth: '100%'
					}}
				>
					<Table
						sx={{ minWidth: 650, maxHeight: '10rem' }}
						aria-label="simple table"
						style={{ backgroundColor: '#616161' }}
					>
						<TableHead>
							<TableRow>
								<TableCell sx={{ color: 'white' }}>Transaction Name</TableCell>
								<TableCell sx={{ color: 'white' }}>Amount</TableCell>
								<TableCell sx={{ color: 'white' }} align="left">
									Date
								</TableCell>
								<TableCell sx={{ color: 'white' }} align="left">
									Transaction Type
								</TableCell>
								<TableCell sx={{ color: 'white' }} align="left">
									Category
								</TableCell>
								{/* <TableCell sx={{ color: 'white' }} align="left">
									Edit
								</TableCell> */}
							</TableRow>
						</TableHead>
						<TableBody style={{ color: 'white' }}>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 }
									}}
								>
									<TableCell sx={{ color: 'white' }} component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										{row.amount}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										{row.date}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										<span className="status" style={makeStyle(row.type)}>
											{row.type}
										</span>
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										{row.category}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										<UilPen
											onClick={() => {
												handleSelectedToEdit({
													defaultName: row.name,
													defaultAmount: row.amount,
													defaultCategory: row.category,
													defaultDate: row.date,
													transactionId: row.transactionId
												});
												handleModal(row.transactionId);
											}}
											size="1.5rem"
											color="white"
											cursor="pointer"
										/>
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
	);
}

import React, { useState } from 'react';
import './Signup.css';
import Alert from '@mui/material/Alert';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/transactionState/transactionStateSlice';
import { signupApi } from '../../api/apiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Signup() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const submitHandler = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		try {
			await signupApi({
				firstname,
				lastname,
				email,
				password
			});

			navigate('/login');
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className="login-page">
			<div className="loginContainer" id="container">
				<div className="form-container log-in-container">
					<form className="loginForm" action="#">
						<div
							className="mobileLogo"
							style={{
								// display: 'none',
								flexDirection: 'row',
								fontSize: '2rem',
								fontWeight: '700'
							}}
						>
							<span>Tracki</span>
							<span style={{ color: '#FF919D' }}>Fi</span>
						</div>
						<h1>Signup</h1>

						<input
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							className="loginInput"
							type="text"
							placeholder="First Name"
						/>
						<input
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							className="loginInput"
							type="text"
							placeholder="Last Name"
						/>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="loginInput"
							type="email"
							placeholder="Email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="loginInput"
							type="password"
							placeholder="Password"
						/>
						<input
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="loginInput"
							type="password"
							placeholder="Confirm Password"
						/>

						<p style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
							Already a user? Login.
						</p>
						<button onClick={submitHandler} className="loginButton">
							Sign Up
						</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-right">
							<h1
								style={{
									fontWeight: '400'
								}}
							>
								Welcome to
							</h1>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									fontSize: '2rem',
									fontWeight: '700'
								}}
							>
								<span>Tracki</span>
								<span style={{ color: '#FF919D' }}>Fi</span>
							</div>
							<p>
								"Take charge of your finances, track transactions, set budgets,
								and unlock valuable insights"
							</p>
							{/* <div
								style={{ fontSize: '0.7rem', marginTop: '1rem' }}
								className="disclaimer"
							>
								<p>
									*Since we don't have a backend, use the following details to
									login:
									<br></br>
									Email: abc@email.com <br></br> Password: test@123{' '}
								</p>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;

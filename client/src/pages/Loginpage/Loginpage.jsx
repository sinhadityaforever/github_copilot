import React, { useState } from 'react';
import './Loginpage.css';
import Alert from '@mui/material/Alert';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/transactionState/transactionStateSlice';
import { ToastContainer } from 'react-toastify';
import { getUserInfoApi, loginApi } from '../../api/apiCalls';
import { useNavigate } from 'react-router-dom';
function Loginpage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const token = await loginApi({ email, password });

			localStorage.setItem('token', token);

			dispatch(login());
			navigate('/');
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
						<h1>Login</h1>
						{/* <div className="social-container">
							<a href="#" className="social">
								<i className="fa fa-facebook fa-2x"></i>
							</a>
							<a href="#" className="social">
								<i className="fab fa fa-twitter fa-2x"></i>
							</a>
						</div> */}

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
						<p
							style={{ cursor: 'pointer' }}
							onClick={() => navigate('/signup')}
						>
							New user? Signup Instead.
						</p>
						<button onClick={submitHandler} className="loginButton">
							Log In
						</button>
						{/* <div
							className="mobile-disclaimer"
							style={{
								fontSize: '0.6rem',
								marginTop: '3rem'
							}}
						>
							<p>
								*Since we don't have a backend, use these to login:
								<br></br>
								Email: abc@email.com <br></br> Password: test@123{' '}
							</p>
						</div> */}
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

export default Loginpage;

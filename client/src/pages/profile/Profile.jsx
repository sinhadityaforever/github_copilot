import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Profile.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	getNewAvatarApi,
	getUserInfoApi,
	updateUserInfoApi
} from '../../api/apiCalls';
import { UilCameraChange } from '@iconscout/react-unicons';
import { setUserInfo } from '../../features/transactionState/transactionStateSlice';
function Profile() {
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();
	const profileInfo = useAppSelector(
		(state) => state.transactionState.userInfo
	);

	const [profileImg, setProfileImg] = useState(profileInfo.profilePicture);
	const [firstname, setFirstname] = useState(profileInfo.firstname);
	const [lastname, setLastname] = useState(profileInfo.lastname);
	const [email, setEmail] = useState(profileInfo.email);
	const [phone, setPhone] = useState(profileInfo.phone);
	const [address, setAddress] = useState(profileInfo.address);
	const [country, setCountry] = useState(profileInfo.country);
	const [postalCode, setPostalCode] = useState(profileInfo.postalCode);

	const firstNameHandler = (e) => {
		setFirstname(e.target.value);
	};
	const lastNameHandler = (e) => {
		setLastname(e.target.value);
	};
	const emailHandler = (e) => {
		setEmail(e.target.value);
	};
	const phoneHandler = (e) => {
		setPhone(e.target.value);
	};
	const addressHandler = (e) => {
		setAddress(e.target.value);
	};
	const countryHandler = (e) => {
		setCountry(e.target.value);
	};
	const postalCodeHandler = (e) => {
		setPostalCode(e.target.value);
	};

	const getNewAvatar = async () => {
		const res = await getNewAvatarApi(token);

		setProfileImg(res.profilePicture);
		console.log(res.profilePicture);
	};

	const submitHandler = async () => {
		await updateUserInfoApi(token, {
			firstname,
			lastname,
			email,
			profilePicture: profileImg,
			phone,
			address,
			country,
			postalCode
		});
		dispatch(
			setUserInfo({
				firstname,
				lastname,
				email,
				profilePicture: profileImg,
				phone,
				address,
				country,
				postalCode
			})
		);
	};

	const lightColor = {
		borderColor: 'white',
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

	return (
		<div className="profile">
			<div className="edit-profile">
				<Typography
					fontSize={'1.5rem'}
					fontWeight={'bold'}
					className="edit-profile-text"
				>
					Edit Profile
				</Typography>
				<div className="edit-profile-field-container">
					<div className="edit-profile-fields">
						<div className="left-field">
							<span>First Name</span>
							<TextField
								defaultValue={profileInfo.firstname}
								onChange={firstNameHandler}
								style={{ marginTop: '10px' }}
								placeholder="First Name"
								fullWidth
								sx={lightColor}
							/>
						</div>
						<div className="right-field">
							<span>Last Name</span>
							<TextField
								defaultValue={profileInfo.lastname}
								onChange={lastNameHandler}
								sx={lightColor}
								style={{ marginTop: '10px' }}
								placeholder="Last Name"
								fullWidth
							/>
						</div>
					</div>
					<div className="edit-profile-fields">
						<div className="left-field">
							<span>Email Address</span>
							<TextField
								defaultValue={profileInfo.email}
								onChange={emailHandler}
								style={{ marginTop: '10px' }}
								placeholder="Email Address"
								fullWidth
								variant="outlined"
								sx={lightColor}
							/>
						</div>
						<div className="right-field">
							<span>Phone</span>
							<TextField
								sx={lightColor}
								defaultValue={profileInfo.phone}
								onChange={phoneHandler}
								style={{ marginTop: '10px' }}
								placeholder="Phone Number"
								fullWidth
							/>
						</div>
					</div>
					<div className="edit-profile-fields">
						<div className="left-field">
							<span>Address</span>
							<TextField
								placeholder="Address"
								defaultValue={profileInfo.address}
								onChange={addressHandler}
								sx={lightColor}
								style={{ marginTop: '10px' }}
								fullWidth
								variant="outlined"
							/>
						</div>
						{/* <div className="right-field">
							<TextField fullWidth />
						</div> */}
					</div>
					<div className="edit-profile-fields">
						<div className="left-field">
							<span>Country</span>
							<TextField
								defaultValue={profileInfo.country}
								onChange={countryHandler}
								sx={lightColor}
								style={{ marginTop: '10px' }}
								fullWidth
								variant="outlined"
								placeholder="Country"
							/>
						</div>
						<div className="right-field">
							<span>Postal Code</span>
							<TextField
								defaultValue={profileInfo.postalCode}
								onChange={postalCodeHandler}
								sx={lightColor}
								style={{ marginTop: '10px' }}
								fullWidth
								placeholder="Postal Code"
							/>
						</div>
					</div>
					<Button
						sx={{
							backgroundColor: '#03DAC6',
							width: '7rem',
							alignSelf: 'flex-end',
							margin: '1rem',
							color: 'black'
						}}
						variant="contained"
						onClick={submitHandler}
					>
						Save
					</Button>
				</div>
			</div>
			<div className="view-profile">
				<div className="view-profile-container">
					<div className="profile-picture">
						<img
							className="profile-picture-image"
							src={profileImg}
							alt="profile-pic"
						/>
						<UilCameraChange
							className="edit-profile-profile"
							onClick={getNewAvatar}
							cursor="pointer"
							style={{
								marginTop: '8rem'
							}}
						></UilCameraChange>
					</div>
					<div className="side-text-holder">
						<div className="name">
							<Typography fontWeight={'bold'} fontSize={'1.2rem'}>
								{`${profileInfo.firstname} ${profileInfo.lastname}`}
							</Typography>
						</div>
						<div className="detail-text">
							<Typography>Email: {profileInfo.email}</Typography>

							<Typography>
								Phone: {profileInfo.phone || 'Not updated'}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;

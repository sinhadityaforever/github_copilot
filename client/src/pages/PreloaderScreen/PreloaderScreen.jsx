import React from 'react';
import ReactLoading from 'react-loading';
import './PreloaderScreen.css';
function PreloaderScreen() {
	return (
		<ReactLoading
			type={'cylon'}
			width={'7%'}
			height={'7%'}
			color={'#58E5DE'}
			className="preloader"
		/>
	);
}

export default PreloaderScreen;

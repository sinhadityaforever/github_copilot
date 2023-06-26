// Sidebar imports
import {
	UilEstate,
	UilClipboardAlt,
	UilUsersAlt,
	UilPackage,
	UilChart,
	UilComparison,
	UilMoneyInsert,
	UilMoneyWithdraw,
	UilUser
} from '@iconscout/react-unicons';
import { format } from 'date-fns';

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

// Recent Card Imports
import img1 from '../imgs/img1.png';
import img2 from '../imgs/img2.png';
import img3 from '../imgs/img3.png';

// Sidebar Data
export const SidebarData = [
	{
		icon: UilEstate,
		heading: 'Dashboard'
	},
	{
		icon: UilClipboardAlt,
		heading: 'Budget'
	},
	{
		icon: UilComparison,
		heading: 'Insights'
	},
	{
		icon: UilUser,
		heading: 'Profile'
	}
	// {
	// 	icon: UilPackage,
	// 	heading: 'Products'
	// },
	// {
	// 	icon: UilChart,
	// 	heading: 'Analytics'
	// }
];

// Analytics Cards Data
export const cardsData = [
	{
		title: 'Expenses',
		color: {
			backGround: '#BB86FC'
			//boxShadow: '0px 10px 20px 0px #e0c6f5'
		},
		barValue: 70,
		value: '25,970',
		png: UilUsdSquare,
		series: [
			{
				name: 'Expenses',
				data: [31, 40, 28, 51, 42, 109, 100]
			}
		]
	},
	{
		title: 'Savings',
		color: {
			backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
			boxShadow: '0px 10px 20px 0px #FDC0C7'
		},
		barValue: 80,
		value: '14,270',
		png: UilMoneyWithdrawal,
		series: [
			{
				name: 'Savings',
				data: [10, 100, 50, 70, 80, 30, 40]
			}
		]
	}
	// {
	// 	title: 'Expenses',
	// 	color: {
	// 		backGround:
	// 			'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
	// 		boxShadow: '0px 10px 20px 0px #F9D59B'
	// 	},
	// 	barValue: 60,
	// 	value: '4,270',
	// 	png: UilClipboardAlt,
	// 	series: [
	// 		{
	// 			name: 'Expenses',
	// 			data: [10, 25, 15, 30, 12, 15, 20]
	// 		}
	// 	]
	// }
];

export const expenseCardData = [
	{
		title: 'Set category-wise budget',
		color: {
			backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
			boxShadow: '0px 10px 20px 0px #e0c6f5'
		},
		png: UilChart,
		type: 'setBudget'
	},
];

// Recent Update Card Data
export const UpdatesData = [
	{
		img: img1,
		name: 'Andrew Thomas',
		noti: 'has ordered Apple smart watch 2500mh battery.',
		time: '25 seconds ago'
	},
	{
		img: img2,
		name: 'James Bond',
		noti: 'has received Samsung gadget for charging battery.',
		time: '30 minutes ago'
	},
	{
		img: img3,
		name: 'Iron Man',
		noti: 'has ordered Apple smart watch, samsung Gear 2500mh battery.',
		time: '2 hours ago'
	}
];

export const categories = [
	'Food',
	'Business',
	'Clothes',
	'Education',
	'Entertainment',
	'Health',
	'Gifts',
	'Investments',
	'Other'
];
const categoryObj = {
	Food: categories[0],
	Business: categories[1],
	Clothes: categories[2],
	Education: categories[3],
	Entertainment: categories[4],
	Health: categories[5],
	Gifts: categories[6],
	Investments: categories[7],
	Other: categories[8]
};

export const transactionsData = [
	{
		name: 'Ordered Pizza',
		date: '12/12/2021',
		category: categoryObj.Food,
		type: 'delete',
		amount: 320
	},
	{
		name: 'Salary',
		date: '12/12/2021',
		
		category: categoryObj.Business,
		type: 'delete',
		amount: 25000
	}
];

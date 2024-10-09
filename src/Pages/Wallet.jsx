import { useEffect, useState } from 'react'
import { getUserWallet } from '../utils/utils'
import { NavLink } from 'react-router-dom'
import BackToDashboard from '../Common/Components/BackToDashboard'

import { IoWallet } from 'react-icons/io5'
import { RiEmotionSadFill } from 'react-icons/ri'

export default function Wallet() {
	const [walletValue, setwalletValue] = useState(0)

	const getWalletValue = async () => {
		const wallet = await getUserWallet()
		const formattedNumber = wallet
			.toLocaleString('en-US')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		setwalletValue(formattedNumber)
	}

	console.log(walletValue)

	useEffect(() => {
		getWalletValue()
	}, [])
	return (
		<div className='text-white dashboard-container h-screen flex flex-col items-center '>
			<BackToDashboard title='کیف پول' />

			<div className='flex items-center justify-center flex-col'>
				<IoWallet className='w-20 h-20 mt-2' />

				<span className='text-[#CECECE] font-bold text-4xl mt-4'>
					{walletValue}
				</span>

				<p className='mt-4 text-2xl'>تومان</p>
			</div>

			<div className='w-full flex items-center justify-between gap-5 mt-10 mx-2'>
				<NavLink
					to='#'
					className='bg-[#68AC50] w-2/3 h-12 text-2xl flex items-center justify-center rounded-md'>
					واریز
				</NavLink>

				<NavLink
					to='#'
					className='bg-redBTN w-2/3 h-12 text-2xl flex items-center justify-center rounded-md'>
					برداشت
				</NavLink>
			</div>

			<div className='w-full mt-16 flex flex-col items-start justify-start'>
				<p>تاریخ تراکنش ها</p>

				<div className='bg-[#202225c9] w-full h-full flex items-center justify-center mt-1'>
					{/* If the user has no transaction */}
					<div className='w-full flex items-center justify-center flex-col my-5'>
						<RiEmotionSadFill className='w-24 h-24' />

						<p className='mt-4'>شما هنوز هیچ تراکنشی انجام نداید !</p>
					</div>

					{/* If the user have transaction */}
					<div className='hidden w-full flex items-center justify-center flex-col my-10'></div>
				</div>
			</div>
		</div>
	)
}

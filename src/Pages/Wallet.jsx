import { useEffect, useState } from 'react'
import { getUserWallet, putUserData } from '../utils/utils'
import { NavLink } from 'react-router-dom'
import BackToDashboard from '../Common/Components/BackToDashboard'
import InputModal from '../Common/Components/Modals/InputModal'

import { IoWallet } from 'react-icons/io5'
import { RiEmotionSadFill } from 'react-icons/ri'

export default function Wallet() {
	const [walletValue, setWalletValue] = useState(0)
	const [inputWalletValue, setInputWalletValue] = useState(0)
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowDepositModal, setIsShowDepositModal] = useState(false)
	const [depositSuccess, setDepositSuccess] = useState(false)

	const getWalletValue = async () => {
		const wallet = await getUserWallet()
		const formattedNumber = wallet
			.toLocaleString('en-US')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		setWalletValue(formattedNumber)
	}

	const changeWalletValue = async () => {
		const newUserData = {
			wallet: inputWalletValue,
		}

		if (inputWalletValue > 0) {
			await putUserData(newUserData)
			setDepositSuccess(true)
			setInputWalletValue(0)
		}
	}

	useEffect(() => {
		getWalletValue()
	}, [])

	useEffect(() => {
		if (depositSuccess) {
			getWalletValue() // Fetch the updated wallet value
			setDepositSuccess(false) // Reset the success state
		}
	}, [depositSuccess])

	return (
		<div className='text-white dashboard-container h-screen flex flex-col items-center '>
			<BackToDashboard title='کیف پول' />

			{/* Show user wallet value  */}
			<div className='flex items-center justify-center flex-col'>
				<IoWallet className='w-20 h-20 mt-2' />

				<span className='text-[#CECECE] font-bold text-4xl mt-4'>
					{walletValue}
				</span>

				<p className='mt-4 text-2xl'>تومان</p>
			</div>

			{/* Deposit and withdrawal button */}
			<div className='w-full flex items-center justify-between gap-5 mt-10 mx-2'>
				<NavLink
					to='#'
					onClick={() => {
						setIsShowDepositModal(true)
						setIsShowModal(true)
					}}
					className='bg-[#68AC50] w-2/3 h-12 text-2xl flex items-center justify-center rounded-md'>
					واریز
				</NavLink>

				<NavLink
					to='#'
					className='bg-redBTN w-2/3 h-12 text-2xl flex items-center justify-center rounded-md'>
					برداشت
				</NavLink>
			</div>

			{/* Show transaction history */}
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

			{/* Show modals */}
			{isShowDepositModal ? (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>
						مقدار واریز پول خود را به تومان وارد کنید
					</h1>

					<div className='flex justify-center items-center mt-16'>
						<input
							className='text-black w-1/3 h-10 dir-ltr text-center p-2 float-left text-2xl rounded-md outline-none'
							type='number'
							onChange={(value) => setInputWalletValue(value.target.value)}
						/>
					</div>

					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={() => {
								setIsShowModal(false)
								setIsShowDepositModal(false)
							}}>
							لغو
						</button>
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={() => {
								setIsShowModal(false)
								setIsShowDepositModal(false)
								changeWalletValue()
							}}>
							تایید
						</button>
					</div>
				</InputModal>
			) : (
				''
			)}

			{/* Overlay in Backdrop Navbar */}
			<div
				className={`app-overlay fixed w-full h-full top-0 left-0 bg-black/40 z-30 backdrop-blur transition-all ${
					isShowModal ? 'show' : 'hide'
				}`}></div>
		</div>
	)
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
//? Toggle Hoc
import withToggle from '../Hocs/withToggle'
//? Icon's
import {
	AiOutlineUser,
	AiOutlineHome,
	AiOutlineShoppingCart,
} from 'react-icons/ai'
import { RiSearch2Line } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'
import { IoWalletOutline } from 'react-icons/io5'

function Navbar({ toggleValue, toggleHandler }) {
	const dropdown = useRef()
	const overlay = useRef()

	const userProfileDropdown = () => {
		toggleHandler()
		if (!toggleValue) {
			dropdown.current.classList.remove('hide')
			dropdown.current.classList.add('show')

			overlay.current.classList.remove('hide')
			overlay.current.classList.add('show')
		} else {
			dropdown.current.classList.remove('show')
			dropdown.current.classList.add('hide')

			overlay.current.classList.remove('show')
			overlay.current.classList.add('hide')
		}
	}

	return (
		<>
			<nav className='sticky top-0 z-50'>
				<div className='navbar flex justify-between items-center'>
					{/* Navbar Logo */}
					<Link
						to='/'
						className='text-white font-normal text-[20px] font-shabnam cp'
					>
						بوفینو
					</Link>

					<div className='flex items-center w-[30rem] h-[55px] bg-primary bg-opacity-[85%] rounded-[8px] overflow-hidden px-6 sm:mx-2.5'>
						{/* Search Input Icon */}
						<RiSearch2Line className='text-2xl text-[24px] text-white rotate-90' />
						{/* Search Input */}
						<input
							type='text'
							className='outline-none w-full h-full ps-1.5 bg-opacity-0 bg-primary text-[18px] ms-1 font-shabnam text-white placeholder:text-[18px] placeholder:font-shabnam placeholder:text-white placeholder:opacity-70'
							placeholder='جستجوی غذا'
						/>
					</div>

					{/* User Profile */}
					<div
						onClick={userProfileDropdown}
						className='text-white font-bold flex items-center'
					>
						{/* User Icon */}
						<AiOutlineUser className='text-[2rem] text-white cp relative' />

						{/* User Profile Dropdown */}
						<div
							className='absolute left-3 top-full z-10 transition-all hide'
							id='user-profile'
							ref={dropdown}
						>
							<div className='w-[278px] bg-secondary  py-5 px-6 rounded-2xl'>
								{/* User Info */}
								<div className='flex items-center border-b border-b-gray-200 pb-5 mb-2'>
									<Link
										to='dashboard'
										className='object-cover w-14 h-14 rounded-full inline-block'
									>
										<img
											src='./images/blankUserProfile.png'
											className='rounded-full'
										/>
									</Link>

									<div className='mr-2.5 flex flex-col gap-y-1 overflow-hidden'>
										<span className='text-lg text-zinc-700 inline-block font-shabnam truncate'>
											یوسف حاجی پور
										</span>
										<p className='text-sm text-sky-500 inline-block font-shabnam text-primaryBTN'>
											موجودی:
											<span className='px-1'>200,000</span>
											تومان
										</p>
									</div>
								</div>

								{/* Dashboard Link's */}
								<Link
									to='/'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'
								>
									<span className='flex items-center gap-x-3'>
										<AiOutlineHome className='w-5 h-5' />
										خانه
									</span>
								</Link>

								<Link
									to='/dashboard'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'
								>
									<span className='flex items-center gap-x-3'>
										<IoWalletOutline className='w-5 h-5' />
										داشبورد
									</span>
								</Link>

								<Link
									to='/dashboard/cart'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'
								>
									<span className='flex items-center gap-x-3'>
										<AiOutlineShoppingCart className='w-5 h-5' />
										سبد خرید
									</span>
								</Link>

								<div className='mt-2 pt-2 border-t border-t-gray-200'>
									<div className='cp flex items-center justify-between text-zinc-700 px-2.5 py-2.5 rounded-xl hover:bg-hoverDropDownLink transition-colors'>
										<span className='flex items-center gap-x-3'>
											<BiLogOut className='w-5 h-5' />
											خروج
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Overlay in Backdrop Navbar */}
			<div
				ref={overlay}
				onClick={userProfileDropdown}
				className='app-overlay fixed w-full h-full top-0 left-0 bg-black/40 z-30 md:backdrop-blur transition-all hide'
			></div>
		</>
	)
}

export default withToggle(Navbar)

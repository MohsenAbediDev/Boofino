import { useRef, useEffect, useState } from 'react'
import { getUserAdmin, getUser, getUserWallet } from '../utils/utils'
import { Outlet, NavLink, useParams } from 'react-router-dom'

//? Icons
import { IoWalletOutline, IoDocumentTextOutline } from 'react-icons/io5'
import { AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai'
import {
	MdOutlineArrowBackIos,
	MdExitToApp,
	MdAddCircleOutline,
	MdOutlineModeEditOutline,
	MdOutlineQueryStats,
} from 'react-icons/md'

export default function Dashboard() {
	const [isAdmin, setIsAdmin] = useState(false)
	const [fullName, setFullName] = useState('')
	const [imgUrl, setImgUrl] = useState('')
	const [walletValue, setwalletValue] = useState(0)
	const params = useParams()
	const dashboardRoute = useRef()

	useEffect(() => {
		const checkAdmin = async () => {
			const adminStatus = await getUserAdmin()
			setIsAdmin(adminStatus)
		}
		checkAdmin()

		if (params['*']) {
			dashboardRoute.current &&
				dashboardRoute.current.classList.add('lg:hidden')
		} else {
			dashboardRoute.current &&
				dashboardRoute.current.classList.remove('lg:hidden')
		}
	}, [params])

	useEffect(() => {
		userData()
		getWalletValue()
	}, [])

	const userData = async () => {
		const data = await getUser()
		setFullName(data[0].fullname)
		setImgUrl(data[0].imgUrl)
	}

	const getWalletValue = async () => {
		const wallet = await getUserWallet()
		const formattedNumber = wallet
			.toLocaleString('en-US')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		setwalletValue(formattedNumber)
	}

	return (
		<section className='container dir-rtl font-shabnam flex justify-between gap-8 my-6 lg:px-6 h-[calc(100vh-144px)] lg:flex-col'>
			<div
				ref={dashboardRoute}
				className='min-w-[290px] flex flex-col gap-y-5 sticky top-20'>
				{/* user profile details */}
				<div className='h-[150px] dashboard-container py-5'>
					{/* User Container */}
					<NavLink to='/dashboard' className='bg-hoverBTN dashboard-item h-16'>
						{/* User Image */}
						<img
							src={`${
								imgUrl
									? imgUrl
									: 'http://localhost:3000/contents/blankUserProfile.png'
							}`}
							className='w-[50px] h-[50px] rounded-full'
						/>

						{/* Username */}
						<div className='w-full text-xl flex items-center justify-between'>
							<p className='font-bold ms-2'>{fullName}</p>
							<MdOutlineArrowBackIos />
						</div>
					</NavLink>

					{/* Wallet Container */}
					<NavLink
						to='./wallet'
						className='w-full flex items-center mt-2 justify-between text-white text-xl transition-all duration-200 h-1/2'>
						<div className='text-white text-xl flex items-center'>
							<IoWalletOutline />
							<span className='px-2'>کیف پول</span>
						</div>

						{/* Wallet Price */}
						<div className='text-white'>
							<span className='text-xl mx-2'>{walletValue}</span>
							<span className='text-lg'>تومان</span>
						</div>
					</NavLink>
				</div>

				{/* Total Price */}
				{params['*'] === 'cart' && (
					<div className='dashboard-container h-36 py-5 lg:hidden'>
						<div className='h-1/2 text-white text-xl flex justify-between items-center w-full'>
							<span>قیمت کل:</span>

							<div className='flex gap-x-1.5'>
								{/* Cart Price */}
								<span className='totalPrice'>0</span>

								<span className='text-xl'>تومان</span>
							</div>
						</div>

						<button className='order-btn'>ثبت سفارش</button>
					</div>
				)}

				{/* Dashboard Links */}
				<div className='dashboard-container flex flex-col gap-y-3'>
					{/* My Statistics */}
					{isAdmin && (
						<NavLink
							to='./statistic'
							className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
							<div className='flex items-center'>
								<MdOutlineQueryStats />
								<span className='mx-2'>آمارهای من</span>
							</div>
							<MdOutlineArrowBackIos />
						</NavLink>
					)}

					{/* Cart */}
					<NavLink
						to='cart'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
						<div className='flex items-center'>
							<AiOutlineShoppingCart />
							<span className='mx-2'>سبد خرید</span>
						</div>
						<MdOutlineArrowBackIos />
					</NavLink>

					{/* My Orders */}
					<NavLink
						to='./my-orders'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
						<div className='flex items-center'>
							<IoDocumentTextOutline />
							<span className='mx-2'>سفارش‌های من</span>
						</div>
						<MdOutlineArrowBackIos />
					</NavLink>

					{/* Admin Link's */}
					{isAdmin && (
						<>
							{/* Admin orders */}
							<NavLink
								to='./admin-orders'
								className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
								<div className='flex items-center'>
									<AiOutlineShop />
									<span className='mx-2'>سفارش‌های فروشگاه</span>
								</div>
								<MdOutlineArrowBackIos />
							</NavLink>

							{/* Add product */}
							<NavLink
								to='./add-product'
								className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
								<div className='flex items-center'>
									<MdAddCircleOutline />
									<span className='mx-2'>افزودن محصول</span>
								</div>
								<MdOutlineArrowBackIos />
							</NavLink>

							{/* Edit products */}
							<NavLink
								to='./product-list'
								className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'>
								<div className='flex items-center'>
									<MdOutlineModeEditOutline />
									<span className='mx-2'>ویرایش محصولات</span>
								</div>
								<MdOutlineArrowBackIos />
							</NavLink>
						</>
					)}

					{/* Logout */}
					<NavLink
						to='/logout'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-colors duration-200'>
						<div className='flex items-center'>
							<MdExitToApp className='text-red' />
							<span className='mx-2'>خروج از حساب</span>
						</div>
					</NavLink>
				</div>
			</div>

			<Outlet />
		</section>
	)
}

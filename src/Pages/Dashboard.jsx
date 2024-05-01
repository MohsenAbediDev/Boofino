import { useRef, useEffect, useState } from 'react'
import { getUserAdmin } from '../utils/utils'

//? Icons
import { Outlet, NavLink, useParams } from 'react-router-dom'
import { IoWalletOutline } from 'react-icons/io5'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdOutlineArrowBackIos, MdExitToApp } from 'react-icons/md'
import { MdAddCircleOutline } from 'react-icons/md'
import { MdOutlineModeEditOutline } from 'react-icons/md'

export default function Dashboard() {
	const [isAdmin, setIsAdmin] = useState(false)
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

	return (
		<section className='container dir-rtl font-shabnam flex justify-between gap-8 my-6 lg:px-6 h-[calc(100vh-144px)] lg:flex-col'>
			<div
				ref={dashboardRoute}
				className='min-w-[290px] flex flex-col gap-y-5 sticky top-20'
			>
				{/* user profile details */}
				<div className='h-[150px] dashboard-container'>
					{/* User Container */}
					<NavLink to='/dashboard' className='bg-hoverBTN dashboard-item h-16'>
						{/* User Image */}
						<img
							src='../images/blankUserProfile.png'
							className='w-[50px] h-[50px] rounded-full'
						/>

						{/* Username */}
						<div className='w-full text-xl flex items-center justify-between'>
							<p className='font-bold ms-2'>یوسف حاجی پور</p>
							<MdOutlineArrowBackIos />
						</div>
					</NavLink>

					{/* Wallet Container */}
					<NavLink
						to='./wallet-management'
						className='w-full flex items-center mt-2 justify-between text-white text-xl transition-all duration-200 h-1/2'
					>
						<div className='text-white text-xl flex items-center'>
							<IoWalletOutline />
							<span className='px-2'>کیف پول</span>
						</div>

						{/* Wallet Price */}
						<div className='text-white'>
							<span className='text-xl mx-2'>۲۰۰,۰۰۰</span>
							<span className='text-lg'>تومان</span>
						</div>
					</NavLink>
				</div>

				{/* Dashboard Links */}
				<div className='dashboard-container flex flex-col gap-y-3'>
					<NavLink
						to='./shopping-history'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'
					>
						<div className='flex items-center'>
							<IoDocumentTextOutline />
							<span className='mx-2'>سفارش‌های من</span>
						</div>
						<MdOutlineArrowBackIos />
					</NavLink>

					{isAdmin && (
						<NavLink
							to='./add-product'
							className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'
						>
							<div className='flex items-center'>
								<MdAddCircleOutline />
								<span className='mx-2'>افزودن محصول</span>
							</div>
							<MdOutlineArrowBackIos />
						</NavLink>
					)}

					{isAdmin && (
						<NavLink
							to='./edit-product'
							className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'
						>
							<div className='flex items-center'>
								<MdOutlineModeEditOutline />
								<span className='mx-2'>ویرایش محصول</span>
							</div>
							<MdOutlineArrowBackIos />
						</NavLink>
					)}

					<NavLink
						to='cart'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'
					>
						<div className='flex items-center'>
							<AiOutlineShoppingCart />
							<span className='mx-2'>سبد خرید</span>
						</div>
						<MdOutlineArrowBackIos />
					</NavLink>

					<NavLink
						to='/logout'
						className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-colors duration-200'
					>
						<div className='flex items-center'>
							<MdExitToApp className='text-red' />
							<span className='mx-2'>خروج از حساب</span>
						</div>
					</NavLink>
				</div>

				{/* Total Price */}
				{params['*'] === 'cart' && (
					<div className='dashboard-container h-[140px] lg:hidden'>
						<div className='h-1/2 flex items-center'>
							<div className='text-white text-xl flex justify-between items-center w-full'>
								<span>قیمت کل</span>

								<div className='flex gap-x-1.5'>
									{/* Cart Price */}
									<span className='totalPrice'>0</span>

									<span className='text-xl'>تومان</span>
								</div>
							</div>
						</div>
						<div
							className='dashboard-item bg-primaryBTN flex items-center justify-center
								text-white text-xl font-bold cp w-full
              hover:bg-hoverConfirmBTN transition-colors duration-200
							order-btn'
						>
							ثبت سفارش
						</div>
					</div>
				)}
			</div>

			<Outlet />
		</section>
	)
}

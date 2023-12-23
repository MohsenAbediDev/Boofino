//? Icons
import { Outlet, NavLink, useParams } from 'react-router-dom'
import { IoWalletOutline } from 'react-icons/io5'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import {
	MdOutlineArrowBackIos,
	MdOutlineDashboardCustomize,
	MdExitToApp,
} from 'react-icons/md'

export default function Dashboard() {
	const params = useParams()

	return (
		<>
			<section className='container dir-rtl font-shabnam flex justify-between gap-8 my-8 h-[calc(100vh-144px)]'>
				<div
					className='min-w-[290px] flex flex-col gap-y-5 sticky top-20
            lg:hidden'
				>
					{/* user profile details */}
					<div className='h-[165px] dashboard-container'>
						{/* User Container */}
						<div className='bg-hoverBTN dashboard-item h-16'>
							{/* User Image */}
							<img
								src='../images/blankUserProfile.png'
								alt='prfile pic'
								className='w-[50px] h-[50px] rounded-full'
							/>
							{/* Username */}
							<p className='text-xl font-bold ms-2'>یوسف حاجی پور</p>
						</div>
						{/* Wallet Container */}
						<div className='w-full h-1/2 flex items-center justify-between'>
							<div className='text-white text-xl flex items-center'>
								<IoWalletOutline />
								<span className='px-2'>کیف پول</span>
							</div>
							{/* Wallet Price */}
							<div className='text-white'>
								<span className='text-xl mx-2'>۲۰۰,۰۰۰</span>
								<span className='text-lg'>تومان</span>
							</div>
						</div>
					</div>
					{/* Dashboard Links */}
					<div className='dashboard-container flex flex-col gap-y-3'>
						<NavLink
							to='/dashboard'
							className='dashboard-item bg-dashboardItem justify-between text-white text-xl
                    hover:bg-dashboardItemActive transition-all duration-200'
						>
							<div className='flex items-center'>
								<MdOutlineDashboardCustomize />
								<span className='mx-2'>داشبورد</span>
							</div>
							<MdOutlineArrowBackIos />
						</NavLink>

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
							to='#'
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
						<div className='dashboard-container h-[160px]'>
							<div className='h-1/2 flex items-center'>
								<div className='text-white text-xl flex justify-between items-center w-full'>
									<span>قیمت کل</span>

									<div className='flex gap-x-1.5'>
										{/* Cart Price */}
										<span>2۰۰,۰۰۰</span>

										<span className='text-xl'>تومان</span>
									</div>
								</div>
							</div>
							<a
								href='#'
								className='dashboard-item bg-primaryBTN flex items-center justify-center
								text-white text-xl font-bold cp w-full
              hover:bg-hoverConfirmBTN transition-colors duration-200'
							>
								ثبت سفارش
							</a>
						</div>
					)}
				</div>
				<Outlet />
			</section>
		</>
	)
}

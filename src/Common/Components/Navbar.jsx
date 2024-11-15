import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import productDatas from '../../../datas'
import {
	addToCart,
	getUser,
	removeProduct,
	getUserAdmin,
	getUserWallet,
} from '../../utils/utils'

//? Toggle Hoc
import withToggle from '../Hocs/withToggle'

//? Icon's
import {
	AiOutlineUser,
	AiOutlineHome,
	AiOutlineShoppingCart,
	AiOutlineDashboard,
} from 'react-icons/ai'

import {
	MdExitToApp,
	MdAddCircleOutline,
	MdOutlineModeEditOutline,
} from 'react-icons/md'

import { IoDocumentTextOutline } from 'react-icons/io5'
import { RiSearch2Line } from 'react-icons/ri'

function Navbar({ toggleValue, toggleHandler }) {
	// Product Variable's
	const [products, setProducts] = useState(productDatas)
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [isShowSearchResult, setIsShowSearchResult] = useState(false)
	const [productsID, setProductsID] = useState([])
	const [count, setCount] = useState(1)

	// User Variable's
	const [fullName, setFullName] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const [walletValue, setwalletValue] = useState(0)

	const checkAdmin = async () => {
		const adminStatus = await getUserAdmin()
		setIsAdmin(adminStatus)
	}
	const getWalletValue = async () => {
		const wallet = await getUserWallet()
		const formattedNumber = wallet
			.toLocaleString('en-US')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		setwalletValue(formattedNumber)
	}

	const performSearch = (value) => {
		const results = products.filter((data) => data.title.includes(value.trim()))

		return results
	}

	useEffect(() => {
		getIds()
		userData()
		checkAdmin()
		getWalletValue()
	}, [])

	useEffect(() => {
		searchHandler(searchTerm)
	}, [isShowSearchResult])

	const searchHandler = async (name) => {
		try {
			const res = await fetch(`http://localhost:3000/search-products/${name}`, {
				method: 'GET',
				credentials: 'include',
			})
			const data = await res.json()

			setSearchResults(data)
		} catch (err) {
			return err
		}
	}

	const userData = async () => {
		const data = await getUser()
		setFullName(data[0].fullname)
	}

	const getIds = () => {
		const mainProductCart = JSON.parse(localStorage.getItem('productCart'))

		const newProductsId = mainProductCart
			? mainProductCart.map((product) => product.id)
			: []

		setProductsID(newProductsId)
	}

	const handleSearchChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)

		const results = performSearch(value)
		setSearchResults(results)

		!value && setSearchResults([])
	}
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
						className='text-white font-normal text-[20px] font-shabnam cp'>
						<img className='w-24' src='icons/logo.png' alt='boofino' />
					</Link>

					{/* Search */}
					<div className='relative flex items-center w-[30rem] h-[55px] bg-primary bg-opacity-[85%] rounded-[8px] px-6 sm:mx-2.5'>
						{/* Search Input Icon */}
						<RiSearch2Line className='text-2xl text-[24px] text-white rotate-90' />
						{/* Search Input */}
						<input
							type='text'
							className='outline-none w-full h-full ps-1.5 bg-opacity-0 bg-primary text-[18px] ms-1 font-shabnam text-white placeholder:text-[18px] placeholder:font-shabnam placeholder:text-white placeholder:opacity-70'
							placeholder='جستجوی غذا'
							value={searchTerm}
							onChange={handleSearchChange}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setIsShowSearchResult(true)
									getIds()
								} else {
									setIsShowSearchResult(false)
								}
							}}
							onBlur={(e) => {
								e.relatedTarget
									? e.target.focus()
									: setIsShowSearchResult(false)
							}}
						/>

						{/* Show Search Result */}
						{searchResults.length > 0 && isShowSearchResult && (
							<div
								className='absolute w-full max-h-[60vh] overflow-y-scroll scroll top-full left-0 text-white bg-primary border border-t-0 border-price py-2 px-4 rounded-lg 
							md:no-scroll'>
								<ul className='divide-y-[1px] divide-price'>
									{searchResults.map((result) => (
										<li
											className='dir-rtl font-shabnam flex items-start justify-between flex-col py-2 px-2'
											key={result._id}>
											<div className='flex items-center'>
												<img
													className='w-14 h-14 bg-cover rounded-lg border border-white'
													src={result.imgUrl}
												/>
												<p className='font-b text-xl mx-2 md:text-lg'>
													{result.name}
												</p>
											</div>
											<div className='flex w-full flex-col my-1'>
												<p className='text-xl sm:text-lg text-center'>
													{result.finalPrice &&
														result.finalPrice
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
													تومان
												</p>
												{!productsID.includes(result._id) ? (
													<button
														className='rounded-md font-shabnam my-1 p-1 bg-primaryBTN hover:bg-hoverBTN transition-all duration-200
															md:text-xs md:h-7 md:px-2'
														onClick={() => {
															addToCart(setCount, setProductsID, result._id)
														}}>
														افزودن به سبد خرید
													</button>
												) : (
													<button
														className='rounded-md font-shabnam my-1 p-1 bg-red hover:bg-hoverBTN transition-all duration-200
															md:text-xs md:h-7 md:px-2'
														onClick={() => {
															removeProduct(result.ـid)
															getIds()
														}}>
														حذف از سبد خرید
													</button>
												)}
											</div>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* User Profile */}
					<div
						onClick={userProfileDropdown}
						className='text-white font-bold flex items-center'>
						{/* User Icon */}
						<AiOutlineUser className='text-[2rem] text-white cp relative' />

						{/* User Profile Dropdown */}
						<div
							className='absolute left-3 top-full z-10 transition-all hide'
							id='user-profile'
							ref={dropdown}>
							<div className='w-[278px] bg-secondary  py-5 px-6 rounded-2xl'>
								{/* User Info */}
								<div className='flex items-center border-b border-b-gray-200 pb-5 mb-2'>
									<Link
										to='dashboard'
										className='object-cover w-14 h-14 rounded-full inline-block'>
										<img
											src='./images/blankUserProfile.png'
											className='rounded-full'
										/>
									</Link>

									<div className='mr-2.5 flex flex-col gap-y-1 overflow-hidden'>
										<span className='text-lg text-zinc-700 inline-block font-shabnam truncate'>
											{fullName}
										</span>
										<p className='text-sm text-sky-500 inline-block font-shabnam text-primaryBTN'>
											موجودی:
											<span className='px-1'>{walletValue}</span>
											تومان
										</p>
									</div>
								</div>

								{/* Dashboard Link's */}
								<Link
									to='/dashboard'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'>
									<span className='flex items-center gap-x-3'>
										<AiOutlineDashboard className='w-5 h-5' />
										داشبورد
									</span>
								</Link>

								<Link
									to='/dashboard/cart'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'>
									<span className='flex items-center gap-x-3'>
										<AiOutlineShoppingCart className='w-5 h-5' />
										سبد خرید
									</span>
								</Link>

								{/* Admin Link's */}
								{isAdmin && (
									<>
										<Link
											to='/dashboard/add-product'
											className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'>
											<span className='flex items-center gap-x-3'>
												<MdAddCircleOutline className='w-5 h-5' />
												افزودن محصول
											</span>
										</Link>

										<Link
											to='/dashboard/product-list'
											className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'>
											<span className='flex items-center gap-x-3'>
												<MdOutlineModeEditOutline className='w-5 h-5' />
												ویرایش محصول
											</span>
										</Link>
									</>
								)}

								<Link
									to='/dashboard/my-orders'
									className='flex items-center justify-between text-zinc-700 px-2.5 h-[46px] rounded-xl hover:bg-hoverDropDownLink transition-colors'>
									<span className='flex items-center gap-x-3'>
										<IoDocumentTextOutline className='w-5 h-5' />
										سفارش‌های من
									</span>
								</Link>

								<div className='mt-2 pt-2 border-t border-t-gray-200'>
									<Link
										to='/logout'
										className='cp flex items-center justify-between text-zinc-700 px-2.5 py-2.5 rounded-xl hover:bg-hoverDropDownLink transition-colors'>
										<span className='flex items-center gap-x-3'>
											<MdExitToApp className='w-5 h-5 text-red' />
											خروج
										</span>
									</Link>
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
				className='fixed w-full h-full top-0 left-0 bg-black/40 z-30 md:backdrop-blur transition-all hide'></div>
		</>
	)
}

export default withToggle(Navbar)

{
	/* <li
className='dir-rtl font-shabnam flex items-start justify-between flex-col py-2 px-2'
key={index}
>
<div className='flex items-center'>
	<img
		className='w-14 h-14 bg-cover rounded-lg border border-white'
		src={result.image}
	/>
	<p className='font-b text-xl mx-2 md:text-lg'>
		{result.title}
	</p>
</div>
<div className='flex w-full flex-col my-1'>
	<p className='text-xl sm:text-lg text-center'>
		{result.price} تومان
	</p>
	{!productsID.includes(result.id) ? (
		<button
			className='rounded-md font-shabnam my-1 p-1 bg-primaryBTN hover:bg-hoverBTN transition-all duration-200
			md:text-xs md:h-7 md:px-2'
			onClick={() => {
				addToCart(setCount, setProductsID, result.id)
			}}
		>
			افزودن به سبد خرید
		</button>
	) : (
		<button
			className='rounded-md font-shabnam my-1 p-1 bg-red hover:bg-hoverBTN transition-all duration-200
			md:text-xs md:h-7 md:px-2'
			onClick={() => {
				removeProduct(result.id)
				getIds()
			}}
		>
			حذف از سبد خرید
		</button>
	)}
</div>
</li> */
}

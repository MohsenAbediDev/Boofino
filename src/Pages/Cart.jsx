import { useEffect, useState } from 'react'
import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../Common/Components/Notification/Notification'

import { IoClose } from 'react-icons/io5'
import { breakeTime } from '../../datas'

export default function Cart() {
	const [productCart, setProductCart] = useState(
		JSON.parse(localStorage.getItem('productCart')) || []
	)

	// States for total price, discount, and payment-related features
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalDisCount, setTotalDiscount] = useState(0)
	const [isShowPatment, setIsShowPayment] = useState(false)
	const [discountCode, setDiscountCode] = useState('')
	const [selectedTime, setSelectedTime] = useState(0)
	const [count, setCount] = useState([])

	//? Notification Variable's
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isShowNotification, setIsShowNotification] = useState(false)
	const navigate = useNavigate()

	const setNewTrackingCode = (newCode) => {
		let existingArray =
			JSON.parse(localStorage.getItem('trackingOrderCode')) || []

		existingArray.push(newCode)

		localStorage.setItem('trackingOrderCode', JSON.stringify(existingArray))
	}

	const showNotification = (response) => {
		const handleResponse = (data) => {
			if (response.ok) {
				setErrorMessage('')
				setSuccessMessage(data.message)
				setIsShowNotification(true)

				localStorage.setItem('productCart', JSON.stringify([]))

				setNewTrackingCode(data.trackingCode)
				setIsShowPayment(false)

				setTimeout(() => navigate('/successful-payment'), 1000)
			} else {
				setSuccessMessage('')
				setErrorMessage(data.message)
				setIsShowNotification(true)
			}
		}

		const handleFailure = (error) => {
			console.error('Error parsing JSON:', error)
		}

		response.json().then(handleResponse).catch(handleFailure)
	}

	useEffect(() => {
		// Calculate total price when component mounts
		totalPriceHandler()

		// Show payment section on "Place Order" button click
		document.querySelector('.order-btn').addEventListener('click', () => {
			setIsShowPayment(true)
		})
	}, [])

	// Function to refresh product cart after removing items
	const removeHandler = () => {
		setProductCart(JSON.parse(localStorage.getItem('productCart')))
	}

	// Function to calculate total price and total discount
	const totalPriceHandler = async () => {
		// Parse the cart items from local storage
		const mainProductCard = JSON.parse(localStorage.getItem('productCart'))
		const productsData = []
		const itemCount = []

		if (mainProductCard && Array.isArray(mainProductCard)) {
			mainProductCard.forEach((item) => {
				itemCount.push(item.count)
			})
		}

		// Fetch product data from the server to match the cart items
		try {
			const res = await fetch('http://localhost:3000/products', {
				method: 'GET',
				credentials: 'include',
			})
			const products = await res.json()

			// Loop through fetched products and match them with cart items
			for (let product of products) {
				for (let main of mainProductCard) {
					if (product._id === main.id) {
						productsData.push({
							price: product.finalPrice,
							count: main.count,
							oldPrice: product.oldPrice,
						})
					}
				}
			}
		} catch (err) {
			console.log(err)
		}

		setCount(itemCount)

		// Compute the total price
		setTotalPrice(() => {
			let sumPrice = 0

			// Add price of each item in the cart
			productsData.map((productData) => {
				sumPrice += productData.price * productData.count
			})

			// Show total price in the UI
			document.querySelector('.totalPrice').innerHTML = sumPrice

			return sumPrice
		})

		// Compute the total discount
		setTotalDiscount(() => {
			let sumDiscount = 0

			// Add discount for each item if there's an old price
			productsData.map((productData) => {
				if (productData.oldPrice) {
					sumDiscount +=
						(productData.oldPrice - productData.price) * productData.count
				}
			})

			return sumDiscount
		})
	}

	// order registration
	const orderRegistration = () => {
		const products = productCart.map((item) => ({
			id: item.id,
			count: Number(item.count),
		}))

		const data = { products, totalPrice }

		fetch('http://localhost:3000/buyproducts', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => showNotification(res))
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	return (
		<>
			<div className='w-full h-full flex flex-col relative'>
				{/* Back to dashboard button with cart title */}
				<BackToDashboard title='سبد خرید' />

				{/* If there are products in the cart, display them */}
				{productCart.length > 0 ? (
					<div className='w-full h-full overflow-y-auto scroll'>
						{/* Render each product in the cart */}
						<div className='md:divide-y-2 divide-secondary'>
							{productCart &&
								productCart.map((product, index) => (
									<ProductCart
										key={product.id}
										id={product.id}
										count={count[index]}
										onRemove={removeHandler}
										totalPrice={totalPriceHandler}
									/>
								))}
						</div>
					</div>
				) : (
					''
				)}

				{/* Display total price and discount in mobile view */}
				{productCart.length > 0 ? (
					<div
						className='hidden w-full p-2 bg-primary lg:flex flex-col sticky bottom-0 z-20'
						key={productCart._id}>
						{/* Show total discount */}
						<div className='text-base py-1 font-shabnam text-white flex items-center justify-between'>
							<p>تخفیف:</p>
							<div className=''>
								{totalDisCount}
								<span className='pr-2'>تومان</span>
							</div>
						</div>

						{/* Show total price */}
						<div className='text-base py-1 font-bold font-shabnam text-white flex items-center justify-between'>
							<p>قیمت کل:</p>
							<div>
								{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								<span className='pr-2'>تومان</span>
							</div>
						</div>

						{/* Place order button */}
						<button
							className='w-full h-10 text-xl text-white mt-2 rounded-sm bg-primaryBTN hover:bg-hoverConfirmBTN transition-colors duration-200 text-center'
							onClick={() => {
								setIsShowPayment(true)
							}}>
							ثبت سفارش
						</button>
					</div>
				) : (
					<div className='w-full h-full text-white text-2xl font-bold lg:mt-10 flex items-center flex-col'>
						<img src='/images/sad_cart.png' />

						<p className='mt-10'>سبد خرید شما خالی است</p>
					</div>
				)}

				{/* Payment and final order registration section */}
				<div
					className={`w-full bg-secondary absolute z-40 ${
						isShowPatment ? 'visible h-full' : 'invisible h-0'
					} rounded-dashboardcontainer transition-allabsolute bottom-0 duration-500 overflow-hidden p-7 md:p-4`}>
					{/* Close payment section */}
					<IoClose
						className='absolute left-6 top-6 text-4xl lg:text-3xl text-white cp z-10'
						onClick={() => {
							setIsShowPayment(false)
						}}
					/>
					<div className='w-full h-full flex flex-col gap-y-10 md:mt-12 overflow-y-auto relative'>
						{/* Display final payment amount */}
						<div className='flex gap-x-2 md:flex-col md:gap-y-3'>
							<p className='text-white text-3xl md:text-3xl'>
								مبلغ قابل پرداخت:‌
							</p>
							<p className='text-white text-3xl md:text-2xl'>
								{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
								تومان
							</p>
						</div>

						{/* Discount code input */}
						<div className='flex justify-between w-[400px] md:flex-col md:w-full md:gap-y-3'>
							<p className='text-white text-3xl'>کد تخفیف:</p>
							<input
								type='text'
								value={discountCode}
								className='outline-4 outline-white border-2 border-white bg-secondary rounded-md px-3 text-xl dir-ltr text-white h-9 '
								onChange={(e) => {
									setDiscountCode(e.target.value)
								}}
							/>
						</div>

						{/* Delivery time selection */}
						<div className='w-96 flex flex-col gap-y-5 md:w-full'>
							<p className='text-white text-3xl'>زمان تحویل</p>
							<select
								id='countries'
								className='bg-secondary border border-white outline-none cp text-white rounded-lg focus:ring-blue-500 block w-full p-2.5 text-xl'
								onChange={(e) => {
									setSelectedTime(e.nativeEvent.target.value)
								}}>
								<option value={0}>تایم آزاد</option>

								{/* Render delivery time options */}
								{breakeTime.map((breake) => (
									<option
										key={breake.id}
										value={breake.id}
										disabled={
											new Date().getHours() >= breake.endHour
												? new Date().getMinutes() > breake.endMinutes
													? true
													: new Date().getHours() > breake.endHour
													? true
													: false
												: false
										}>
										{breake.title}
									</option>
								))}
							</select>
						</div>

						{/* Complete purchase button */}
						<Link
							to='#'
							onClick={orderRegistration}
							className='w-full h-14 rounded-lg md:h-10 text-xl text-white md:rounded-sm bg-primaryBTN hover:bg-hoverConfirmBTN transition-colors duration-200 flex justify-center items-center absolute bottom-0 md:bottom-14'>
							تکمیل خرید
						</Link>
					</div>
				</div>
			</div>
			{isShowNotification && (
				<Notification
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			)}
		</>
	)
}

import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'
import { useEffect, useState } from 'react'
// import products from '../../datas'
import { IoArrowDown } from "react-icons/io5";
import { breakeTime } from '../../datas';

export default function Cart() {
	const [productCart, setProductCart] = useState(
		JSON.parse(localStorage.getItem('productCart'))
	)

	const [totalPrice, setTotalPrice] = useState(0)
	const [totalDisCount, setTotalDiscount] = useState(0)
	const [isShowPatment, setIsShowPayment] = useState(false)
	const [discountCode, setDiscountCode] = useState('')
	const [selectedTime, setSelectedTime] = useState(0)

	useEffect(() => {
		totalPriceHandler()

		document.querySelector('.order-btn').addEventListener('click', () => {
			setIsShowPayment(true)
		})
	}, [])

	useEffect(() => {
		// code
	}, [selectedTime])

	const removeHandler = () => {
		setProductCart(JSON.parse(localStorage.getItem('productCart')))
	}


	// total price and discount
	const totalPriceHandler = async () => {
		const mainProductCard = JSON.parse(localStorage.getItem('productCart'))
		const productsData = []

		// get products data with id
		try {
			const res = await fetch('http://localhost:3000/products', {
				method: 'GET',
				credentials: 'include',
			})
			const products = await res.json()

			for (let product of products) {
				for (let main of mainProductCard) {
					if (product._id === main.id) {
						productsData.push({ price: product.finalPrice, count: main.count, oldPrice: product.oldPrice })
					}
				}
			}
		} catch (err) {
			console.log(err);
		}

		// computing total price 
		setTotalPrice(() => {
			let sumPrice = 0

			productsData.map(productData => {
				sumPrice += (productData.price * productData.count)
			})

			// show total price in desktop
			document.querySelector('.totalPrice').innerHTML = sumPrice

			return sumPrice
		})

		// computing total discount 
		setTotalDiscount(() => {
			let sumDiscount = 0

			productsData.map(productData => {
				if (productData.oldPrice) {
					sumDiscount += ((productData.oldPrice - productData.price) * productData.count)
				}
			})

			return sumDiscount
		})
	}

	return (<>
		<div className='w-full h-full flex flex-col relative'>
			<BackToDashboard title='سبد خرید' />

			{productCart.length > 0 ? (
				<div className='w-full h-full overflow-y-auto scroll'>
					{/* Products Purchased By The User */}
					<div className='md:divide-y-2 divide-secondary'>
						{productCart &&
							productCart.map((product) => (
								<ProductCart
									key={product.id}
									id={product.id}
									count={product.count}
									onRemove={removeHandler}
									totalPrice={totalPriceHandler}
								/>
							))}
					</div>
				</div>
			) : (
				''
			)}

			{/* Mobile Purchase Container */}
			{productCart.length > 0 ? (
				<div className='hidden w-full p-2 bg-primary lg:flex flex-col sticky bottom-0 z-20'>
					<div className='text-base py-1 font-shabnam text-white flex items-center justify-between'>
						<p>تخفیف:</p>
						<div className=''>
							{totalDisCount}
							<span className='pr-2'>تومان</span>
						</div>
					</div>

					<div className='text-base py-1 font-bold font-shabnam text-white flex items-center justify-between'>
						<p>قیمت کل:</p>
						<div>
							{totalPrice}
							<span className='pr-2'>تومان</span>
						</div>
					</div>

					<button className='w-full h-10 text-xl text-white mt-2 rounded-sm bg-primaryBTN hover:bg-hoverConfirmBTN transition-colors duration-200 text-center'
						onClick={() => {
							setIsShowPayment(true)
						}}>
						ثبت سفارش
					</button>
				</div>
			) : (
				<div className='w-full h-full text-white text-2xl font-bold lg:mt-10 flex items-center flex-col'>
					<img src='/images/sad_cart.png' />

					<p className='mt-10
					'>سبد خرید شما خالی است</p>
				</div>
			)}

			{/* Registration of the final order */}
			<div className={`w-full bg-secondary absolute z-40 ${isShowPatment ? 'visible h-full' : 'invisible h-0'} rounded-dashboardcontainer transition-all
			absolute bottom-0 duration-500 overflow-hidden p-7 md:p-4`}>
				<IoArrowDown className='absolute left-6 top-6 text-4xl lg:text-3xl text-white' onClick={() => {
					setIsShowPayment(false)
				}} />
				<div className='w-3/4 h-full flex flex-col gap-y-10 md:mt-12 overflow-y-auto relative'>
					<div className='flex gap-x-2 md:flex-col md:gap-y-3'>
						<p className='text-white text-3xl md:text-3xl'>
							ملبغ قابل پرداخت:‌
						</p>
						<p className='text-white text-3xl md:text-2xl'>{totalPrice} تومان</p>
					</div>
					<div className='flex justify-between w-[400px] md:flex-col md:w-full md:gap-y-3'>
						<p className='text-white text-3xl'>
							کد تخفیف:
						</p>
						<input type="text" value={discountCode} className='outline-4 outline-white border-2 border-white bg-secondary rounded-md px-3 text-xl dir-ltr text-white h-9'
							onChange={e => {
								setDiscountCode(e.target.value)
							}} />
					</div>
					<div className='w-96 flex flex-col gap-y-5 md:w-full'>
						<p className='text-white text-3xl'>زمان تحویل</p>
						<select id="countries" className="bg-secondary border border-white text-white rounded-lg focus:ring-blue-500 block w-full p-2.5 text-xl"
							onChange={e => {
								setSelectedTime(e.nativeEvent.target.value)
							}}>
							<option value={0}>تایم آزاد</option>
							{
								breakeTime.map(breake => (
									<option key={breake.id} value={breake.id} disabled={new Date().getHours() >= breake.endHour ? new Date().getMinutes() > breake.endMinutes ? true : (new Date().getHours() > breake.endHour ? true : false) : false}>{breake.title}</option>
								))
							}
						</select>
					</div>
					<a href="#" className='w-full h-14 rounded-lg md:h-10 text-xl text-white md:rounded-sm bg-primaryBTN hover:bg-hoverConfirmBTN transition-colors duration-200 flex justify-center items-center absolute bottom-0 md:bottom-14'>تکمیل خرید</a>
				</div>
			</div>
		</div>
	</>
	)
}

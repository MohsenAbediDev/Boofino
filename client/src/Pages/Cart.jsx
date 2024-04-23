import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'
import { useEffect, useState } from 'react'
import products from '../../datas'

export default function Cart() {
	const [productCart, setProductCart] = useState(
		JSON.parse(localStorage.getItem('productCart'))
	)

	const [totalPrice, setTotalPrice] = useState(0)
	const [totalDisCount, setTotalDiscount] = useState(0)

	useEffect(() => {
		totalPriceHandler()
	}, [])

	const removeHandler = () => {
		setProductCart(JSON.parse(localStorage.getItem('productCart')))
	}


	// total price and discount
	const totalPriceHandler = () => {
		const mainProductCard = JSON.parse(localStorage.getItem('productCart'))
		const productsData = []

		// get products data with id
		for (let product of products) {
			for (let main of mainProductCard) {
				if (product.id === main.id) {
					productsData.push({ price: product.price, count: main.count, oldPrice: product.oldPrice })
				}
			}
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

	return (
		<div className='w-full h-full flex flex-col'>
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
				<div className='hidden w-full p-2 bg-primary lg:flex flex-col sticky bottom-0 z-50'>
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

					<button className='w-full h-10 text-xl text-white mt-2 rounded-sm bg-primaryBTN hover:bg-hoverConfirmBTN transition-colors duration-200 text-center'>
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
		</div>
	)
}

import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'
import { useState } from 'react'

export default function Cart() {
	const [productCart, setProductCart] = useState(
		JSON.parse(localStorage.getItem('productCart'))
	)

	const removeHandler = () => {
		setProductCart(JSON.parse(localStorage.getItem('productCart')))
	}

	console.log(productCart)

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
							10,000
							<span className='pr-2'>تومان</span>
						</div>
					</div>

					<div className='text-base py-1 font-bold font-shabnam text-white flex items-center justify-between'>
						<p>قیمت کل:</p>
						<div>
							190,000
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

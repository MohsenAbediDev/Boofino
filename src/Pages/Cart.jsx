import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'

export default function Cart() {
	return (
		<div className='w-full h-full flex flex-col'>
			<BackToDashboard title='سبد خرید' />

			<div className='w-full h-full overflow-y-auto scroll'>
				{/* Products Purchased By The User */}
				<div className='md:divide-y-2 divide-secondary'>
					<ProductCart />
					<ProductCart />
					<ProductCart />
					<ProductCart />
				</div>
			</div>

			{/* Mobile Purchase Container */}
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
		</div>
	)
}

import BackToDashboard from '../Common/Components/BackToDashboard'
import ProductCart from '../Common/Components/ProductCart'

export default function Cart() {
	return (
			<div className='w-full h-full overflow-y-auto scroll'>
				<BackToDashboard title='سبد خرید' />
				
				{/* Products Purchased By The User */}
				<div className='md:divide-y-2 divide-secondary'>
					<ProductCart />
					<ProductCart />
					<ProductCart />
					<ProductCart />
				</div>
			</div>
	)
}

import ProductCart from '../Common/Components/ProductCart'
import { MdArrowForwardIos } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

export default function Cart() {
	return (
		<div className='flex flex-col w-full'>
			<div className='flex items-center text-white text-3xl md:text-xl md:px-5 md:my-2 w-full'>
				<NavLink to='/dashboard'>
					<MdArrowForwardIos className='text-xl cp ml-2' />
				</NavLink>
				سبد خرید
			</div>

			<div className='w-full h-full overflow-y-auto scroll'>
				{/* Products Purchased By The User */}
				<div className='md:divide-y-2 divide-secondary'>
					<ProductCart />
					<ProductCart />
					<ProductCart />
					<ProductCart />
				</div>
			</div>
		</div>
	)
}

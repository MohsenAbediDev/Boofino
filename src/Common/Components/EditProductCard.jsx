import { Link } from 'react-router-dom'
import { selectedProduct } from '../contexts/selectedProductsContext'
import { useContext } from 'react'

export default function EditProductCard({
	_id,
	imgUrl,
	name,
	dateTime,
	price,
	itemCount,
}) {

	const setSelectedProducts = useContext(selectedProduct)

	return (
		<div className='flex items-center w-full'>
			<div className='flex justify-center items-center bg-secondary h-[170px] rounded-r-2xl md:h-[200px]'>
				<input
					type='checkbox'
					className='w-6 h-6 md:h-5 md:w-5 mr-5 outline-none cp'

					// set product name to selectedProducts
					onChange={e => {
						if (e.target.checked) {
							setSelectedProducts(prevProducts => {
								// Checking the existence of the product
								if(!prevProducts.includes(name)){
									return [...prevProducts, name]
								}
								return prevProducts
							})
						} else {
							setSelectedProducts(prevProducts => {
								if(prevProducts.includes(name)){
									const newProducts = prevProducts.filter(product => product !== name)
									return newProducts
								}
								return prevProducts
							})
						}
					}}
				/>
			</div>

			<Link to={`/edit-product/${name}`} className='w-full'>
				<div className='bg-secondary h-[170px] w-full rounded-l-2xl my-5 md:my-5 md:h-[200px]'>
					<div className='h-full p-5 flex justify-between md:p-2 md:flex-col md:justify-around'>
						<div className='flex items-center w-1/2 md:w-full'>
							<img
								src={imgUrl}
								className={`w-32 h-32 rounded-lg ml-5
              md:w-24 md:h-24 md:mx-4`}
							/>
							<p className='text-2xl md:text-xl'>{name}</p>
						</div>
						<div className='grid grid-cols-3 justify-items-center items-center w-1/2 md:grid-cols-2 md:w-full md:mx-auto'>
							<p className='md:text-lg'>
								{dateTime.split('T')[0].replace(/-/g, '/')}
							</p>
							<p
								className={`w-20 h-10 flex justify-center items-center rounded-lg ${itemCount > 0 ? 'bg-green md:w-16' : 'bg-red md:w-[70px]'
									}
               md:h- md:text-lg`}
							>
								{itemCount > 0 ? 'موجود' : 'ناموجود'}
							</p>
							<p className='md:text-xl'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

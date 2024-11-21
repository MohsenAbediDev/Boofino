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
	selectedProducts,
}) {
	const setSelectedProducts = useContext(selectedProduct)

	const selectProduct = (e) => {
		if (e.target.checked) {
			setSelectedProducts((prevProducts) => {
				// Checking the existence of the product
				if (!prevProducts.includes(name)) {
					return [...prevProducts, name]
				}
				return prevProducts
			})
		} else {
			setSelectedProducts((prevProducts) => {
				if (prevProducts.includes(name)) {
					const newProducts = prevProducts.filter((product) => product !== name)
					return newProducts
				}
				return prevProducts
			})
		}
	}

	return (
		<div className='flex items-center w-full sm:mb-4 md:mb-4'>
			<div className='flex justify-center items-center bg-secondary h-[100px] rounded-r-xl md:h-[100px]'>
				<input
					type='checkbox'
					className='w-5 h-5 mr-5 sm:mr-2 outline-none cp'
					checked={selectedProducts.includes(name)} // Set checkbox status
					// set product name to selectedProducts
					onChange={(e) => selectProduct(e)}
				/>
			</div>

			{/* Desktop card */}
			<Link
				to={`/edit-product/${name}`}
				className='w-full sm:hidden md:hidden my-3 md:my-3'>
				<div className='bg-secondary h-[100px] w-full rounded-l-xl md:h-[100px]'>
					<div className='h-full p-5 flex justify-between md:p-2 md:flex-col md:justify-around'>
						<div className='flex items-center w-1/2 md:w-full'>
							<img
								src={imgUrl}
								className={`w-16 h-16 rounded-lg ml-5 md:w-24 md:h-24 md:mx-4`}
							/>
							<p className='text-2xl md:text-xl'>{name}</p>
						</div>
						<div className='grid grid-cols-3 justify-items-center items-center w-1/2 md:grid-cols-2 md:w-full md:mx-auto'>
							<p className='md:text-lg'>
								{dateTime.split('T')[0].replace(/-/g, '/')}
							</p>
							<p
								className={`w-20 h-10 flex justify-center items-center rounded-lg ${
									itemCount > 0
										? 'bg-[#68AC50] md:w-16'
										: 'bg-[#FF4E4E] md:w-16'
								}
               md:text-lg`}>
								{itemCount > 0 ? 'موجود' : 'ناموجود'}
							</p>
							<p className='md:text-xl'>
								{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان
							</p>
						</div>
					</div>
				</div>
			</Link>

			{/* Mobile/Tablet card */}
			<Link
				className='hidden sm:flex md:flex w-full h-[100px] bg-secondary rounded-l-md'
				to={`/edit-product/${name}`}>
				{/* Set image */}
				<div className='my-auto w-14 h-14 mr-1'>
					<img className='object-cover w-full h-full rounded-sm' src={imgUrl} />
				</div>

				{/* Informations */}
				<div className='w-full flex flex-col mt-3 mx-2 gap-y-2'>
					{/* Name & Status */}
					<div className='flex justify-between'>
						{/* Name */}
						<p className='truncate w-[45%]'>{name}</p>

						{/* Status */}
						<p
							className={`w-20 h-10 flex justify-center items-center rounded-lg ${
								itemCount > 0 ? 'bg-[#68AC50] w-13 ' : 'bg-[#FF4E4E] w-13'
							}
               text-lg`}>
							{itemCount > 0 ? 'موجود' : 'ناموجود'}
						</p>
					</div>

					{/* Price & Time */}
					<div className='flex justify-between'>
						{/* Price */}
						<div className='flex items-center text-lg text-[#D0D0D0] gap-1'>
							<span>
								{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							</span>
							تومان
						</div>

						{/* Date & Time registration */}
						<div className='flex justify-end'>
							<span className='text-sm rounded-sm p-1'>
								{dateTime.split('T')[0].replace(/-/g, '/')}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

import { FaMinus } from 'react-icons/fa'
import products from '../../../datas'
import { useEffect, useState } from 'react'

export default function ProductCart({ id, count, onRemove, totalPrice }) {
	const [datas, setDatas] = useState(products)
	const [mainData, setMainData] = useState({})
	const [productCount, setProductCount] = useState(count)

	// get product cart items when component loeaded
	useEffect(() => {
		if (count && id) {
			const findProduct = datas.findIndex((data) => data.id === id)
			setMainData(datas[findProduct])
		}
	}, [])

	// add count of product from Cart
	const addCount = () => {
		const productData = JSON.parse(localStorage.getItem('productCart'))
		const mainDataInedx = productData.findIndex((product) => product.id === id)
		productData[mainDataInedx].count = productData[mainDataInedx].count + 1
		localStorage.setItem('productCart', JSON.stringify(productData))

		setProductCount(productData[mainDataInedx].count)
		totalPrice()
	}

	// min count of product from Cart
	const minCount = () => {
		const productData = JSON.parse(localStorage.getItem('productCart'))
		const mainDataInedx = productData.findIndex((product) => product.id === id)
		productData[mainDataInedx].count = productData[mainDataInedx].count - 1

		if (productData[mainDataInedx].count <= 0) {
			productData.splice(mainDataInedx, 1)
			localStorage.setItem('productCart', JSON.stringify(productData))
			onRemove()
		} else {
			localStorage.setItem('productCart', JSON.stringify(productData))
			setProductCount(productData[mainDataInedx].count)
		}
		totalPrice()
	}

	const removeHadnler = () => {
		const productData = JSON.parse(localStorage.getItem('productCart'))
		const mainDataInedx = productData.findIndex((product) => product.id === id)

		productData.splice(mainDataInedx, 1)
		localStorage.setItem('productCart', JSON.stringify(productData))

		onRemove()
		totalPrice()
	}

	return (
		<>
			<div className='bg-secondary h-[170px] w-full rounded-2xl my-5 md:my-0 md:rounded-none md:bg-primary md:h-[190px]'>
				<div className='w-full h-full p-5 flex justify-between md:py-3'>
					{/* Food Image */}
					<img
						src={mainData.image}
						alt=''
						className='w-32 h-32
                		md:w-28 md:h-28 md:mt-2 rounded-lg'
					/>

					<div className='h-full w-full mx-[54px] flex flex-col justify-between md:mx-4'>
						{/* Food Name */}
						<p className='text-white text-xl lg:text-lg md:text-xl font-bold'>
							{mainData.title}
						</p>

						{/* Food Category */}
						<p className='text-white text-xl md:mt-2 md:text-lg'>
							{mainData.group === 'hotFood'
								? 'غذای گرم'
								: mainData.group === 'coldFood'
									? 'غذای سرد'
									: mainData.group === 'hotDrink'
										? 'نوشیدنی داغ'
										: mainData.group === 'coldDrink'
											? 'نوشیدنی خنک'
											: mainData.group === 'edible'
												? 'خوراکی'
												: 'غیره'}
						</p>

						{/* Mobile Responsive Price */}
						<div className='hidden md:block my-2'>
							<span className='text-white text-xl'>
								{+mainData.price * +productCount}
							</span>
							<span className='text-white text-lg ms-1'>تومان</span>
						</div>

						{/* Food Count */}
						<div className='flex gap-3 md:mt-2'>
							<div>
								<div className='cart-button flex items-center justify-between text-xl border-white text-white'>
									<button
										className='mx-4 cursor-pointer outline-none md:mx-2.5'
										onClick={addCount}
									>
										+
									</button>

									<span>{productCount}</span>

									<button
										className='mx-4 cursor-pointer outline-none md:mx-2.5'
										onClick={minCount}
									>
										<FaMinus className='text-sm' />
									</button>
								</div>
							</div>
							<button
								className='cart-button w-28 text-red border-red hover:bg-red text-xl hover:text-white transition-all duration-200 md:w-20'
								onClick={removeHadnler}
							>
								حذف
							</button>
						</div>
					</div>

					{/* Desktop Responsive Price */}
					<div className='md:hidden'>
						<span className='text-white text-2xl'>
							{+mainData.price * +productCount}
						</span>
						<span className='text-white text-2xl ms-1'>تومان</span>
					</div>
				</div>
			</div>
		</>
	)
}

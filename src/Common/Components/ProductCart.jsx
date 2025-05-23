import { FaMinus } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { addCount, minCount, removeProduct, host } from '../../utils/utils'

export default function ProductCart({ id, count, onRemove, totalPrice }) {
	const [datas, setDatas] = useState([])
	const [mainData, setMainData] = useState({})
	const [productCount, setProductCount] = useState(count)

	// get product cart items when component loaded
	useEffect(() => {
		getDatas()
	}, [])

	useEffect(() => {
		if (datas.length > 0 && id) {
			const findProduct = datas.find((data) => data._id === id)
			setMainData(findProduct || {})
		}
	}, [datas, id])

	useEffect(() => {
		setProductCount(count)
	}, [count])

	const getDatas = async () => {
		try {
			const res = await fetch(`${host}/products`, {
				method: 'GET',
				credentials: 'include',
			})

			const data = await res.json()
			setDatas(data)
		} catch (err) {
			console.log(err)
		}
	}

	// add count of product from Cart
	const addProductCount = () => {
		addCount(setProductCount, id, count)
		totalPrice()
	}

	// min count of product from Cart
	const minProductCount = () => {
		minCount(setProductCount, id)
		onRemove()
		totalPrice()
	}

	const removeHadnler = () => {
		removeProduct(id)

		onRemove()
		totalPrice()
	}

	return (
		<>
			<div className='bg-secondary h-[170px] w-full rounded-2xl my-5 md:my-0 md:rounded-none md:bg-primary md:h-[190px]'>
				<div className='w-full h-full p-5 flex justify-between md:py-3'>
					{mainData && (
						<>
							{/* Food Image */}
							<img
								src={mainData.imgUrl}
								className='w-32 h-32 md:w-28 md:h-28 md:mt-2 rounded-lg'
							/>

							<div className='h-full w-full mx-[54px] flex flex-col justify-between md:mx-4'>
								{/* Food Name */}
								<p className='text-white text-xl lg:text-lg md:text-xl font-bold'>
									{mainData.name}
								</p>

								{/* Food Category */}
								<p className='text-white text-xl md:mt-2 md:text-lg'>
									{mainData.group === 'hotfood'
										? 'غذای گرم'
										: mainData.group === 'coldfood'
										? 'غذای سرد'
										: mainData.group === 'hotdrink'
										? 'نوشیدنی داغ'
										: mainData.group === 'colddrink'
										? 'نوشیدنی خنک'
										: mainData.group === 'edible'
										? 'خوراکی'
										: 'غیره'}
								</p>

								{/* Mobile Responsive Price */}
								<div className='hidden md:block my-2'>
									<span className='text-white text-xl'>
										{(+mainData.finalPrice * +productCount)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</span>
									<span className='text-white text-lg ms-1'>تومان</span>
								</div>

								{/* Food Count */}
								<div className='flex gap-3 md:mt-2'>
									<div>
										<div className='cart-button flex items-center justify-between text-xl border-white text-white'>
											<button
												className='mx-4 cursor-pointer outline-none md:mx-2.5'
												onClick={addProductCount}>
												+
											</button>

											<span>{productCount}</span>

											<button
												className='mx-4 cursor-pointer outline-none md:mx-2.5'
												onClick={minProductCount}>
												<FaMinus className='text-sm' />
											</button>
										</div>
									</div>
									<button
										className='cart-button w-28 text-red border-red hover:bg-red text-xl hover:text-white transition-all duration-200 md:w-20'
										onClick={removeHadnler}>
										حذف
									</button>
								</div>
							</div>
							{/* Desktop Responsive Price */}
							<div className='md:hidden'>
								<span className='text-white text-2xl'>
									{(+mainData.finalPrice * +productCount)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</span>
								<span className='text-white text-2xl ms-1'>تومان</span>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

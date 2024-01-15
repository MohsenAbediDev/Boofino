import { useEffect, useRef, useState } from 'react'
import { addCount, minCount } from '../../utils/utils'

export default function FoodCard({
	id,
	group,
	title,
	image,
	price,
	isDiscount,
	oldPrice,
}) {
	const [productsID, setProductsID] = useState([])
	const [count, setCount] = useState(1)
	const inputRef = useRef()

	// add product to Cart
	const addToCart = () => {
		const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
		setCount(1)

		const mainProductCartID = mainProductCart
			? mainProductCart.map((product) => product.id)
			: []

		if (!mainProductCartID.includes(id)) {
			if (!mainProductCart) {
				localStorage.setItem(
					'productCart',
					JSON.stringify([{ id: id, count: 1 }])
				)
				setProductsID([id])
			} else {
				localStorage.setItem(
					'productCart',
					JSON.stringify([...mainProductCart, { id: id, count: 1 }])
				)
				setProductsID([...mainProductCartID, id])
			}
		}
	}

	const addProductCount = () => {
		addCount(setCount, id)
	}

	const minProductCount = () => {
		minCount(setCount, id)
	}


	// remove product from cart
	useEffect(() => {
		if (count < 1) {
			const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
			const productsId = mainProductCart.map(product => product.id)
			setProductsID(productsId)
		}
	}, [count])

	useEffect(() => {
		const mainProductCart = JSON.parse(localStorage.getItem('productCart'))

		const mainProductCartID = mainProductCart
			? mainProductCart.map((product) => product.id)
			: []

		setProductsID(mainProductCartID)

		setCount((prevCount) => {
			const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
			const mainProductIndex = mainProductCart
				? mainProductCart.findIndex((product) => product.id === id)
				: -1

			if (mainProductIndex !== -1) {
				return mainProductCart[mainProductIndex].count
			} else {
				return prevCount
			}
		})
	}, [])

	return (
		<>
			<div
				className='bg-white h-72 max-w-[180px] min-w-[180px] rounded-md p-3 relative mx-3
				md:min-w-[175px] md:max-w-[175px] md:h-[270px] select-none'
			>
				<div className='w-full h-full relative'>
					<img
						className={`h-[150px] w-full mx-auto bg-cover rounded-md`}
						src={image}
					></img>
					<h1
						className='text-black mt-1 text-lg font-extrabold font-shabnam
					md:text-md md:mt-0.5'
					>
						{title}
					</h1>

					{/* price */}
					{!isDiscount ? (
						<h3
							className='text-price mt-1 text-sm font-extrabold font-shabnam
								md:mt-1'
						>
							{price} تومان
						</h3>
					) : (
						<div
							className='flex flex-col leading-5
							md:flex-row md:gap-x-2'
						>
							<h3
								className='text-price mt-0.5 text-sm font-extrabold font-shabnam
									md:mt-1'
							>
								{price} تومان
							</h3>
							<h3
								className='text-dashboardItemActive text-sm font-extrabold font-shabnam line-through decoration-red
									md:mt-1 md:text-xs'
							>
								{oldPrice} تومان
							</h3>
						</div>
					)}

					{!productsID.includes(id) ? (
						<button
							className='bg-primaryBTN hover:bg-hoverBTN transition-colors w-full h-8 font-shabnam text-white rounded-md absolute bottom-0'
							onClick={addToCart}
						>
							افزودن به سبد خرید
						</button>
					) : (
						<div className='w-full h-8 font-shabnam text-white absolute bottom-0 flex justify-center gap-x-2'>
							<button
								className='bg-primaryBTN hover:bg-hoverBTN w-1/4 rounded-md'
								onClick={addProductCount}
							>
								+
							</button>

							{/* count of product */}
							<input
								type='text'
								className='h-full w-1/3 text-black text-xl border-primaryBTN border-2 outline-primaryBTN outline-2 rounded-md
									text-center'
								value={count}
								disabled
								ref={inputRef}
							/>

							<button
								className='bg-primaryBTN hover:bg-hoverBTN w-1/4 rounded-md'
								onClick={minProductCount}
							>
								-
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

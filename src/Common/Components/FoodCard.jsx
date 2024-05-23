import { useEffect, useRef, useState } from 'react'
import { addCount, minCount, addToCart } from '../../utils/utils'

export default function FoodCard({
	_id,
	group,
	name,
	imgUrl,
	finalPrice,
	isDiscount,
	oldPrice,
	itemCount
}) {
	const [productsID, setProductsID] = useState([])
	const [count, setCount] = useState(1)
	const inputRef = useRef()

	// add product to Cart
	const addProductToCart = () => {
		addToCart(setCount, setProductsID, _id)
	}

	const addProductCount = () => {
		addCount(setCount, _id, itemCount)
	}

	const minProductCount = () => {
		minCount(setCount, _id)
	}


	// remove product from cart
	useEffect(() => {
		if (count < 1) {
			const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
			const productsId = mainProductCart.map(product => product._id)
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
				? mainProductCart.findIndex((product) => product.id === _id)
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
						src={imgUrl}
					></img>
					<h1
						className='text-black mt-1 text-[17px] font-extrabold font-shabnam
					md:text-md md:mt-0.5'
					>
						{name}
					</h1>

					{/* price */}
					{!isDiscount ? (
						<h3
							className='text-price mt-1 text-sm font-extrabold font-shabnam
								md:mt-1'
						>
							{finalPrice} تومان
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
								{finalPrice} تومان
							</h3>
							<h3
								className='text-dashboardItemActive text-sm font-extrabold font-shabnam line-through decoration-red
									md:mt-1 md:text-xs'
							>
								{oldPrice} تومان
							</h3>
						</div>
					)}

					{!productsID.includes(_id) ? (
						<button
							className='bg-primaryBTN hover:bg-hoverBTN transition-colors w-full h-8 font-shabnam text-white rounded-md absolute bottom-0'
							onClick={addProductToCart}
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

import { useState, useRef } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function Menu({ children, grouping }) {
	const [scroll, setScroll] = useState(false)
	const menuContainer = useRef()

	let scrollPosition = 1200

	const scrollLeft = () => {
		const menu = menuContainer.current
		scrollPosition += 1200

		if (scrollPosition >= menu.scrollWidth) {
			scrollPosition = menu.scrollWidth
		}
		if (!scroll) {
			setScroll(true)

			return false
		}
		menu.scrollBy(-1200, 0)
	}

	const scrollRight = () => {
		const menu = menuContainer.current
		scrollPosition -= 1200

		if (scrollPosition <= 0) {
			scrollPosition = 0
			setScroll(false)
			setTimeout(() => {
				menu.scrollTo(0, 0)
			}, 500)
		}
		if (!scroll) {
			setScroll(true)

			return false
		}

		menu.scrollBy(1200, 0)
	}

	return (
		<>
			<div
				className='w-full h-[351px] bg-menu rounded-[11px] rounded-ee-[64px] relative flex items-center overflow-hidden my-8
			sm:rounded-none'
			>
				<button className='left-2.5 scrollBTN' onClick={scrollLeft}>
					<AiOutlineArrowLeft />
				</button>

				{/* group image and title */}
				<div
					className={`h-full w-[556px] float-right dir-rtl absolute right-0 z-0  transition-opacity duration-500 ${
						scroll && 'opacity-40'
					}`}
				>
					<p
						className='text-white text-menu font-bold m-3 absolute
					md:text-[30px] md:mt-2 select-none'
					>
						{/* Insert Food Menu Grouping */}
						{grouping == 'hot' && 'غذا های گرم'}
						{grouping == 'cold' && 'غذا های سرد'}
						{grouping == 'drink' && 'نوشیدنی ها'}
						{grouping == 'edible' && 'خوراکی ها'}
					</p>

					{/* Insert Food Menu Image's */}
					<img
						src={`./images/${
							(grouping == 'hot' && 'hotfood.png') ||
							(grouping == 'cold' && 'coldfood.png') ||
							(grouping == 'drink' && 'drink.png') ||
							(grouping == 'edible' && 'edible.png')
						}`}
						alt='Boofino Food Menu'
						className='w-full h-2/3 bottom-0 absolute
						md:opacity-40 select-none'
					/>
				</div>

				{/* main menu container */}
				<div
					ref={menuContainer}
					className={`h-full ${
						scroll ? 'w-full' : 'w-2/3'
					} transition-all duration-500 flex items-center absolute overflow-x-auto dir-rtl no-scroll scroll-smooth
					md:w-full md:-bottom-6`}
				>
					{children}
				</div>

				{scroll && (
					<button className='right-2.5 scrollBTN' onClick={scrollRight}>
						<AiOutlineArrowRight />
					</button>
				)}
			</div>
		</>
	)
}

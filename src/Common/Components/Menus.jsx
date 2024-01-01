import Menu from './Menu'
import FoodCard from './FoodCard'
// import useGetFetch from '../Hooks/useGetFetch'
import { BiSolidStarHalf } from 'react-icons/bi'
import { RxBorderSolid } from 'react-icons/rx'

export default function Menus() {
	// const {datas, isLoading, error} = useGetFetch('https://kmmwkyppcirzjhgcemof.supabase.co')

	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{/* Menu Category Title */}
			<div className='font-bold text-xl text-white flex items-center'>
				<div className='flex items-center'>
					{/* Star Icon */}
					<BiSolidStarHalf className='w-6 text-[#FF8F00]' />
					{/* Line Icon */}
					<RxBorderSolid className='w-5' />
				</div>

				<span className='text-xl ps-[15px] pe-[15px] font-shabnam'>غذاها</span>

				<div className='flex items-center'>
					{/* Line Icon */}
					<RxBorderSolid className='w-5' />
					{/* Star Icon */}
					<BiSolidStarHalf className='w-6 text-[#FF8F00]' />
				</div>
			</div>

			{/* Menu Slider */}
			<div className='min-h-screen w-full flex flex-col items-center'>
				{/* Hot Food Slider */}
				<Menu grouping='hotFood'>
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
				</Menu>

				{/* Cold Food Slider */}
				<Menu grouping='coldFood'>
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
				</Menu>

				{/* Hot Drink Slider */}
				<Menu grouping='hotDrink'>
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
				</Menu>

				{/* Cold Drink Slider */}
				<Menu grouping='coldDrink'>
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
					<FoodCard />
				</Menu>
			</div>
		</div>
	)
}

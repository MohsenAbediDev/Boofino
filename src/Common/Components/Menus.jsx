import Menu from './Menu'
import MenuTitles from './MenuTitles'
import FoodCard from './FoodCard'
// import useGetFetch from '../Hooks/useGetFetch'
import { BiSolidStarHalf } from 'react-icons/bi'
import { RxBorderSolid } from 'react-icons/rx'

export default function Menus() {
	// const {datas, isLoading, error} = useGetFetch('https://kmmwkyppcirzjhgcemof.supabase.co')

	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{/* Food's Menu */}
			<MenuTitles title='غذاها' />

			<div className='w-full flex flex-col items-center'>
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
			</div>

			{/* Drink's Menu */}
			<MenuTitles title='نوشیدنی‌ها' />

			<div className='w-full flex flex-col items-center'>
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

			{/* Edible's Menu */}
			<MenuTitles title='خوراکی‌ها' />

			<div className='w-full flex flex-col items-center'>
				<Menu grouping='edible'>
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

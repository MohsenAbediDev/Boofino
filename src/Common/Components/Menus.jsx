import Menu from './Menu'
import MenuTitles from './MenuTitles'
import FoodCard from './FoodCard'
// import useGetFetch from '../Hooks/useGetFetch'
import products from '../../../datas'
import { useEffect, useRef, useState } from 'react'

export default function Menus() {
	// const {datas, isLoading, error} = useGetFetch('https://kmmwkyppcirzjhgcemof.supabase.co')

	const [datas, setDatas] = useState(products)
	const [groups, setGroups] = useState([])

	// Filter groups
	useEffect(() => {
		const allGroups = datas.map(data => data.group)
		const filteredGroups = new Set(allGroups)

		setGroups(Array.from(filteredGroups))
	}, [])


	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{/* Food's Menu */}

			<MenuTitles title='غذاها' />
			
			<div className='w-full flex flex-col items-center'>
				{
					// show group menu
					groups.map(group => (
						<Menu grouping={group} key={group}>
							{/* Show products in their own group */}
							{

								datas.map(data => data.group === group && <FoodCard {...data} key={data.id} />)
							}
						</Menu>
					))
				}
			</div>

			{/* <MenuTitles title='غذاها' />

			<div className='w-full flex flex-col items-center'> */}
			{/* Hot Food Slider */}


			{/* <Menu grouping='hotFood'>
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
				</Menu> */}

			{/* Cold Food Slider */}
			{/* <Menu grouping='coldFood'>
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
			</div> */}

			{/* Drink's Menu */}
			{/* <MenuTitles title='نوشیدنی‌ها' />

			<div className='w-full flex flex-col items-center'> */}
			{/* Hot Drink Slider */}
			{/* <Menu grouping='hotDrink'>
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
				</Menu> */}

			{/* Cold Drink Slider */}
			{/* <Menu grouping='coldDrink'>
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
			</div> */}

			{/* Edible's Menu */}
			{/* <MenuTitles title='خوراکی‌ها' />

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
			</div> */}
		</div>
	)
}

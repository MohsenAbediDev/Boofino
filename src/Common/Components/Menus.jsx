import { useEffect, useRef, useState } from 'react'

import Menu from './Menu'
import MenuTitles from './MenuTitles'
import FoodCard from './FoodCard'
import products from '../../../datas'

export default function Menus() {
	const [datas, setDatas] = useState(products)
	const [groups, setGroups] = useState([])

	//? Filter groups
	useEffect(() => {
		const allGroups = datas.map((data) => data.group)
		const filteredGroups = new Set(allGroups)

		setGroups(Array.from(filteredGroups))
	}, [])

	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{/* Food's Menu */}
			<MenuTitles title='غذاها' />

			<div className='w-full flex flex-col items-center'>
				{
					//? show group menu
					groups.map((group) => (
						<Menu grouping={group} key={group}>
							{/* Show products in their own group */}
							{datas.map(
								(data) =>
									data.group === group && <FoodCard {...data} key={data.id} />
							)}
						</Menu>
					))
				}
			</div>
		</div>
	)
}

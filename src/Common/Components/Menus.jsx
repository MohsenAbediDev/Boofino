import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Menu from './Menu'
import MenuTitles from './MenuTitles'
import FoodCard from './FoodCard'
import { getUser } from '../../utils/utils'

export default function Menus() {
	const [datas, setDatas] = useState([])
	const [userSchool, setUserSchool] = useState()
	const [groups, setGroups] = useState([])

	// Get data from user
	const userData = async () => {
		const data = await getUser()

		setUserSchool(data[0].schoolId)
	}

	useEffect(() => {
		getDatas()
	}, [])

	useEffect(() => {
		const allGroups = datas.map((data) => data.group)
		const filteredGroups = new Set(allGroups)

		userData()
		setGroups(Array.from(filteredGroups))
		console.log(datas);
	}, [datas])

	const getDatas = async () => {

		try {
			const res = await fetch('http://localhost:3000/products', {
				method: 'GET',
				credentials: 'include',
			})

			const data = await res.json()
			setDatas(data)
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{!userSchool ? (
				<div className='w-full h-full text-white text-2xl font-bold lg:mt-10 flex items-center flex-col'>
					<img src='/images/broken-school.png' />

					<p>! هنوز مدرستو انتخاب نکردی</p>

					<NavLink
						to='/dashboard/editprofile'
						className='my-10 p-4 bg-primaryBTN rounded-md'
					>
						انتخاب مدرسه
					</NavLink>
				</div>
			) : (
				<>
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
											data.group === group && data.itemCount > 0 && (
												<FoodCard {...data} key={data.id} />
											)
									)}
								</Menu>
							))
						}
					</div>
				</>
			)}
		</div>
	)
}

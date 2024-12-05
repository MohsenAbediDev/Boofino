import { useEffect, useState } from 'react'
import { getUser, host } from '../../utils/utils'
import { NavLink } from 'react-router-dom'

import Menu from './Menu'
import MenuTitles from './MenuTitles'
import FoodCard from './FoodCard'

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
		const allData = datas.filter((data) => data.itemCount > 0)
		const allGroups = allData.map((data) => data.group)
		const filteredGroups = new Set(allGroups)

		userData()
		setGroups(Array.from(filteredGroups))
	}, [datas])

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

	return (
		<div className='container flex flex-col items-center justify-center mt-5'>
			{/* If user has not selected a school */}
			{!userSchool ? (
				<div className='w-full h-full text-white text-2xl font-bold mb-14 lg:mt-10 flex items-center flex-col'>
					<img src={`${host}/contents/broken-school.png`} alt='broken school' />
					<p>! هنوز مدرستو انتخاب نکردی</p>
					<NavLink
						to='/dashboard/editprofile'
						className='my-10 p-4 bg-primaryBTN rounded-md'>
						انتخاب مدرسه
					</NavLink>
				</div>
			) : !datas.length ? (
				// If user has selected a school but no products are available
				<div className='w-full h-full text-white text-2xl font-bold mb-14 lg:mt-10 flex items-center flex-col'>
					<img
						className='w-[256px]'
						src={`${host}/contents/product-notfound.png`}
						alt='no products'
					/>

					<p>محصولی در این فروشگاه هنوز ثبت نشده</p>
				</div>
			) : (
				// If user has selected a school and there are products
				<>
					<MenuTitles title='منو' />
					<div className='w-full flex flex-col items-center'>
						{groups.map((group) => (
							<Menu grouping={group} key={group}>
								{datas.map(
									(data) =>
										data.group === group &&
										data.itemCount > 0 && <FoodCard {...data} key={data.id} />
								)}
							</Menu>
						))}
					</div>
				</>
			)}
		</div>
	)
}

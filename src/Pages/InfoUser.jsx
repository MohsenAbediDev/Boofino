import { useState, useEffect } from 'react'
import { getUser, host } from '../utils/utils'

import { NavLink } from 'react-router-dom'

export default function InfoUser() {
	const [fullName, setFullName] = useState('')
	const [imgUrl, setImgUrl] = useState('')
	const [phonenumber, setPhonenumber] = useState('')
	const [username, setUsername] = useState('')
	const [school, setSchool] = useState('')
	
	useEffect(() => {
		userData()
	}, [school])
	
	const userData = async () => {
		const data = await getUser()
		setFullName(data[0].fullname)
		setPhonenumber(data[0].phonenumber)
		setUsername(data[0].username)
		setImgUrl(data[0].imgUrl)

		const userSchool = (data[0].schoolId).toString()

		fetch(`${host}/schools`)
			.then(res => res.json())
			.then(data => {
				const findSchool = data.find(school => school.schoolId === userSchool)
				setSchool(findSchool.name)
		})
			.catch(() => setSchool('نشد که بشه'))

	}

	return (
		<div className='w-full h-fit px-2 py-5 flex flex-col rounded-2xl text-xl text-white bg-secondary'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<img
						src={`${imgUrl ? imgUrl : './images/blankUserProfile.png'}`}
						className='w-[60px] h-[60px] rounded-full'
					/>
					<p className='mr-2'>مشخصات کاربر</p>
				</div>

				<NavLink
					to='editprofile'
					className='text-lg bg-primaryBTN p-2 rounded-lg'
				>
					ویرایش اطلاعات
				</NavLink>
			</div>

			<div className='border mt-5 rounded-lg flex flex-col p-2 divide-y-2 divide-white bg-primary'>
				<div className='border-white p-2 flex gap-x-3 items-center lg:items-start lg:flex-col lg:gap-y-2 py-10 md:py-4'>
					<p className='text-xl sm:text-sm text-[#c7c6c6]'>
						نام و نام خانوادگی:
					</p>

					<span className='text-xl text-white md:text-lg'>{fullName}</span>
				</div>

				<div className='border-white p-2 flex gap-x-3 items-center lg:items-start lg:flex-col lg:gap-y-2 py-10 md:py-4'>
					<p className='text-xl sm:text-sm text-[#c7c6c6]'>شماره همراه:</p>

					<span className='text-xl text-white md:text-lg'>{phonenumber}</span>
				</div>

				<div className='border-white p-2 flex gap-x-3 items-center lg:items-start lg:flex-col lg:gap-y-2 py-10 md:py-4'>
					<p className='text-xl sm:text-sm text-[#c7c6c6]'>نام کاربری:</p>

					<span className='text-xl text-white md:text-lg'>{username}</span>
				</div>

				<div className='border-white p-2 flex gap-x-3 items-center lg:flex-col lg:items-start lg:gap-y-2 py-10 md:py-4'>
					<p className='text-xl sm:text-sm text-[#c7c6c6]'>مدرسه:</p>

					<span className='text-xl text-white md:text-lg'>
						{school}
					</span>
				</div>
			</div>
		</div>
	)
}

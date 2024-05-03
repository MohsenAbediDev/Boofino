import { useState, useEffect } from "react"
import { getUser } from "../utils/utils"

export default function InfoUser() {

	const [fullName, setFullName] = useState('')
	const [phonenumber, setPhonenumber] = useState('')
	const [username, setUsername] = useState('')

	useEffect(() => {
		userData()
	}, [])

	const userData = async () => {
		const data = await getUser()
		console.log(data);
		setFullName(data[0].fullname)
		setPhonenumber(data[0].phonenumber)
		setUsername(data[0].username)
	}

	return (
		<div className='w-full h-1/2 lg:h-full px-2 py-5 flex flex-col rounded-2xl text-xl text-white bg-secondary'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<img
						src='images/blankUserProfile.png'
						className='w-[45px] h-[45px] rounded-full'
					/>
					<p className='mr-2'>مشخصات کاربر</p>
				</div>

				<a href='dashboard/editprofile' className='text-lg bg-primaryBTN p-2 rounded-lg'>
					ویرایش اطلاعات
				</a>
			</div>

			<div className='border mt-5 rounded-lg flex lg:flex-col p-2'>
				<div className='border-l lg:border-l-0 lg:border-b border-white p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>
						نام و نام خانوادگی
					</p>

					<span className='text-lg text-white mt-1'>{fullName}</span>
				</div>

				<div className='border-l lg:border-l-0 lg:border-b border-white p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>شماره همراه</p>

					<span className='text-lg text-white mt-1'>{phonenumber}</span>
				</div>

				<div className='p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>نام کاربری</p>

					<span className='text-lg text-white mt-1'>
						{username}
					</span>
				</div>
			</div>
		</div>
	)
}

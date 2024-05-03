import { useState, useEffect } from 'react'
import { getUser } from '../utils/utils'
import { IoCameraOutline } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'

import InputModal from '../Common/Components/InputModal'
import SchoolsList from '../Common/Components/SchoolsList'
import { showModalContext } from '../Common/contexts/showModalContext'

export default function EditUser() {
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowNameModal, setIsShowNameModal] = useState(false)
	const [isShowEmailModal, setIsShowEmailModal] = useState(false)
	const [isShowSchoolModal, setIsShowSchoolModal] = useState(false)
	const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
	const [isShowPictureModal, setIsShowPictureModal] = useState(false)
	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)

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
		<>
			<div className='flex flex-col w-full'>
				<div className='dashboard-container grid grid-cols-2 gap-4 lg:grid-cols-1'>
					{/* name and profile box */}
					<div className='dashboard-item bg-hoverBTN min-h-[96px] flex-1'>
						<div className='box'>
							{/* user profile pic */}
							<img
								src='../images/blankUserProfile.png'
								alt=''
								className='w-full h-full'
							/>
							{/* change profile pic button */}
							<div
								className='item'
								onClick={() => {
									setIsShowModal(true)
									setIsShowPictureModal(true)
								}}
							>
								<IoCameraOutline className='text-white text-3xl' />
								<span className='text-white text-sm'>تغییر عکس</span>
							</div>
						</div>
						{/* user name */}
						<div className='flex-1 flex justify-between items-center px-3 h-full'>
							<p className='text-2xl sm:text-xl font-bold'>{fullName}</p>
							<LuPencil
								className='text-3xl sm:text-2xl cursor-pointer'
								onClick={() => {
									setIsShowNameModal(true)
									setIsShowModal(true)
								}}
							/>
						</div>
					</div>
					{/* email box */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between dir-rtl bg-dashboardItem px-5 relative'>
						<div>
							<span className='text-white text-xl absolute top-3'>نام کاربری</span>
							<p className='text-white text-2xl sm:text-xl absolute top-10 left-16'>
								{username}
							</p>
						</div>
						<LuPencil
							className='text-3xl sm:text-2xl cursor-pointer text-white'
							onClick={() => {
								setIsShowEmailModal(true)
								setIsShowModal(true)
							}}
						/>
					</div>
					{/* school box */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 relative'>
						<div>
							<span className='text-white text-xl absolute top-3'>مدرسه:</span>
							<p className='text-white text-2xl sm:text-xl absolute top-10 right-7'>
								هنرستان فنی جابر ابن حیان
							</p>
						</div>
						<LuPencil
							className='text-3xl sm:text-2xl cursor-pointer text-white'
							onClick={() => {
								setIsShowSchoolModal(true)
								setIsShowModal(true)
							}}
						/>
					</div>
					{/* change password */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5'>
						<div className='flex cursor-pointer height={384} justify-between w-full'>
							<p className='text-2xl sm:text-xl text-white'>تغییر رمز عبور</p>
							<LuPencil
								className='text-3xl sm:text-2xl text-white'
								onClick={() => {
									setIsShowPasswordModal(true)
									setIsShowModal(true)
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Overlay in Backdrop Navbar */}
			<div
				className={`app-overlay fixed w-full h-full top-0 left-0 bg-black/40 z-30 backdrop-blur transition-all ${isShowModal ? 'show' : 'hide'}`}
			>
			</div>

			{/* show input modals */}
			{isShowNameModal ? (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>نام جدید خود را وارد کنید</h1>
					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={() => {
								setIsShowNameModal(false)
								setIsShowModal(false)
							}}
						>
							لغو
						</button>
						<button className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'>
							ارسال
						</button>
					</div>
				</InputModal>
			) : isShowEmailModal ? (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>نام کاربری جدید خود را وارد کنید</h1>
					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={() => {
								setIsShowEmailModal(false)
								setIsShowModal(false)
							}}
						>
							لغو
						</button>
						<button className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'>
							ارسال
						</button>
					</div>
				</InputModal>
			) : isShowPasswordModal ? (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>پسورد جدید خود را وارد کنید</h1>
					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={() => {
								setIsShowPasswordModal(false)
								setIsShowModal(false)
							}}
						>
							لغو
						</button>
						<button className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'>
							ارسال
						</button>
					</div>
				</InputModal>
			) : isShowSchoolModal ? (
				<showModalContext.Provider value={[setIsShowModal, setIsShowSchoolModal]}>
					<SchoolsList />
				</showModalContext.Provider>
			) : isShowPictureModal ? (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>عکس جدید خود را وارد کنید</h1>
					<form className='mx-auto h-2/3 flex justify-center items-center'>
						<div className='text-white w-64 h-40 rounded-lg flex justify-center items-center'>
							{filePath ? (
								<img src={filePath} className='w-48 h-48 mt-2 select-none touch-none rounded-full' />
							) : (
								<input
									type='file'
									accept='.jpg,.png,.jpeg'
									onChange={(e) => {
										const selectedFile = e.target.files[0]
										const filePath = URL.createObjectURL(selectedFile)
										setFilePath(filePath)
										setSelectedPic(selectedFile)
									}}
								/>
							)}
						</div>
					</form>
					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={() => {
								setIsShowPictureModal(false)
								setIsShowModal(false)
								setFilePath(null)
							}}
						>
							لغو
						</button>
						{/* چون ای پی آی یوخدی قعلا واسه ارسال کردنش چیزی نزدم */}
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={() => console.log(selectedPic)}
						>
							ارسال
						</button>
					</div>
				</InputModal>
			) : (
				''
			)}
		</>
	)
}

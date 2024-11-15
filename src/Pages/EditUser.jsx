import { useState, useEffect } from 'react'
import { getUser, putUserData } from '../utils/utils'

import InputModal from '../Common/Components/Modals/InputModal'
import SchoolsList from '../Common/Components/SchoolsList'
import { showModalContext } from '../Common/contexts/showModalContext'

//? Icon's
import { IoCameraOutline } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'

export default function EditUser() {
	const [modalType, setModalType] = useState(null)
	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)

	const [fullName, setFullName] = useState('')
	const [imgUrl, setImgUrl] = useState('')
	const [phonenumber, setPhonenumber] = useState('')
	const [username, setUsername] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
	const [school, setSchool] = useState('')
	const [passwordError, setPasswordError] = useState('')

	useEffect(() => {
		userData()
	}, [school])

	const userData = async () => {
		const data = await getUser()
		setFullName(data[0].fullname)
		setPhonenumber(data[0].phonenumber)
		setUsername(data[0].username)
		setImgUrl(data[0].imgUrl)

		const userSchool = data[0].schoolId.toString()

		fetch('http://localhost:3000/schools')
			.then((res) => res.json())
			.then((data) => {
				const findSchool = data.find((school) => school.schoolId === userSchool)
				setSchool(findSchool.name)
			})
			.catch((err) => console.log(err))
	}

	// send image to database
	const uploadImage = async () => {
		if (selectedPic) {
			const formData = new FormData()
			formData.append('imgUrl', selectedPic)

			try {
				const res = await fetch('http://localhost:3000/uploadimg', {
					method: 'POST',
					credentials: 'include',
					body: formData,
				})
				const data = await res.json()
				return data
			} catch (err) {
				alert('مشکلی در بارگذاری عکس پیش آمده')
			}
		}
	}

	const editUserDatas = async (datas) => {
		const imgUrl = await uploadImage()

		if (imgUrl) {
			await putUserData({ imgUrl: imgUrl.message })
			await userData()
			closeModal()
		}
		// Put user fullname
		if (datas.value && datas.type === 'fullname') {
			await putUserData({ fullname: datas.value.trim() })
			await userData()
			closeModal()
		}
		// Put username
		if (datas.value && datas.type === 'username') {
			await putUserData({ username: datas.value.trim() })
			await userData()
			closeModal()
		}
		// Put user password
		if (datas.value && datas.type === 'password') {
			if (datas.value.trim().length < 8) {
				setPasswordError('رمزعبور باید حداقل 8 کاراکتر باشد')
				return
			}

			if (datas.value !== repeatPasswordValue) {
				setPasswordError('رمزعبور تطابق ندارد')
				return
			}

			await putUserData({ password: datas.value.trim() })
			await userData()
			closeModal()
		}
	}

	const closeModal = () => setModalType(null)

	return (
		<>
			<div className='flex flex-col w-full'>
				<div className='dashboard-container grid grid-cols-2 gap-4 lg:grid-cols-1'>
					{/* name and profile box */}
					<div className='dashboard-item bg-hoverBTN min-h-[96px] flex-1'>
						<div className='box'>
							{/* user profile pic */}
							<img
								src={`${imgUrl ? imgUrl : './images/blankUserProfile.png'}`}
								className='w-full h-full'
							/>
							{/* change profile pic button */}
							<div className='item' onClick={() => setModalType('picture')}>
								<IoCameraOutline className='text-white text-3xl' />
								<span className='text-white text-sm'>تغییر عکس</span>
							</div>
						</div>
						{/* user name */}
						<div className='flex-1 flex justify-between items-center px-3 h-full'>
							<p className='text-2xl sm:text-xl font-bold'>{fullName}</p>
							<LuPencil
								className='text-3xl sm:text-2xl cursor-pointer'
								onClick={() => setModalType('name')}
							/>
						</div>
					</div>
					{/* email box */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between dir-rtl bg-dashboardItem px-5 relative'>
						<div>
							<span className='text-white text-xl absolute top-3'>
								نام کاربری
							</span>
							<p className='text-white text-2xl sm:text-xl absolute top-10 left-16'>
								{username}
							</p>
						</div>
						<LuPencil
							className='text-3xl sm:text-2xl cursor-pointer text-white'
							onClick={() => setModalType('username')}
						/>
					</div>
					{/* school box */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 relative'>
						<div>
							<span className='text-white text-xl absolute top-3'>مدرسه:</span>
							<p className='text-white text-2xl sm:text-xl absolute top-10 right-7'>
								{school}
							</p>
						</div>
						<LuPencil
							className='text-3xl sm:text-2xl cursor-pointer text-white'
							onClick={() => setModalType('school')}
						/>
					</div>
					{/* change password */}
					<div className='dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5'>
						<div className='flex cursor-pointer height={384} justify-between w-full'>
							<p className='text-2xl sm:text-xl text-white'>تغییر رمز عبور</p>
							<LuPencil
								className='text-3xl sm:text-2xl text-white'
								onClick={() => setModalType('password')}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Overlay in Backdrop Navbar */}
			<div
				className={`app-overlay fixed w-full h-full top-0 left-0 bg-black/40 z-30 backdrop-blur transition-all ${
					modalType ? 'show' : 'hide'
				}`}></div>

			{/* show input modals */}
			{modalType === 'name' && (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>نام جدید خود را وارد کنید</h1>

					<div className='flex justify-center items-center mt-16'>
						<input
							className='text-black w-1/2 h-10 placeholder:text-lg p-2 float-left text-2xl rounded-md outline-none'
							type='text'
							placeholder='علی'
							onChange={(value) => setInputValue(value.target.value)}
						/>
					</div>

					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={closeModal}>
							لغو
						</button>
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={() =>
								editUserDatas({ value: inputValue, type: 'fullname' })
							}>
							ارسال
						</button>
					</div>
				</InputModal>
			)}
			{modalType === 'username' && (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>
						نام کاربری جدید خود را وارد کنید
					</h1>

					<div className='flex justify-center items-center mt-16'>
						<input
							className='text-black w-1/2 h-10 placeholder:text-lg dir-ltr p-2 float-left text-2xl rounded-md outline-none'
							type='text'
							placeholder='Username'
							onChange={(value) => setInputValue(value.target.value)}
						/>
					</div>

					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={closeModal}>
							لغو
						</button>
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={() =>
								editUserDatas({ value: inputValue, type: 'username' })
							}>
							ارسال
						</button>
					</div>
				</InputModal>
			)}
			{modalType === 'password' && (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>پسورد جدید خود را وارد کنید</h1>

					<div className='flex flex-col justify-center items-center gap-y-5 mt-12'>
						<input
							className='text-black w-1/2 h-10 placeholder:text-lg p-2 float-left text-2xl rounded-md outline-none'
							type='text'
							placeholder='رمز عبور جدید'
							onChange={(value) => setInputValue(value.target.value)}
						/>

						<input
							className='text-black w-1/2 h-10 placeholder:text-lg p-2 float-left text-2xl rounded-md outline-none'
							type='text'
							placeholder='تکرار رمز عبور'
							onChange={(value) => setRepeatPasswordValue(value.target.value)}
						/>

						<p className='text-red'>{passwordError}</p>
					</div>

					<div className='w-52 flex justify-between absolute bottom-10 left-10'>
						<button
							className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
							onClick={closeModal}>
							لغو
						</button>
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={() =>
								editUserDatas({ value: inputValue, type: 'password' })
							}>
							ارسال
						</button>
					</div>
				</InputModal>
			)}
			{modalType === 'school' && (
				<showModalContext.Provider value={[() => setModalType(null)]}>
					<SchoolsList onChangeName={setSchool} />
				</showModalContext.Provider>
			)}
			{modalType === 'picture' && (
				<InputModal height={384}>
					<h1 className='text-2xl text-white'>عکس جدید خود را وارد کنید</h1>
					<form className='mx-auto h-2/3 flex justify-center items-center'>
						<div className='text-white w-64 h-40 rounded-lg flex justify-center items-center'>
							{filePath ? (
								<img
									src={filePath}
									className='w-48 h-48 mt-2 select-none touch-none rounded-full'
								/>
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
								closeModal()
								setFilePath(null)
							}}>
							لغو
						</button>
						{/* Need to post profile pic url */}
						<button
							className='w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white'
							onClick={editUserDatas}>
							ارسال
						</button>
					</div>
				</InputModal>
			)}
		</>
	)
}

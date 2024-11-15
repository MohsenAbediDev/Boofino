import { useState } from 'react'
import Notification from '../Common/Components/Notification/Notification'
import BackToDashboard from '../Common/Components/BackToDashboard'

export default function AddProduct() {
	const groups = [
		{ id: 0, title: 'خوراکی', value: 'edible' },
		{ id: 1, title: 'غذای گرم', value: 'hotfood' },
		{ id: 2, title: 'غذای سرد', value: 'coldfood' },
		{ id: 3, title: 'نوشیدنی گرم', value: 'hotdrink' },
		{ id: 4, title: 'نوشیدنی سرد', value: 'colddrink' },
	]

	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [group, setGroup] = useState('')
	const [off, setOff] = useState('')
	const [count, setCount] = useState('')

	//? Notification Variable's
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isShowNotification, setIsShowNotification] = useState(false)

	const showNotification = (response) => {
		const handleResponse = (data) => {
			if (response.ok) {
				setErrorMessage('')
				setSuccessMessage(data.message)
				setIsShowNotification(true)
			} else {
				setSuccessMessage('')
				setErrorMessage(data.message)
				setIsShowNotification(true)
			}
		}

		const handleFailure = (error) => {
			console.error('Error parsing JSON:', error)
		}

		response.json().then(handleResponse).catch(handleFailure)
	}

	// send picture
	const sendPictureHandler = (e) => {
		const selectedFile = e.target.files[0]
		const filePath = URL.createObjectURL(selectedFile)
		setFilePath(filePath)
		setSelectedPic(selectedFile)
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
				setSuccessMessage('')
				setErrorMessage('مشکلی در بارگذاری عکس پیش آمده')
				setIsShowNotification(true)
			}
		}
	}

	// send product to database
	const sendToApi = async () => {
		const imgUrl = await uploadImage()

		if (imgUrl && title.trim() && price && count) {
			const productData = {
				name: title.trim(),
				price: +price,
				off: +off,
				group: group,
				finalPrice: +Math.floor(price - (off * price) / 100),
				itemCount: +count,
				imgUrl: imgUrl.message,
				isDiscount: off ? true : false,
				oldPrice: +price,
				freeTime: { 1: 1 },
			}

			try {
				await fetch('http://localhost:3000/addproduct', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(productData),
				}).then((res) => {
					showNotification(res)
					if(res.ok){
						setFilePath(null)
						setSelectedPic(null)
						setTitle('')
						setPrice('')
						setGroup('')
						setOff('')
						setCount('')
					}
				})
			} catch (err) { }
		} else {
			setSuccessMessage('')
			setErrorMessage('لطفا تمام فیلد هارا پر کنید')
			setIsShowNotification(true)
		}
	}

	return (
		<div className='w-full flex flex-col'>
			<BackToDashboard title='افزودن محصول' />
			<div className='dashboard-container h-fit py-5 flex flex-col gap-y-9 items-center justify-center'>
				{/* Select image section */}
				<div className='bg-dashboardItem shadow-xl w-40 h-40 rounded-dashboarditem flex justify-center items-center relative overflow-hidden'>
					{/* Show image */}
					{filePath && (
						<img src={filePath} className='w-full h-full absolute' />
					)}

					{/* Select image input */}
					<label
						htmlFor='image-upload'
						className='bg-primaryBTN text-white cp rounded-md p-2'
					>
						انتخاب عکس
					</label>
					<input
						type='file'
						id='image-upload'
						className='flex items-center mx-2 absolute right-[-999px]'
						accept='image/*'
						onChange={(e) => sendPictureHandler(e)}
					/>
				</div>

				{/* Input's section */}
				<div className='w-4/5 grid grid-cols-2 gap-5 lg:grid-cols-1'>
					{/* Add product name */}
					<div className='flex flex-col gap-y-4'>
						{/* Input title */}
						<label htmlFor='add-product-name' className='text-xl text-white'>
							افزودن نام
						</label>

						{/* Input */}
						<input
							type='text'
							id='add-product-name'
							placeholder='ساندویچ همبرگر'
							className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					{/* Add product price */}
					<div className='flex flex-col gap-y-4'>
						{/* Input title */}
						<label htmlFor='add-product-price' className='text-xl text-white'>
							افزودن قیمت (تومان)
						</label>

						{/* Input */}
						<input
							type='number'
							inputMode='numeric'
							id='add-product-price'
							min='0'
							placeholder='12000'
							className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>

					{/* Add product group */}
					<div className='flex flex-col gap-y-4'>
						{/* Input title */}
						<label htmlFor='add-product-group' className='text-xl text-white'>
							دسته بندی
						</label>

						{/* Input */}
						<select
							className='h-14 cp shadow-xl px-5 text-lgxt-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
							value={group}
							onChange={(e) => setGroup(e.target.value)}
						>
							<option value='' disabled>
								انتخاب کنید
							</option>
							{groups.map((group) => (
								<option value={group.value} key={group.id}>
									{group.title}
								</option>
							))}
						</select>
					</div>

					{/* Add product off */}
					<div className='flex flex-col gap-y-4'>
						{/* Input title */}
						<label htmlFor='add-product-discount' className='text-xl text-white'>
							افزودن تخفیف (عدد)
						</label>

						{/* Input */}
						<input
							type='number'
							inputMode='numeric'
							id='add-product-discount'
							min='0'
							max='100'
							placeholder='10٪'
							className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
							value={off}
							onChange={(e) => setOff(e.target.value)}
						/>
					</div>

					{/* Add product count */}
					<div className='flex flex-col gap-y-4'>
						{/* Input title */}
						<label htmlFor='add-product-count' className='text-xl text-white'>
							تعداد محصول
						</label>

						{/* Input */}
						<input
							type='number'
							inputMode='numeric'
							id='add-product-count'
							min='0'
							placeholder='25'
							className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
							value={count}
							onChange={(e) => setCount(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex justify-end w-4/5 gap-x-5'>
					<button className='h-12 w-24 bg-hoverBTN rounded-lg text-xl text-black'>
						لغو
					</button>
					<button
						className='h-12 w-24 bg-primaryBTN rounded-lg text-xl text-white'
						onClick={sendToApi}
					>
						افزودن
					</button>
				</div>
			</div>

			{/* Show Notification */}
			{isShowNotification && (
				<Notification
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			)}
		</div>
	)
}

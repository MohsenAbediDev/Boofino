import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Notification from '../Common/Components/Notification'
import BackToDashboard from '../Common/Components/BackToDashboard'

export default function EditProduct() {
	const groups = [
		{ id: 0, title: 'خوراکی', value: 'edible' },
		{ id: 1, title: 'غذای گرم', value: 'hotfood' },
		{ id: 2, title: 'غذای سرد', value: 'coldfood' },
		{ id: 3, title: 'نوشیدنی گرم', value: 'hotdrink' },
		{ id: 4, title: 'نوشیدنی سرد', value: 'colddrink' },
	]

	const [datas, setDatas] = useState()
	const [products, setProducts] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [group, setGroup] = useState('')
	const [off, setOff] = useState('')
	const [count, setCount] = useState('')
	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)

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

	const params = useParams()

	useEffect(() => {
		reset()
		getData()
	}, [params])

	// reset all changes
	const reset = () => {
		setName('')
		setPrice('')
		setGroup('')
		setOff('')
		setCount('')
		setFilePath(null)
		setSelectedPic(null)
	}

	// send picture
	const sendPictureHandler = (e) => {
		const selectedFile = e.target.files[0]
		const filePath = URL.createObjectURL(selectedFile)
		setFilePath(filePath)
		setSelectedPic(selectedFile)
	}

	// get main product data and all products
	const getData = async () => {
		try {
			const res = await fetch(`http://localhost:3000/product/${params.name}`, {
				method: 'GET',
				credentials: 'include',
			})
			const product = await res.json()

			setDatas(product)
			setOff(product.off)
		} catch (err) {
			console.log(err)
		}

		try {
			const res = await fetch('http://localhost:3000/products', {
				method: 'GET',
				credentials: 'include',
			})
			const data = await res.json()
			setProducts(data)
		} catch (err) {
			console.log(err)
		}
	}

	// send image to api
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

	return (
		<>
			<div className='dir-rtl container font-shabnam p-5'>
				<BackToDashboard title='ویرایش محصول' />
				<div className='flex gap-x-5'>
					<div className='min-w-[320px] divide-y-2 divide-dashboardItemActive h-[700px] overflow-y-auto scroll lg:hidden'>
						{products.map((product) => (
							<div key={product._id}>
								<Link to={`/edit-product/${product.name}`}>
									<div className='w-full p-5 flex items-center gap-x-4'>
										<img src={product.imgUrl} alt='' className='w-20 h-20' />
										<p className='text-white text-lg'>{product.name}</p>
									</div>
								</Link>
							</div>
						))}
					</div>
					<div className='dashboard-container h-fit py-5 flex flex-col gap-y-9 justify-center'>
						{datas && (
							<>
								{/* upload image */}
								<div className='p-5 bg-primary rounded-lg flex w-fit mx-auto'>
									<img
										src={selectedPic ? filePath : datas.imgUrl}
										alt=''
										className='w-40 h-40 rounded-lg'
									/>
									<div className='w-40 h-40 flex justify-center items-center'>
										<label
											htmlFor='image-upload'
											className='bg-primaryBTN text-white cp rounded-md p-2'
										>
											انتخاب عکس
										</label>
										<input
											type='file'
											id='image-upload'
											className='hidden'
											accept='image/*'
											onChange={(e) => sendPictureHandler(e)}
										/>
									</div>
								</div>

								<div className='w-4/5 grid grid-cols-2 gap-5 lg:grid-cols-1 mx-auto'>
									<div className='flex flex-col gap-y-4'>
										<label htmlFor='name' className='text-xl text-white'>
											تغییر نام
										</label>
										<input
											type='text'
											id='name'
											placeholder='ساندویچ همبرگر'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={name ? name : datas.name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									{/* Input */}

									{/* Add product price */}
									<div className='flex flex-col gap-y-4'>
										{/* Input title */}
										<label htmlFor='name' className='text-xl text-white'>
											تغییر قیمت (تومان)
										</label>

										{/* Input */}
										<input
											type='number'
											id='name'
											min='0'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={price ? price : datas.price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>

									{/* Add product group */}
									<div className='flex flex-col gap-y-4'>
										{/* Input title */}
										<label htmlFor='name' className='text-xl text-white'>
											تغییر دسته بندی
										</label>

										{/* Input */}
										<select
											className='h-14 cp shadow-xl px-5 text-lgxt-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={group ? group : datas.group}
											onChange={(e) => setGroup(e.target.value)}
										>
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
										<label htmlFor='name' className='text-xl text-white'>
											تغییر تخفیف
										</label>

										{/* Input */}
										<input
											type='number'
											id='name'
											min='0'
											max='100'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											placeholder='تخفیف ندارد'
											value={off > 0 ? off : ''}
											onChange={(e) => {
												setOff(e.target.value)
											}}
										/>
									</div>

									{/* Add product count */}
									<div className='flex flex-col gap-y-4'>
										{/* Input title */}
										<label htmlFor='name' className='text-xl text-white'>
											تغییر تعداد محصول
										</label>

										{/* Input */}
										<input
											type='number'
											id='name'
											min='0'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={count ? count : datas.itemCount}
											onChange={(e) => setCount(e.target.value)}
										/>
									</div>
								</div>
								<div className='flex justify-end w-4/5 gap-x-5'>
									<button
										className='h-12 w-24 bg-hoverBTN rounded-lg text-xl text-black'
										onClick={reset}
									>
										لغو
									</button>
									<button
										className='h-12 w-24 bg-primaryBTN outline-none rounded-lg text-xl text-white'
										onClick={async () => {
											const imgUrl = await uploadImage()
											console.log(imgUrl)

											if (
												imgUrl ||
												(name && name !== datas.name) ||
												(+price && +price !== +datas.price) ||
												(group && group !== datas.group) ||
												(+off && +off == 0) ||
												+off !== +datas.off ||
												(+count && +count !== +datas.itemCount)
											) {
												try {
													const res = await fetch(
														`http://localhost:3000/editproduct/${params.name}`,
														{
															method: 'PUT',
															credentials: 'include',
															headers: {
																'Content-Type': 'application/json',
															},
															body: JSON.stringify({
																imgUrl: imgUrl ? imgUrl.message : datas.imgUrl,
																isDiscount: off > 0 ? true : false,
																name: name || datas.name,
																price: price || datas.price,
																oldPrice: price || datas.price,
																finalPrice: +Math.floor(
																	(price || datas.price) -
																		((off || datas.off) *
																			(price || datas.price)) /
																			100
																),
																group: group || datas.group,
																off: off,
																itemCount: count || datas.itemCount,
															}),
														}
													)
													console.log(res)
													showNotification(res)
												} catch (err) {
													console.log(err)
												}
											}
										}}
									>
										افزودن
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Show Notification */}
			{isShowNotification && (
				<Notification
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			)}
		</>
	)
}

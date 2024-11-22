import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { deleteProduct } from '../utils/utils'
import ConfirmationModal from '../Common/Components/Modals/ConfirmationModal'
import Notification from '../Common/Components/Notification/Notification'
import BackToDashboard from '../Common/Components/BackToDashboard'

export default function EditProduct() {
	const groups = [
		{ id: 0, title: 'خوراکی', value: 'edible' },
		{ id: 1, title: 'غذای گرم', value: 'hotfood' },
		{ id: 2, title: 'غذای سرد', value: 'coldfood' },
		{ id: 3, title: 'نوشیدنی گرم', value: 'hotdrink' },
		{ id: 4, title: 'نوشیدنی سرد', value: 'colddrink' },
	]

	const navigate = useNavigate()

	const [datas, setDatas] = useState()
	const [products, setProducts] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [group, setGroup] = useState('')
	const [off, setOff] = useState('')
	const [count, setCount] = useState('')
	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)

	//? Modal Variable's
	const [isModalOpen, setModalOpen] = useState(false)

	//? Modal function's
	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const CloseModal = () => {
		setModalOpen(false)
	}

	const handleConfirm = () => {
		delProduct()
		setModalOpen(false)

		setTimeout(() => {
			navigate('/dashboard/product-list')
		}, 2000)
	}

	//? Notification Variable's
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isShowNotification, setIsShowNotification] = useState(false)

	//? Notification function
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

	// get main product data
	const getData = async () => {
		try {
			const res = await fetch(`http://localhost:3000/product/${params.name}`, {
				method: 'GET',
				credentials: 'include',
			})
			const product = await res.json()

			setDatas(product)
			setOff(product.off)
			setCount(product.itemCount)
		} catch (err) {
			console.log(err)
		}

		allProduct()
	}

	// get all products
	const allProduct = async () => {
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

	// Delete product from database
	const delProduct = () => {
		deleteProduct(datas.name)
			.then((res) => showNotification(res))
			.catch((error) => {
				console.error(error)
			})
	}

	// Update product information
	const updateProductData = async () => {
		const imgUrl = await uploadImage()

		if (
			imgUrl ||
			(name && name !== datas.name) ||
			(+price && +price !== +datas.price) ||
			(group && group !== datas.group) ||
			(+off && +off === 0) ||
			+off !== +datas.off ||
			+count === 0 ||
			+count !== +datas.itemCount
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
									((off || datas.off) * (price || datas.price)) / 100
							),
							group: group || datas.group,
							off: off,
							itemCount: count,
						}),
					}
				)
				showNotification(res)
			} catch (err) {
				console.log(err)
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
											className='bg-primaryBTN text-white cp rounded-md p-2'>
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
										<label
											htmlFor='edit-product-name'
											className='text-xl text-white'>
											تغییر نام
										</label>
										<input
											type='text'
											id='edit-product-name'
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
										<label htmlFor='edit-price' className='text-xl text-white'>
											تغییر قیمت (تومان)
										</label>

										{/* Input */}
										<input
											type='number'
											inputMode='numeric'
											id='edit-product-price'
											min='0'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={price ? price : datas.price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>

									{/* Add product group */}
									<div className='flex flex-col gap-y-4'>
										{/* Input title */}
										<label
											htmlFor='edit-product-group'
											className='text-xl text-white'>
											تغییر دسته بندی
										</label>

										{/* Input */}
										<select
											className='h-14 cp shadow-xl px-5 text-lgxt-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={group ? group : datas.group}
											onChange={(e) => setGroup(e.target.value)}>
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
										<label
											htmlFor='edit-product-discount'
											className='text-xl text-white'>
											تغییر تخفیف
										</label>

										{/* Input */}
										<input
											type='number'
											inputMode='numeric'
											id='edit-product-discount'
											min='0'
											max='100'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											placeholder='تخفیف ندارد'
											value={off > 0 ? off : ''}
											onChange={(e) => setOff(e.target.value)}
										/>
									</div>

									{/* Add product count */}
									<div className='flex flex-col gap-y-4'>
										{/* Input title */}
										<label
											htmlFor='edit-product-count'
											className='text-xl text-white'>
											تغییر تعداد محصول
										</label>

										{/* Input */}
										<input
											type='number'
											inputMode='numeric'
											id='edit-product-count'
											min='0'
											className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
											value={count ? count : datas.itemCount}
											onChange={(e) => setCount(e.target.value)}
										/>
									</div>
								</div>
								<div className='flex justify-end mx-auto w-4/5 gap-x-5'>
									<button
										className='h-12 w-24 bg-redBTN outline-none rounded-lg text-xl text-white'
										onClick={handleOpenModal}>
										حذف
									</button>

									<button
										className='h-12 w-24 bg-hoverBTN outline-none rounded-lg text-xl text-black'
										onClick={reset}>
										لغو
									</button>

									<button
										className='h-12 w-32 bg-primaryBTN outline-none rounded-lg text-xl text-white'
										onClick={updateProductData}>
										به روز رسانی
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Show Modal */}
			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={CloseModal}
				onConfirm={handleConfirm}
				title='حذف محصول'>
				<p>آیا مطمئنید که می‌خواهید محصول را حذف کنید ؟</p>
			</ConfirmationModal>

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

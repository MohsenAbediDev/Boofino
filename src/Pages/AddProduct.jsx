import { useState, useEffect } from 'react'

export default function AddProduct() {
	const groups = [
		{ id: 0, title: 'خوراکی' },
		{ id: 1, title: 'غذای گرم' },
		{ id: 2, title: 'غذای سرد' },
		{ id: 3, title: 'نوشیدنی گرم' },
		{ id: 4, title: 'نوشیدنی سرد' },
	]

	// fetch('http://localhost:3000/categories')
	// 	.then((res) => res.json())
	// 	.then((data) => console.log(data))
	// 	.catch((err) => console.log(err))

	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [group, setGroup] = useState('')
	const [off, setOff] = useState('')
	const [count, setCount] = useState('')

	// send picture
	const sendPictureHandler = (e) => {
		const selectedFile = e.target.files[0]
		const filePath = URL.createObjectURL(selectedFile)
		setFilePath(filePath)
		setSelectedPic(selectedFile)
	}

	// send group
	const senGroupHandler = () => {
    console.log({name: group});

		if (!group == '') {
			fetch('http://localhost:3000/addcategory', {
				method: 'POST',
				body: JSON.stringify({"name": group}),
			})
				.then((res) => res.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err))
		}
	}

	useEffect(() => senGroupHandler(), [group])

	// send data to api
	const uploadImage = async () => {
		if (selectedPic) {
			const formData = new FormData()
			formData.append('imgUrl', selectedPic)

			try {
				const res = await fetch('http://localhost:3000/uploadimg', {
					method: 'POST',
					body: formData,
				})
				const data = await res.json()
				return data
			} catch (err) {
				alert('مشکلی در بارگذاری عکس پیش آمده')
			}
		}
	}

	const sendToApi = async () => {
		const imgUrl = await uploadImage()

		if (imgUrl && title && price && count) {
			try {
				const res = await fetch('http://localhost:3000/addproduct', {
					method: 'POST',
					body: JSON.stringify({
						name: title,
						price: price,
						off: +off,
						group: +group,
						itemCount: +count,
						imgUrl: imgUrl.message,
						isDiscount: off ? true : false,
						oldPrice: +price,
						freeTime: { 1: 1 },
					}),
				})
				const data = await res.json()
				console.log(data)
			} catch (err) {
				console.log(err)
			}
		} else {
			alert('لطفا تمام فیلد هارو پر کنید')
		}
	}

	return (
		<div className='dashboard-container h-fit py-5 flex flex-col gap-y-9 items-center justify-center'>
			{/* Select image section */}
			<div className='bg-dashboardItem shadow-xl w-40 h-40 rounded-dashboarditem flex justify-center items-center relative overflow-hidden'>
				{/* Show image */}
				{filePath && <img src={filePath} className='w-full h-full absolute' />}

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
					<label htmlFor='name' className='text-xl text-white'>
						افزودن نام
					</label>

					{/* Input */}
					<input
						type='text'
						id='name'
						placeholder='ساندویچ همبرگر'
						className='h-14 shadow-xl px-5 text-lg rounded-dashboarditem bg-dashboardItem text-white outline-none border-none'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				{/* Add product price */}
				<div className='flex flex-col gap-y-4'>
					{/* Input title */}
					<label htmlFor='name' className='text-xl text-white'>
						افزودن قیمت (تومان)
					</label>

					{/* Input */}
					<input
						type='number'
						id='name'
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
					<label htmlFor='name' className='text-xl text-white'>
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
							<option value={group.title} key={group.id}>
								{group.title}
							</option>
						))}
					</select>
				</div>

				{/* Add product off */}
				<div className='flex flex-col gap-y-4'>
					{/* Input title */}
					<label htmlFor='name' className='text-xl text-white'>
						افزودن تخفیف (عدد)
					</label>

					{/* Input */}
					<input
						type='number'
						id='name'
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
					<label htmlFor='name' className='text-xl text-white'>
						تعداد محصول
					</label>

					{/* Input */}
					<input
						type='number'
						id='name'
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
	)
}

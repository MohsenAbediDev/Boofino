import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Order() {
	const [datas, setDatas] = useState()
	const { trackingCode } = useParams()

	console.log(datas)

	const statusMap = {
		processing: {
			text: 'درحال انجام',
			bgColor: '#8a8b896c',
		},
		compeleted: {
			text: 'اتمام',
			bgColor: '#68AC50',
		},
		canceled: {
			text: 'لغو شده',
			bgColor: '#FF4E4E',
		},
	}

	useEffect(() => getOrderDatas, [trackingCode])

	const getOrderDatas = () => {
		fetch(`http://localhost:3000/order/${trackingCode}`, {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => setDatas(res))
			.catch((error) => console.log(error))
	}

	return (
		<div className='dashboard-container h-fit flex flex-col justify-center gap-y-9 py-5'>
			{datas ? (
				<>
					{/* Products image */}
					<div
						className={`w-fit bg-primary rounded-lg p-5 mx-auto grid overflow-hidden ${
							datas.products.length === 1
								? 'grid-cols-1 grid-rows-1'
								: datas.products.length === 2
								? 'grid-cols-2 grid-rows-1'
								: 'grid-cols-2 grid-rows-2'
						}`}>
						{datas.products.slice(0, 4).map((product, index) => (
							<img
								key={index}
								className={`object-cover ${
									datas.products.length === 1
										? 'w-40 h-40 '
										: datas.products.length === 2
										? 'w-20 h-40 '
										: 'w-20 h-20 '
								} ${
									datas.products.length === 3 && index === 2 ? 'col-span-2' : ''
								}`}
								src={product.imgUrl}
								alt={product.name}
							/>
						))}
					</div>

					{/* Products name */}
					<div className='flex flex-col w-1/2 sm:w-full mx-auto gap-y-4'>
						<p className='text-xl text-white'>محصولات</p>

						<div className='w-full min-h-[56px] flex items-center flex-wrap p-2 shadow-xl text-lg rounded-xl bg-[#49494973] text-white'>
							{datas.products.map((product) => product.name).join('، ')}
						</div>
					</div>

					<div className='w-4/5 grid grid-cols-2 gap-5 mx-auto'>
						{/* Final price */}
						<div className='flex items-center flex-col gap-y-4'>
							<p className='text-xl text-white'>قیمت</p>

							<div className='flex items-center justify-center w-1/2 sm:w-full h-14 shadow-xl px-2 gap-1 text-xl sm:text-lg rounded-xl bg-[#49494973] text-white'>
								<span>
									{datas.totalPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</span>
								تومان
							</div>
						</div>

						{/* Order status */}
						<div className='flex items-center flex-col gap-y-4'>
							<p className='text-xl text-white'>وضعیت</p>

							<div
								className='flex items-center justify-center w-1/2 sm:w-full h-14 shadow-xl px-2 rounded-xl text-white'
								style={{
									backgroundColor: statusMap[datas.status]?.bgColor,
								}}>
								<span className='p-1 text-xl sm:text-lg rounded-sm'>
									{statusMap[datas.status]?.text}
								</span>
							</div>
						</div>

						{/* Order date */}
						<div className='flex items-center flex-col gap-y-4'>
							<p className='text-xl text-white'>تاریخ سفارش</p>

							<span className='flex items-center justify-center w-1/2 sm:w-full h-14 shadow-xl px-2 text-xl sm:text-lg rounded-xl bg-[#49494973] text-white'>
								{datas.createdAt.split('T')[0].replace(/-/g, '/')}
							</span>
						</div>

						{/* Order tracking code */}
						<div className='flex items-center flex-col gap-y-4'>
							<p className='text-xl text-white'>کد سفارش</p>

							<span className='flex items-center justify-center w-1/2 sm:w-full h-14 shadow-xl px-2 text-xl sm:text-lg rounded-xl bg-[#49494973] text-white'>
								{trackingCode}
							</span>
						</div>
					</div>

					{/* Action buttons */}
					<div className='flex justify-end mx-auto w-4/5 gap-x-5'>
						<button className='h-12 w-24 bg-hoverBTN outline-none rounded-lg text-xl text-black'>
							برگشت
						</button>

						<button className='h-12 w-24 bg-[#FF4E4E] outline-none rounded-lg text-xl text-white'>
							لغو
						</button>

						<button className='h-12 w-28 bg-[#68AC50] outline-none rounded-lg text-xl text-white'>
							تحویل
						</button>
					</div>
				</>
			) : (
				<div className='h-full flex items-center justify-center flex-col'>
					<p className='font-bold text-2xl text-white'>شما هنوز سفارشی ثبت نکردید</p>

					<Link to='/' className='bg-primaryBTN p-4 mt-10 rounded-md text-2xl'>
						بازگشت به خانه
					</Link>
				</div>
			)}
		</div>
	)
}

import { useEffect, useState } from 'react'
import BackToDashboard from '../Common/Components/BackToDashboard'
import { Link } from 'react-router-dom'

export default function MyOrders() {
	const [orders, setOrders] = useState([])

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

	const getOrders = () => {
		fetch('http://localhost:3000/userorders', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => setOrders(data))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getOrders()
	}, [])

	return (
		<div className='w-full h-full flex flex-col relative text-xl text-white'>
			{orders.length > 0 ? (
				<>
					{/* Order information */}
					<div className='w-full flex sm:hidden items-center justify-between gap-10 border-b-2 pb-4 pl-8'>
						<div>
							<BackToDashboard title='سفارش‌های من' />
						</div>

						<div className='flex gap-10'>
							<span>تاریخ ثبت</span>

							<span>وضعیت</span>

							<span>کد سفارش</span>

							<span>قیمت</span>
						</div>
					</div>

					{/* Order cards */}
					<div className='w-full h-full flex flex-col items-center justify-start gap-y-5 overflow-y-auto scroll mt-8 sm:mt-0'>
						{orders
							.slice()
							.reverse()
							.map((order) => (
								<>
									{/* Desktop/Tablet card */}
									<Link
										to={`/order/${order.trackingCode}`}
										key={order._id}
										className='flex sm:hidden bg-secondary w-full min-h-[96px] items-center justify-between rounded-md'>
										{/* Image and products name */}
										<div className='flex items-center justify-center gap-x-2 mr-3'>
											{/* Set images */}
											<div
												className={`grid overflow-hidden w-16 h-16 sm:w-14 sm:h-14 rounded-md ${
													order.products.length === 1
														? 'grid-cols-1 grid-rows-1'
														: order.products.length === 2
														? 'grid-cols-2 grid-rows-1'
														: 'grid-cols-2 grid-rows-2'
												}`}>
												{order.products.slice(0, 4).map((product, index) => (
													<img
														key={index}
														className={`object-cover w-full h-full ${
															order.products.length === 3 && index === 2
																? 'col-span-2'
																: ''
														}`}
														src={product.imgUrl}
													/>
												))}
											</div>

											<p className='truncate sm:w-[150px] sm:text-lg'>
												{order.products
													.map((product) => product.name)
													.join('، ')}
											</p>
										</div>

										{/* Order information */}
										<div className='flex items-center gap-10 ml-2'>
											{/* Date of registration */}
											<span>{order.createdAt.match(/T(\d{2}:\d{2})/)[1]}</span>
											{/* Processing */}
											<span
												style={{
													backgroundColor: statusMap[order.status]?.bgColor,
												}}
												className='p-1 text-[16px] rounded-sm'>
												{statusMap[order.status]?.text}
											</span>

											{/* Tracking code */}
											<span>{order.trackingCode}</span>

											{/* Price */}
											<div className='flex items-center gap-1'>
												<span>
													{order.totalPrice
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												</span>
												تومان
											</div>
										</div>
									</Link>

									{/* Mobile card */}
									<Link
										className='hidden sm:flex bg-secondary w-full h-32 rounded-md'
										to={`/order/${order.trackingCode}`}
										key={order._id}>
										{/* Set image */}
										<div className='flex items-center'>
											<div
												className={`grid overflow-hidden w-16 h-24 rounded-md mr-2 ${
													order.products.length === 1
														? 'grid-cols-1 grid-rows-1'
														: order.products.length === 2
														? 'grid-cols-2 grid-rows-1'
														: 'grid-cols-2 grid-rows-2'
												}`}>
												{order.products.slice(0, 4).map((product, index) => (
													<img
														key={index}
														className={`object-cover w-full h-full ${
															order.products.length === 3 && index === 2
																? 'col-span-2'
																: ''
														}`}
														src={product.imgUrl}
														alt={product.name}
													/>
												))}
											</div>
										</div>

										{/* Informations */}
										<div className='w-full flex flex-col mt-4 mx-2 gap-y-3'>
											{/* Name & Proccesing */}
											<div className='flex justify-between'>
												{/* Name */}
												<p className='truncate sm:w-[150px] sm:text-lg'>
													{order.products
														.map((product) => product.name)
														.join('، ')}
												</p>

												{/* Proccess status */}
												<span
													style={{
														backgroundColor: statusMap[order.status]?.bgColor,
													}}
													className='p-1 text-sm rounded-sm'>
													{statusMap[order.status]?.text}
												</span>
											</div>

											{/* Price & Tracking Code */}
											<div className='flex justify-between'>
												{/* Price */}
												<div className='flex items-center text-lg text-[#D0D0D0] gap-1'>
													<span>
														{order.totalPrice
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													</span>
													تومان
												</div>

												{/* Tracking code */}
												<span>{order.trackingCode}</span>
											</div>

											{/* Date & Time registration */}
											<div className='flex justify-end'>
												<span className='text-xs bg-[#75492b57] rounded-sm p-1'>
													{order.createdAt.match(/T(\d{2}:\d{2})/)[1]}
												</span>
											</div>
										</div>
									</Link>
								</>
							))}
					</div>
				</>
			) : (
				<div className='h-full flex items-center justify-center flex-col'>
					<p className='font-bold text-2xl'>شما هنوز سفارشی ثبت نکردید</p>

					<Link to='/' className='bg-primaryBTN p-4 mt-10 rounded-md text-2xl'>
						بازگشت به خانه
					</Link>
				</div>
			)}
		</div>
	)
}

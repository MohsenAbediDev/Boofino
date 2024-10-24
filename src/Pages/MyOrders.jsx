import { useEffect, useState } from 'react'
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
			{orders ? (
				<>
					{/* Order information */}
					<div className='w-full flex items-center justify-end gap-10 border-b-2 pb-4 pl-8'>
						<span>تاریخ ثبت</span>

						<span>وضعیت</span>

						<span>کد سفارش</span>

						<span>قیمت</span>
					</div>

					{/* Order carts */}
					<div className='w-full h-full flex flex-col items-center justify-start gap-y-5 overflow-y-auto scroll mt-8'>
						{orders
							.slice()
							.reverse()
							.map((order) => (
								<Link
									to={`./${order.trackingCode}`}
									key={order._id}
									className='bg-secondary w-full h-24 flex items-center justify-between rounded-md'>
									{/* Image and products name */}
									<div className='flex items-center justify-center gap-x-2 mr-5'>
										<img className='w-16 h-16' src='' />
										<p>
											{order.products.map((product) => product.name).join('، ')}
										</p>
									</div>
									{console.log(order)}

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
							))}
					</div>
				</>
			) : (
				''
			)}
		</div>
	)
}

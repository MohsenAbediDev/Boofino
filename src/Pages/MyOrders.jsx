export default function MyOrders() {
	const statusStyle = {
		processing: '#8a8b896c',
		compeleted: '#68AC50',
		canceled: '#FF4E4E',
	}

	return (
		<div className='w-full h-full flex flex-col relative text-xl text-white'>
			{/* Order information */}
			<div className='w-full flex items-center justify-end gap-10 border-b-2 pb-4 pl-6'>
				<span>تاریخ ثبت</span>

				<span>وضعیت</span>

				<span>کد سفارش</span>

				<span>قیمت</span>
			</div>

			{/* Order carts */}
			<div className='w-full h-full flex flex-col items-center justify-start gap-y-5 overflow-y-auto scroll mt-8'>
				<div className='bg-secondary w-full h-24 flex items-center justify-between rounded-md'>
					{/* Image and products name */}
					<div className='flex items-center justify-center gap-x-2 mr-5'>
						<img className='w-16 h-16' src='' />
						<p>اسم محصولات</p>
					</div>

					{/* Order information */}
					<div className='flex items-center gap-10 ml-2'>
						{/* Date of registration */}
						<span>8:35</span>

						{/* Processing */}
						<span
							className={`bg-[${statusStyle.processing}] p-1 text-[16px] rounded-sm`}>
							درحال انجام
						</span>

						{/* Tracking code */}
						<span>1809</span>

						{/* Price */}
						<div className='flex items-center gap-1'>
							<span>20,000</span>
							تومان
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

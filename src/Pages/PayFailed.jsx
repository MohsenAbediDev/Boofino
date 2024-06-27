import { Link } from 'react-router-dom'

export default function PayFailed() {
	const orderCode = 4343
	return (
		<div className='dashboard-container h-fit flex flex-col items-center justify-center py-5 px-5 mt-5'>
			<div className='w-80 sm:w-full h-[450px] font-shabnam flex flex-col justify-center items-center bg-white rounded-xl dir-rtl'>
				{/* Transaction Payment Text */}
				<div className='flex flex-col items-center justify-center'>
					<span className='text-[#ED2D2D] text-2xl font-bold'>
						پرداخت ناموفق
					</span>
					<p className='text-[#696969] mt-1'>برای ثبت سفارش مجددا اقدام کنید</p>
				</div>

				{/* Show QrCode */}
				<div className='w-60 h-60 mt-2'>
					<img src='images/example-qrcode.png' className='w-full rounded-md' />
				</div>

				{/* Show Info Btn */}
				<Link to='/'>
					<button className='w-32 bg-[#257FD2] text-white text-base py-4 mt-5 rounded-md'>
						پرداخت
					</button>
				</Link>
			</div>

			{/* Show Info Btn */}
			<Link to='/'>
				<button className='w-40 bg-primaryBTN text-white text-xl py-4 mt-8 rounded-md'>
					بازگشت به خانه
				</button>
			</Link>
		</div>
	)
}

import { Link } from 'react-router-dom'

export default function SuccessPay() {
	const orderCode = 4343
	return (
		<div className='dashboard-container h-fit flex flex-col items-center justify-center py-5 px-5 mt-5'>
			<div className='w-80 sm:w-full h-[514px] font-shabnam flex flex-col justify-center items-center bg-white py-5 rounded-xl dir-rtl'>
				{/* Transaction Payment Text */}
				<div className='flex flex-col items-center justify-center'>
					<span className='text-[#4DBD25] text-2xl font-bold'>پرداخت موفق</span>
					<p className='text-[#696969] mt-1'>سفارش شما با موفقیت ثبت شد</p>
				</div>

				{/* Show QrCode */}
				<div className='w-60 h-60 mt-2'>
					<img src='images/example-qrcode.png' className='w-full rounded-md' />
				</div>

				{/* Order Info */}
				<div className='flex items-center justify-between w-60 h-60'>
					<div className='flex items-center'>
						<img src='images/french-fries.png' className='w-7 h-7' />
						<span className='text-[22px] mr-1'>کد سفارش</span>
					</div>

					<span className='font-bold text-2xl'>{orderCode}</span>
				</div>

				{/* Show Info Btn */}
				<Link to='/'>
					<button className='w-32 bg-[#68AC50] text-white text-base py-4 rounded-md'>
						جزئیات
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

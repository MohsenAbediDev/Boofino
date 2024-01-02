export default function FoodCard() {
	return (
		<>
			<div
				className='bg-white h-72 min-w-[180px] rounded-md p-3 relative mx-3
			md:min-w-[175px] md:h-[270px] select-none' 
			>
				<div className='w-full h-full relative  cp'>
					<div className='h-[150px] w-full mx-auto bg-cover bg-[url(./images/3.jpg)] rounded-md'></div>
					<h1
						className='text-black mt-1 text-2xl font-extrabold font-shabnam
					md:text-xl md:mt-0.5'
					>
						ساندویچ سرد
					</h1>
					<h3
						className='text-price mt-2 text-[16px] font-extrabold font-shabnam
					md:mt-1'
					>
						۱۹,۰۰۰ تومان
					</h3>
					<button
						className='bg-primaryBTN hover:bg-hoverBTN transition-colors w-full h-8 font-shabnam text-white rounded-md absolute bottom-0
					md:h-8'
					>
						افزودن به سبد خرید
					</button>
				</div>
			</div>
		</>
	)
}

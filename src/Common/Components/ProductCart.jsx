import { FaMinus } from 'react-icons/fa'

export default function ProductCart() {
	return (
		<>
			<div
				className='bg-secondary h-[170px] w-full rounded-2xl my-5
        md:my-0 md:rounded-none md:bg-primary md:h-[190px]'
			>
				<div
					className='w-full h-full p-5 flex justify-between
            md:py-3'
				>
          {/* Food Image */}
          <img
						src='../public/images/1.jpg'
						alt=''
						className='w-32 h-32
                md:w-28 md:h-28 md:mt-2 rounded-lg'
					/>

					<div
						className='h-full w-full mx-[54px] flex flex-col justify-between
                md:mx-4'
					>
            {/* Food Name */}
						<p
							className='text-white text-xl font-bold
                    md:text-xl'
						>
							ساندویج کالباس
						</p>

            {/* Food Category */}
						<p
							className='text-white text-xl md:mt-2 md:text-lg'>
							غذای سرد
						</p>

            {/* Food Count */}
						<div className='flex gap-3 md:mt-2'>
							<div>
								<div className='cart-button flex items-center justify-between text-xl border-white text-white'>
									<button className='mx-4 cursor-pointer md:mx-2.5'>+</button>
									
                  <span>3</span>
									
                  <button className='mx-4 cursor-pointer md:mx-2.5'>
										<FaMinus className='text-sm' />
									</button>
								</div>
							</div>
							<button
								className='cart-button w-28 text-red border-red
                        hover:bg-red text-xl hover:text-white transition-all duration-200
                        md:w-20'
							>
								حذف
							</button>
						</div>

            {/* Mobile Responsive Price */}
						<div className='hidden md:block my-2'>
							<span className='text-white text-xl'>200,000</span>
							<span className='text-white text-lg ms-1'>تومان</span>
						</div>
					</div>

          {/* Desktop Responsive Price */}
					<div className='md:hidden'>
						<span className='text-white text-2xl'>200,000</span>
						<span className='text-white text-2xl ms-1'>تومان</span>
					</div>
				</div>
			</div>
		</>
	)
}

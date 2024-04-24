export default function InfoUser() {
	return (
		<div className='w-full h-1/2 lg:h-full px-2 py-5 flex flex-col rounded-2xl text-xl text-white bg-secondary'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<img
						src='images/blankUserProfile.png'
						className='w-[45px] h-[45px] rounded-full'
					/>
					<p className='mr-2'>مشخصات کاربر</p>
				</div>

				<a href='dashboard/editprofile' className='text-lg bg-primaryBTN p-2 rounded-lg'>
					ویرایش اطلاعات
				</a>
			</div>

			<div className='border mt-5 rounded-lg flex lg:flex-col p-2'>
				<div className='border-l lg:border-l-0 lg:border-b border-white p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>
						نام و نام خانوادگی
					</p>

					<span className='text-lg text-white mt-1'>یوسف حاجی پور</span>
				</div>

				<div className='border-l lg:border-l-0 lg:border-b border-white p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>شماره همراه</p>

					<span className='text-lg text-white mt-1'>09215647908</span>
				</div>

				<div className='p-2 mb-5'>
					<p className='text-lg sm:text-sm text-[#c7c6c6]'>پست الکترونیکی</p>

					<span className='text-lg text-white mt-1'>
						yousefHaji@hotmail.com
					</span>
				</div>
			</div>
		</div>
	)
}

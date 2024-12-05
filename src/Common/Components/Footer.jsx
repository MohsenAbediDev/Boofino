import {
	FaInstagram,
	FaTelegram,
	FaTwitter,
	FaYoutube,
	FaPhone,
	FaMailBulk
} from 'react-icons/fa'

import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer>
			<div className='min-h-80 w-full bg-footer flex lg:flex-col dir-rtl p-11 lg:p-6 mt-6'>
				{/* Boofino Brand */}
				<div className='h-full w-1/3 p-9 lg:p-0'>
					<div className='w-full h-full flex flex-col'>
						<h1 className='text-white text-5xl'>بوفینو</h1>

						{/* Social Icons */}
						<div className='flex w-44 justify-between mt-6'>
							<a target='_blank' href='#'>
								<FaInstagram className='text-white text-3xl' />
							</a>
							<a target='_blank' href='#'>
								<FaTelegram className='text-white text-3xl' />
							</a>
							<a target='_blank' href=''>
								<FaTwitter className='text-white text-3xl' />
							</a>
							<a target='_blank' href=''>
								<FaYoutube className='text-white text-3xl' />
							</a>
						</div>
					</div>
				</div>

				{/* Contact Us */}
				<div className='h-full w-1/3 lg:w-full lg:mt-11'>
					<h1 className='text-white text-3xl'>تماس با ما</h1>
					<div className='w-[90%] lg:w-full flex flex-col gap-y-2 lg:mt-3'>
						{/* Phone */}
						<div className='text-xl lg:w-full text-white flex items-center gap-x-2 p-2 lg:px-0'>
							<FaPhone />
							<a href='tel:09215647908'>09909090909</a>
						</div>

						{/* Email */}
						<div className='text-xl lg:w-full text-white flex items-center gap-x-2 p-2 lg:px-0'>
							<FaMailBulk />
							<a href='mailto:admin@boofino.co'>admin@boofino.co</a>
						</div>

						{/* Address */}
						<div className='text-xl lg:w-full text-white flex gap-x-2 p-2 lg:px-0'>
						<FaLocationDot />
							<span>
								آدرس بوفه: محل آدرس شما
							</span>
						</div>
					</div>
				</div>

				{/* Map */}
				<div className='bg-primaryBTN h-full w-1/3 lg:w-full lg:mt-11'></div>
			</div>
		</footer>
	)
}

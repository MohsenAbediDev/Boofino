import { BiSolidStarHalf } from 'react-icons/bi'
import { RxBorderSolid } from 'react-icons/rx'

export default function MenuTitles(props) {
	return (
		<div className='font-bold text-xl text-white flex items-center'>
			<div className='flex items-center'>
				{/* Star Icon */}
				<BiSolidStarHalf className='w-6 text-[#FF8F00]' />
				{/* Line Icon */}
				<RxBorderSolid className='w-5' />
			</div>

			<span className='text-xl ps-[15px] pe-[15px] font-shabnam'>
        {props.title}
			</span>

			<div className='flex items-center'>
				{/* Line Icon */}
				<RxBorderSolid className='w-5' />
				{/* Star Icon */}
				<BiSolidStarHalf className='w-6 text-[#FF8F00]' />
			</div>
		</div>
	)
}

import { MdArrowForwardIos } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

export default function BackToDashboard(props) {
	return (
		<div className='flex items-center text-white text-2xl md:text-xl py-2 w-full'>
			<NavLink to='/dashboard'>
				<MdArrowForwardIos className='text-xl cp ml-2' />
			</NavLink>

			{props.title}
		</div>
	)
}

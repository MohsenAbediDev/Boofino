import { MdArrowForwardIos } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

export default function BackToDashboard(props) {
	return (
		<div className='flex items-center text-white text-3xl md:text-xl md:px-5 md:my-2 w-full'>
			<NavLink to='/dashboard'>
				<MdArrowForwardIos className='text-xl cp ml-2' />
			</NavLink>

			{props.title}
		</div>
	)
}

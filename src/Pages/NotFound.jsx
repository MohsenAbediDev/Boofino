import Navbar from '../Common/Components/Navbar'
import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<>
      <Navbar />

			<div className='mt-32 flex flex-col text-center justify-center items-center font-shabnam text-white'>
				<p className='text-9xl'>404</p>

				<p className='text-2xl mt-2'>): صفحه مورد نیاز پیدا نشد</p>

				<Link to='/'>
					<button className='mt-8 bg-[#F57F17] p-3 rounded-lg text-lg '>بازگشت به صفحه اصلی</button>
				</Link>
			</div>
		</>
	)
}

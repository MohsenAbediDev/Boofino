import { useRef, useEffect } from 'react'
import { MdErrorOutline, MdOutlineCheck } from 'react-icons/md'

const Notification = ({ errorMessage, successMessage }) => {
	const notificationBoxRef = useRef()

	useEffect(() => {
		if (notificationBoxRef.current) {
			showNotification()
		}
	}, [errorMessage, successMessage])

	// Show notification function
	const showNotification = () => {
		const notification = notificationBoxRef.current

		// Show Notification
		notification.classList.add('notification--show')

		// Hide Notification
		setTimeout(() => {
			notification.classList.remove('notification--show')
		}, 3000)
	}

	return (
		<div className='notification' ref={notificationBoxRef}>
			{errorMessage && <MdErrorOutline className='notification--error' />}
			{successMessage && <MdOutlineCheck className='notification--success' />}

			<div className='w-full h-full flex flex-col'>
				<span className='font-bold text-xl'>
					{errorMessage && 'خطا'}
					{successMessage && 'موفق'}
				</span>
				<p className='font-light text-sm'>
					{errorMessage && <span>{errorMessage}</span>}
					{successMessage && <span>{successMessage}</span>}
				</p>
			</div>
		</div>
	)
}

export default Notification

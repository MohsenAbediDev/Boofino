import { useRef, useState, useEffect } from 'react'
import { isLoggedIn } from '../utils/utils'
import { CiUser, CiLock } from 'react-icons/ci'
import { MdErrorOutline, MdOutlineCheck } from 'react-icons/md'

export default function Signin() {
	const [usernameInputValue, setUsernameInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const notificationBoxRef = useRef()

	isLoggedIn()

	// User login
	const login = () => {
		// Set user data
		const userData = {
			username: usernameInputValue,
			password: passwordInputValue,
		}

		// Post user data
		fetch('http://localhost:3000/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		}).then((res) => showNotification(res))
	}

	// Show notification function
	const showNotification = (response) => {
		const notification = notificationBoxRef.current

		const handleResponse = (data) => {
			if (response.ok) {
				setErrorMessage('')
				setSuccessMessage(data.message)

				// isLoggedIn()
			} else {
				setSuccessMessage('')
				setErrorMessage(data.message)
			}

			// Show Notification
			notification.classList.add('notification--show')

			// Hide Notification
			setTimeout(() => {
				notification.classList.remove('notification--show')
			}, 3000)
		}

		const handleFailure = (error) => {
			console.error('Error parsing JSON:', error)
		}

		response.json().then(handleResponse).catch(handleFailure)
	}

	return (
		<>
			<div className='container h-full flex items-center flex-col text-white text-xl font-shabnam'>
				{/* Boofino Logo */}
				<span className='mt-5 font-bold text-4xl'>بوفینو</span>

				{/* Signup Form */}
				<div className='mt-5 gap-y-1 flex items-center flex-col w-96 h-[18rem] rounded-lg bg-secondary'>
					<p className='mt-5 text-2xl font-bold'>ورود</p>

					<div className='w-full flex items-center flex-col space-y-2.5 lg:space-y-3.5'>
						{/* Username Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiUser className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setUsernameInputValue(e.target.value)}
								type='text'
								placeholder='نام کاربری'
							/>
						</div>

						{/* Password Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiLock className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setPasswordInputValue(e.target.value)}
								type='password'
								placeholder='رمز عبور'
							/>
						</div>

						{/* Login Button */}
						<button
							onClick={login}
							className='form-input w-[70%] p-0 text-xl bg-primaryBTN'
						>
							ورود
						</button>
					</div>
				</div>
			</div>

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
		</>
	)
}

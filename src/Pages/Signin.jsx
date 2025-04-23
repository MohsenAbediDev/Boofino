import { useState } from 'react'
import { isLoggedIn, host } from '../utils/utils'
import Notification from '../Common/Components/Notification/Notification'
import { Link } from 'react-router-dom'
import { CiUser, CiLock } from 'react-icons/ci'

export default function Signin() {
	const [loading, setLoading] = useState(false)

	const [usernameInputValue, setUsernameInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [isShowNotification, setIsShowNotification] = useState(false)

	// When user is logged in redirected to home page
	isLoggedIn()

	// User login
	const login = () => {
		// Set user data
		const userData = {
			username: usernameInputValue.toLowerCase(),
			password: passwordInputValue,
		}

		setLoading(true)

		// Post user data
		fetch(`${host}/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => showNotification(res))
			.finally(() => setLoading(false))
	}

	// Show notification function
	const showNotification = (response) => {
		const handleResponse = (data) => {
			if (response.ok) {
				setErrorMessage('')
				setSuccessMessage(data.message)
				setIsShowNotification(true)
			} else {
				setSuccessMessage('')
				setErrorMessage(data.message)
				setIsShowNotification(true)
			}
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
				<div className='mt-5 gap-y-1 flex items-center flex-col w-96 h-[19rem] rounded-lg bg-secondary'>
					<p className='mt-5 text-2xl font-bold'>ورود</p>

					<div className='text-lg text-gray-500 text-[#a3a9b3]'>
						ثبت نام نکردی؟
						<Link to='/signup' className='mr-1.5 text-red'>
							ثبت نام کن
						</Link>
					</div>

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
								onKeyDown={(e) => e.code == 'Enter' && login()}
								type='password'
								placeholder='رمز عبور'
							/>
						</div>

						{/* Login Button */}
						{!loading && (
							<button
								onClick={login}
								className='form-input w-[70%] p-0 text-xl bg-primaryBTN'>
								ورود
							</button>
						)}

						{loading && (
							<button
								type='button'
								className='form-input flex items-center justify-center w-[70%] p-0 text-lg bg-[#714eff77] cursor-not-allowed'
								disabled>
								<span>درحال برسی </span>

								{/* Loading Animation */}
								<svg
									className='mr-3 w-5 h-5 animate-spin text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
							</button>
						)}
					</div>
				</div>
			</div>

			{isShowNotification && (
				<Notification
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			)}
		</>
	)
}

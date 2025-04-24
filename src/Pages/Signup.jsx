import { useEffect, useState } from 'react'
import { CiUser, CiPhone, CiLock } from 'react-icons/ci'
import Notification from '../Common/Components/Notification/Notification'
import { Link } from 'react-router-dom'
import { host } from '../utils/utils'

export default function Signup() {
	const [isLoading, setIsLoading] = useState(false)

	const [nameInputValue, setNameInputValue] = useState('')
	const [usernameInputValue, setUsernameInputValue] = useState('')
	const [phoneInputValue, setPhoneInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [confirmpasswordInputValue, setConfirmPasswordInputValue] = useState('')

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [isShowNotification, setIsShowNotification] = useState(false)

	const [isSuccess, setIsSuccess] = useState(false)
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/school'
			console.log(isSuccess)
		}
	}, [isSuccess])

	// Register user
	const register = () => {
		// Set user data
		const userData = {
			fullname: nameInputValue,
			username: usernameInputValue.toLowerCase(),
			password: passwordInputValue,
			confirmpassword: confirmpasswordInputValue,
			phonenumber: phoneInputValue,
		}

		setIsLoading(true)

		// Post user data
		fetch(`${host}/register`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => {
				setIsSuccess(res.ok)
				showNotification(res)
			})
			.finally(() => setIsLoading(false))
	}

	// Show notification Function
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
				<div className='mt-5 gap-y-1 flex items-center flex-col w-96 sm:w-[22rem] h-[27rem] rounded-lg bg-secondary'>
					<p className='mt-5 text-2xl font-bold'>عضویت</p>

					<div className='text-lg text-gray-500 text-[#a3a9b3]'>
						قبلا ثبت نام کردی؟
						<Link to='/login' className='mr-1.5 text-red'>
							وارد شوید
						</Link>
					</div>

					<div className='w-full flex items-center flex-col space-y-2.5 lg:space-y-3.5'>
						{/* Name Input */}
						<div className='relative mt-2 w-[70%] sm:w-11/12 dir-rtl'>
							<CiUser className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setNameInputValue(e.target.value)}
								type='text'
								placeholder='نام و نام خانوادگی'
							/>
						</div>

						{/* Username Input */}
						<div className='relative mt-5 w-[70%] sm:w-11/12 dir-rtl'>
							<CiUser className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setUsernameInputValue(e.target.value)}
								type='text'
								placeholder='نام کاربری'
							/>
						</div>

						{/* Phone Input */}
						<div className='relative mt-5 w-[70%] sm:w-11/12 dir-rtl'>
							<CiPhone className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setPhoneInputValue(e.target.value)}
								type='tel'
								pattern='[0-9]*'
								inputMode='numeric'
								placeholder='شماره همراه'
							/>
						</div>

						{/* Password Input */}
						<div className='relative mt-5 w-[70%] sm:w-11/12 dir-rtl'>
							<CiLock className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setPasswordInputValue(e.target.value)}
								type='password'
								placeholder='رمز عبور'
							/>
						</div>

						{/* Confirm Password Input */}
						<div className='relative mt-5 w-[70%] sm:w-11/12 dir-rtl'>
							<CiLock className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setConfirmPasswordInputValue(e.target.value)}
								onKeyDown={(e) => e.code == 'Enter' && register()}
								type='password'
								placeholder='تایید رمز عبور'
							/>
						</div>

						{/* Submit Form's */}
						{!isLoading && (
							<button
								onClick={register}
								className='form-input w-[70%] sm:w-11/12 p-0 text-xl bg-primaryBTN'>
								ادامه
							</button>
						)}

						{isLoading && (
							<button
								type='button'
								className='form-input flex items-center justify-center w-[70%] sm:w-11/12 p-0 text-lg bg-[#714eff77] cursor-not-allowed'
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

				<p className='mt-2 text-sm leading-7 w-96 sm:w-[22rem] dir-rtl text-center'>
					با عضویت در سایت، تمامی
					<a href='#' className='text-red'>
						{' '}
						قوانین و شرایط{' '}
					</a>
					استفاده از خدمات بوفینو را پذیرفته اید.
				</p>
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

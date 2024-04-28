import { useRef, useState } from 'react'
import { generateSecretKey, encryptText } from '../utils/utils'
import { CiUser, CiPhone, CiLock } from 'react-icons/ci'
import { MdErrorOutline, MdOutlineCheck } from 'react-icons/md'

export default function Signup() {
	const [nameInputValue, setNameInputValue] = useState('')
	const [usernameInputValue, setUsernameInputValue] = useState('')
	const [phoneInputValue, setPhoneInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [confirmpasswordInputValue, setConfirmPasswordInputValue] = useState('')

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const notificationBoxRef = useRef()

	const secretKey = generateSecretKey()

	// Register user
	const register = () => {
		// Set user data
		const userData = {
			username: usernameInputValue.toLowerCase(),
			password: passwordInputValue,
			confirmpassword: confirmpasswordInputValue,
			phonenumber: phoneInputValue,
		}

		// Post user data
		fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => res.json())
			.then((data) => validateInputValues(data))
			.catch((error) => validateInputValues(error))
	}

	// Set cookie for remember user
	const setLoginCookie = (username, expirationDays) => {
		// Set expire month
		const expireDate = new Date()
		expireDate.setTime(
			expireDate.getTime() + expirationDays * 24 * 60 * 60 * 1000
		)

		const expires = 'expires=' + expireDate.toUTCString()

		// Encrypt cookie value
		const encrypted = encryptText(username, secretKey)

		document.cookie = 'userLogin=' + encrypted + ';' + expires + ';path=/'
	}

	// Validate Inputs Function
	const validateInputValues = (response) => {
		const notification = notificationBoxRef.current

		// Set message's
		if (response.type == 'success') {
			setErrorMessage('')
			setSuccessMessage(response.message)

			setLoginCookie(usernameInputValue, 1903625812833)
		}
		if (response.type == 'error') {
			setSuccessMessage('')
			setErrorMessage(response.message)
		}

		// Show Notification
		notification.classList.add('notification--show')

		// Hide Notification
		setTimeout(() => {
			notification.classList.remove('notification--show')
		}, 3000)
	}

	return (
		<>
			<div className='container h-full flex items-center flex-col text-white text-xl font-shabnam'>
				{/* Boofino Logo */}
				<span className='mt-5 font-bold text-4xl'>بوفینو</span>

				{/* Signup Form */}
				<div className='mt-5 gap-y-1 flex items-center flex-col w-96 h-[26rem] rounded-lg bg-secondary'>
					<p className='mt-5 text-2xl font-bold'>عضویت</p>

					<div className='text-lg text-gray-500 text-[#a3a9b3]'>
						قبلا ثبت نام کردی؟
						<a href='/login' className='mr-1.5 text-red'>
							وارد شو
						</a>
					</div>

					<div className='w-full flex items-center flex-col space-y-2.5 lg:space-y-3.5'>
						{/* Name Input */}
						<div className='relative mt-2 w-[70%] dir-rtl'>
							<CiUser className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setNameInputValue(e.target.value)}
								type='text'
								placeholder='نام و نام خانوادگی'
							/>
						</div>

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

						{/* Phone Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiPhone className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setPhoneInputValue(e.target.value)}
								type='text'
								placeholder='شماره همراه'
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

						{/* Confirm Password Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiLock className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setConfirmPasswordInputValue(e.target.value)}
								type='password'
								placeholder='تایید رمز عبور'
							/>
						</div>

						{/* Submit Form's */}
						<button
							onClick={register}
							className='form-input w-[70%] p-0 text-xl bg-primaryBTN'
						>
							ادامه
						</button>
					</div>
				</div>

				<p className='mt-2 text-sm w-96 dir-rtl text-center'>
					با عضویت در سایت، تمامی
					<a href='#' className='text-red'>
						{' '}
						قوانین و شرایط{' '}
					</a>
					استفاده از خدمات بوفینو را پذیرفته اید.
				</p>
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

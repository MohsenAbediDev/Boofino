import { useEffect, useRef, useState } from 'react'
import { CiUser, CiPhone, CiMail, CiLock } from 'react-icons/ci'
import { MdErrorOutline, MdOutlineCheck } from 'react-icons/md'

export default function Signup() {
	const [usernameInputValue, setUsernameInputValue] = useState('')
	const [phoneInputValue, setPhoneInputValue] = useState('')
	const [emailInputValue, setEmailInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const notificationBoxRef = useRef()
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [validationStatus, setValidationStatus] = useState({
		isValidUsername: false,
		isValidPhone: false,
		isValidEmail: false,
		isValidPassword: false,
	})

	//? RegExp Patterns
	const PhoneNumberPattern = /^09\d{9}$/
	const EmailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,}$/

	//? Validate Inputs Function
	const validateInputValues = () => {
		const notification = notificationBoxRef.current

		const { isValidUsername, isValidPhone, isValidEmail, isValidPassword } =
			validationStatus

		//? Update Validation
		setValidationStatus((prevStatus) => ({
			...prevStatus,
			isValidUsername: !!usernameInputValue,
			isValidPhone: PhoneNumberPattern.test(phoneInputValue),
			isValidEmail: EmailPattern.test(emailInputValue),
			isValidPassword: passwordInputValue.length >= 8,
		}))

		//? Set Error Message
		setErrorMessage(
			'لطفا ' +
				(!isValidUsername ? `نام` : '') +
				(!isValidPhone ? `${!isValidUsername ? '، ' : ''}شماره همراه` : '') +
				(!isValidEmail
					? `${!isValidUsername || !isValidPhone ? '، ' : ''}ایمیل`
					: '') +
				(!isValidPassword
					? `${
							!isValidUsername || !isValidPhone || !isValidEmail ? ' و ' : ''
					  }رمز عبور`
					: '') +
				(!isValidUsername || !isValidPhone || !isValidEmail || !isValidPassword
					? ' را به درستی وارد کنید'
					: '')
		)

		//? Set Success Message
		setSuccessMessage(
			isValidUsername && isValidPhone && isValidEmail && isValidPassword
				? 'ثبت نام با موفقیت انجام شد'
				: ''
		)

		//? Show Notification
		notification.classList.add('notification--show')

		//? Hide Notification
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
				<div className='mt-5 gap-y-1 flex items-center flex-col w-96 h-[25rem] rounded-lg bg-secondary'>
					<p className='mt-5 text-2xl font-bold'>عضویت</p>

					<div className='text-lg text-gray-500 text-[#a3a9b3]'>
						قبلا ثبت نام کردی؟
						<a href='/login' className='mr-1.5 text-red'>
							وارد شو
						</a>
					</div>

					<div className='w-full flex items-center flex-col space-y-2.5 lg:space-y-3.5'>
						{/* User Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiUser className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setUsernameInputValue(e.target.value)}
								type='text'
								placeholder='نام و نام خانوادگی'
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

						{/* Email Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiMail className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								onChange={(e) => setEmailInputValue(e.target.value)}
								type='email'
								placeholder='پست الکترونیکی'
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

						{/* Submit Form's */}
						<button
							onClick={validateInputValues}
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

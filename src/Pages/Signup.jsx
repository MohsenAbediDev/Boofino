import { useRef, useState } from 'react'
import { CiUser, CiPhone, CiMail, CiLock } from 'react-icons/ci'
import { MdErrorOutline, MdOutlineCheck } from 'react-icons/md'

export default function Signup() {
	const usernameInputRef = useRef()
	const phoneInputRef = useRef()
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const notificationBoxRef = useRef()

	const [isValidUsername, setIsValidUsername] = useState(false)
	const [isValidPhone, setIsValidPhone] = useState(false)
	const [isValidEmail, setIsValidEmail] = useState(false)
	const [isValidPassword, setIsValidPassword] = useState(false)

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	//? RegExp Pattern's
	const PhoneNumberPattern = /^09\d{9}$/
	const EmailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,}$/

	const checkInputValues = () => {
		const username = usernameInputRef.current.value
		const phoneNumber = phoneInputRef.current.value
		const email = emailInputRef.current.value
		const password = passwordInputRef.current.value
		const notification = notificationBoxRef.current

		//? Generate the error message based on validation statuses
		const usernameError = !isValidUsername ? ' نام' : ''
		const phoneError = !isValidPhone ? ' شماره همراه' : ''
		const emailError = !isValidEmail ? ' ایمیل' : ''
		const passwordError = !isValidPassword ? ' رمزعبور' : ''

		//? Set Validation's
		username && setIsValidUsername(!!username)
		PhoneNumberPattern.test(phoneNumber) && setIsValidPhone(!!phoneNumber)
		EmailPattern.test(email) && setIsValidEmail(!!email)
		password.length >= 8 && setIsValidPassword(!!password)

		//? Set Message
		setErrorMessage(
			!isValidUsername || !isValidPhone || !isValidEmail || !isValidPassword
				? `لطفا${usernameError}${phoneError ? '،' : ''}${phoneError}${
						emailError ? '،' : ''
				  }${emailError}${
						passwordError ? ' و' : ''
				  }${passwordError} را به درستی وارد کنید`
				: ''
		)
		setSuccessMessage(
			isValidUsername && isValidPhone && isValidEmail && isValidPassword
				? 'ثبت نام با موفقیت انجام شد'
				: ''
		)

		//? Show Notification
		notification.classList.add('notification--show')
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
								ref={usernameInputRef}
								type='text'
								placeholder='نام و نام خانوادگی'
							/>
						</div>

						{/* Phone Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiPhone className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								ref={phoneInputRef}
								type='text'
								placeholder='شماره همراه'
							/>
						</div>

						{/* Email Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiMail className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								ref={emailInputRef}
								type='email'
								placeholder='پست الکترونیکی'
							/>
						</div>

						{/* Password Input */}
						<div className='relative mt-5 w-[70%] dir-rtl'>
							<CiLock className='absolute top-2 right-1.5 text-[#8f95a0]' />

							<input
								className='form-input'
								ref={passwordInputRef}
								type='password'
								placeholder='رمز عبور'
							/>
						</div>

						{/* Submit Form's */}
						<button
							onClick={checkInputValues}
							className='form-input w-[70%] p-0 text-xl bg-hoverConfirmBTN'
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

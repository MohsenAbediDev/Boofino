import { isNotLoggedIn, host } from "../utils/utils"

export default function Logout() {
	const logout = () => {
		fetch(`${host}/logout`, {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	}

	logout()
  isNotLoggedIn()

	return (
		<div className='mt-32 flex flex-col text-center justify-center items-center font-shabnam text-white'>
			<p className='text-9xl text-red'>خروج</p>

			<p className='text-2xl mt-10'> ... درحال خروج از حساب</p>
		</div>
	)
}

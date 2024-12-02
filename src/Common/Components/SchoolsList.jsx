import { useEffect, useState, useContext } from 'react'
import { host } from '../../utils/utils'
import InputModal from './Modals/InputModal'
import { showModalContext } from '../contexts/showModalContext'
import { cityList } from '../../provinces_cities'
import { putUserData } from '../../utils/utils'

export default function SchoolsList({ onChangeName }) {
	const [allSchools, setALlSchools] = useState([])
	const [states, setStates] = useState([])
	const [cities, setCities] = useState([])
	const [showCities, setShowCities] = useState([])
	const [selectedState, setSelectedState] = useState(null)
	const [selectedCity, setSelectedCity] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [selectedSchool, setSelectedSchool] = useState(null)

	const [setShowModal, setShowSchoolModal] = useContext(showModalContext)

	useEffect(() => {
		getStates()
	}, [])

	useEffect(() => {
		if (selectedState) {
			let citiesOfState = []

			const filteredCities = cityList.filter(
				(city) => city.provinceName === selectedState
			)
			for (let city of filteredCities) {
				if (cities.includes(city.cityName)) {
					citiesOfState.push(city.cityName)
				}
			}
			setShowCities(citiesOfState)
		}
	}, [selectedState])

	useEffect(() => {
		if (pageNumber === 2) getSchools()
	}, [pageNumber])

	const getSchools = async () => {
		try {
			const res = await fetch(`${host}/schools`)
			const data = await res.json()

			const schoolList = []

			for (let i of data) {
				if (i.city === selectedCity && i.state === selectedState) {
					schoolList.push(i)
				}
			}

			setALlSchools(schoolList)
		} catch (err) {
			console.log(err)
		}
	}

	const getStates = async () => {
		try {
			const res = await fetch(`${host}/schools`)
			const datas = await res.json()
			let supportedStates = []
			let supportedCities = []

			for (let data of datas) {
				if (!supportedStates.includes(data.state)) {
					supportedStates.push(data.state)
				}

				if (!supportedCities.includes(data.city)) {
					supportedCities.push(data.city)
				}
			}

			setStates(supportedStates)
			setCities(supportedCities)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<InputModal height={pageNumber === 1 ? 390 : 650}>
				{pageNumber === 1 ? (
					<>
						<div className='mt-5 h-[220px] font-shabnam flex flex-col gap-y-10 overflow-y-auto dir-rtl scroll'>
							<div>
								<h1 className='text-2xl text-white mb-4'>
									استان خود را انتخاب کنید
								</h1>
								<select
									onChange={(e) => setSelectedState(e.target.value)}
									className='bg-white w-full rounded-md border-none outline-none cp text-lg h-10'>
									<option value={0} disabled selected>
										استان خود را انتخاب کنید
									</option>
									{states.map((state) => (
										<option value={state} key={state}>
											{state}
										</option>
									))}
								</select>
							</div>

							<div>
								<h1 className='text-2xl text-white mb-4'>
									شهر خود را انتخاب کنید
								</h1>
								<select
									onChange={(e) => setSelectedCity(e.target.value)}
									className='bg-white w-full rounded-md border-none outline-none cp text-lg h-10'>
									<option value={0} disabled selected>
										شهر خود را انتخاب کنید
									</option>
									{selectedState &&
										showCities.map((city, index) => (
											<option value={city} key={index}>
												{city}
											</option>
										))}
								</select>
							</div>
						</div>
						<div className='w-52 font-shabnam dir-rtl flex justify-between absolute bottom-10 left-10'>
							<button
								className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
								onClick={() => {
									setShowModal(false)
									setShowSchoolModal(false)
								}}>
								لغو
							</button>
							<button
								className={`w-24 h-12 text-lg ${
									selectedCity ? 'bg-primaryBTN' : 'bg-dashboardItemActive'
								} font-bold rounded-md text-white`}
								onClick={() => selectedCity && setPageNumber(2)}>
								بعدی
							</button>
						</div>
					</>
				) : pageNumber === 2 ? (
					<>
						<h1 className='text-white font-shabnam dir-rtl'>
							مدرسه خود را انتخاب کنید
						</h1>
						<div className='mt-5 h-[440px] font-shabnam flex flex-col gap-y-4 overflow-y-auto dir-rtl scroll'>
							{allSchools.map((school) => (
								<div
									key={school.schoolId}
									className={`transition-colors ${
										selectedSchool === school.schoolId
											? 'bg-dashboardItemActive'
											: 'bg-primary'
									} min-h-[100px] rounded-md cp px-4
                    md:min-h-[110px] md:px-2`}
									onClick={() => setSelectedSchool(school.schoolId)}>
									<div className='w-full h-full flex items-center'>
										<img
											src={school.imgUrl}
											alt={school.imgUrl}
											className='w-20 h-20 rounded-md'
										/>
										<div className='w-full h-4/6 ms-2 text-white flex flex-col justify-between'>
											<p
												className='text-2xl
                          md:text-lg'>
												{school.name}
											</p>
											<span className='text-sm md:text-xs'>
												{school.address}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='w-52 font-shabnam dir-rtl flex justify-between absolute bottom-10 left-10'>
							<button
								className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
								onClick={() => {
									setShowModal(false)
									setShowSchoolModal(false)
									selectedCity && setPageNumber(1)
								}}>
								لغو
							</button>
							<button
								className={`w-24 h-12 text-lg ${
									selectedSchool ? 'bg-primaryBTN' : 'bg-dashboardItemActive'
								} font-bold rounded-md text-white`}
								onClick={async () => {
									if (selectedSchool) {
										putUserData({ schoolId: selectedSchool })
										onChangeName(selectedSchool)
									}
									setShowModal(false)
									setShowSchoolModal(false)
									if (window.location.pathname === '/school')
										window.location.href = '/'
								}}>
								تایید
							</button>
						</div>
					</>
				) : (
					''
				)}
			</InputModal>
		</>
	)
}

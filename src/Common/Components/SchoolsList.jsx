import { useEffect, useState } from "react"
import { schools, supportedCities } from "../../../datas"
import InputModal from "./InputModal"
import { useContext } from "react"
import { showModalContext } from "../contexts/showModalContext"

export default function SchoolsList() {

  const [allSchools, setALlSchools] = useState([])
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [selectedSchool, setSelectedSchool] = useState(null)

  const [setShowModal, setShowSchoolModal] = useContext(showModalContext)

  useEffect(() => {
    setStates(supportedCities)
  }, [])

  useEffect(() => {
    const schoolsInCity = schools.filter(school => school.city === selectedCity)
    setALlSchools(schoolsInCity)

  }, [pageNumber])

  return (
    <>
      <InputModal height={pageNumber === 1 ? 390 : 650}>
        {
          pageNumber === 1 ? (<>
            <div className="mt-5 h-[220px] flex flex-col gap-y-10 overflow-y-auto scroll">
              <div>
                <h1 className="text-2xl text-white mb-4">استان خود را انتخاب کنید</h1>
                <select onChange={(e) => setSelectedState(e.target.value)} className="bg-white w-full rounded-md border-none outline-none text-lg h-10">
                  <option value={0} disabled selected>استان خود را انتخاب کنید</option>
                  {
                    states.map(state =>
                      <option value={state.state} key={state.state}>{state.title}</option>
                    )
                  }
                </select>
              </div>

              <div>
                <h1 className="text-2xl text-white mb-4">شهر خود راانتخاب کنید</h1>
                <select onChange={e => setSelectedCity(e.target.value)} className="bg-white w-full rounded-md border-none outline-none text-lg h-10">
                  <option value={0} disabled selected>شهر خود را انتخاب کنید</option>
                  {
                    selectedState && states.filter(state => state.state === selectedState)[0].cities
                      .map(city => <option key={city.city} value={city.city}>{city.title}</option>)
                  }
                </select>
              </div>
            </div>
            <div className='w-52 flex justify-between absolute bottom-10 left-10'>
              <button
                className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
                onClick={() => {
                  setShowModal(false)
                  setShowSchoolModal(false)
                }}
              >
                لغو
              </button>
              <button className={`w-24 h-12 text-lg ${selectedCity ? 'bg-primaryBTN' : 'bg-dashboardItemActive'} font-bold rounded-md text-white`}
                onClick={() => selectedCity && setPageNumber(2)}>
                بعدی
              </button>
            </div>
          </>
          ) : pageNumber === 2 ? (
            <>
              <h1 className="text-white">مدرسه خود را انتخاب کنید</h1>
              <div className="mt-5 h-[440px] flex flex-col gap-y-4 overflow-y-auto scroll">
                {
                  allSchools.map(school => (
                    <div key={school.id} className={`transition-colors ${selectedSchool === school.id ? 'bg-dashboardItemActive' : 'bg-primary'} min-h-[100px] rounded-md px-4
                    md:min-h-[110px] md:px-2`}
                      onClick={() => setSelectedSchool(school.id)}>
                      <div className="w-full h-full flex items-center">
                        <img src={school.pic} alt="" className="w-20 h-20 rounded-md" />
                        <div className="w-full h-4/6 ms-2 text-white flex flex-col justify-between">
                          <p className="text-2xl
                          md:text-lg">{school.name}</p>
                          <span className="text-sm md:text-xs">{school.address}</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-52 flex justify-between absolute bottom-10 left-10'>
                <button
                  className='w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black'
                  onClick={() => {
                    setShowModal(false)
                    setShowSchoolModal(false)
                    selectedCity && setPageNumber(1)
                  }}
                >
                  لغو
                </button>
                <button className={`w-24 h-12 text-lg ${selectedSchool ? 'bg-primaryBTN' : 'bg-dashboardItemActive'} font-bold rounded-md text-white`}
                  onClick={() => {
                    if(selectedSchool) console.log('hoooo');
                    // send school id to api👆
                    setShowModal(false)
                    setShowSchoolModal(false)
                    if(window.location.pathname === '/school')
                      window.location.href = '/'
                  }}>
                  تایید
                </button>
              </div>
            </>
          ) : ''
        }
      </InputModal>
    </>
  )
}
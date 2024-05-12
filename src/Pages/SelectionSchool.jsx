import { useState } from "react"
import { showModalContext } from "../Common/contexts/showModalContext"
import SchoolsList from "../Common/Components/SchoolsList"

export default function SelectionSchool() {

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowSchoolModal, setIsShowSchoolModal] = useState(false)
  const foo = value => {

  }

  return (<>
    <showModalContext.Provider value={[setIsShowModal, setIsShowSchoolModal]}>
      <SchoolsList onChangeName={foo}/>
    </showModalContext.Provider>
  </>)
}
import { useState } from "react";
import { useEffect } from "react"
import EditProductCard from "../Common/Components/EditProductCard";

export default function ProducstList() {

  const [datas, setDatas] = useState([])

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'GET',
        credentials: 'include',
      })

      const data = await res.json()
      setDatas(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className='w-full h-full flex flex-col relative text-xl text-white'>
        <div className='w-full h-full overflow-y-auto scroll'>
          <div className="w-full h-16 dir-ltr flex md:h-10">
            <div className="h-full w-1/2 grid grid-cols-3 justify-items-center items-center md:opacity-0">
              <p>قیمت</p>
              <p>وضعیت</p>
              <p>تاریخ ایجاد</p>
            </div>
            <div className="h-full w-1/2 flex items-center gap-3 dir-rtl">
              <input type="checkbox" className="w-6 h-6 md:w-5 md:h-5" />
              <p>انتخاب همه</p>
            </div>
          </div>
          <div>
            {
              datas.map(data => (
                <>
                  <EditProductCard {...data} />
                </>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
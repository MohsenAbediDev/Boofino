import { useState } from "react"

export default function AddProduct() {

  const groups = [
    { id: 1, title: 'خوراکی' },
    { id: 2, title: 'غذای گرم' },
    { id: 3, title: 'غذای سرد' },
    { id: 4, title: 'نوشیدنی گرم' },
    { id: 5, title: 'نوشیدنی سرد' },
  ]

  // for(let item of groups) {
  //   fetch('http://localhost:3000/addcategory' , {
  //     method: 'POST' ,
  //     body: JSON.stringify({name: item.title})
  //   })
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))
  // }
  // fetch('http://localhost:3000/addcategory' , {
  //   method: 'POST' ,
  //   body: JSON.stringify({name: 'slam'})
  // })
  // .then(res => res.json())
  // .then(data => console.log(data))
  // .catch(err => console.log(err))

  // fetch('http://localhost:3000/categories')
  // .then(res => res.json())
  // .then(data => console.log(data))
  // .catch(err=> console.log( err))

  const [filePath, setFilePath] = useState(null)
  const [selectedPic, setSelectedPic] = useState(null)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [group, setGroup] = useState(1)
  const [off, setOff] = useState('')
  const [count, setCount] = useState('')

  // send picture
  const sendPictureHandler = e => {
    const selectedFile = e.target.files[0]
    const filePath = URL.createObjectURL(selectedFile)
    setFilePath(filePath)
    setSelectedPic(selectedFile)
  }

  // send data to api
  const uploadImage = async () => {

    if (selectedPic) {
      const formData = new FormData()
      formData.append('imgUrl', selectedPic)

      try {
        const res = await fetch('http://localhost:3000/uploadimg', {
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        return data

      } catch (err) {
        alert('مشکلی در بارگذاری عکس پیش آمده')
      }
    }
  }

  const sendToApi = async () => {
    const imgUrl = await uploadImage()
    console.log(imgUrl);
    if (imgUrl && title && price && count) {

      try {

        const res = await fetch('http://localhost:3000/addproduct', {
          method: 'POST',
          body: JSON.stringify({
            "name": "salam",
            "price": 12000,
            "off": 12,
            "group": 2,
            "itemCount": 1,
            "imgUrl": "salam",
            "isDiscount": true,
            "oldPrice": null,
            "freeTime": { "1": 1 }
          }),
        })
        const data = await res.json()
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('لطفا تمام فیلد هارو پر کنید')
    }

  }

  return (
    <div className="dashboard-container h-fit py-14 flex flex-col gap-y-9 items-center justify-center">
      <div className="bg-dashboardItem shadow-xl w-52 rounded-dashboarditem flex justify-center relative overflow-hidden">
        {
          filePath && <img src={filePath} alt="" className="w-full h-full absolute" />
        }
        <input type="file" className="flex items-center my-[90px]"
          accept='.jpg,.png,.jpeg'
          onChange={e => sendPictureHandler(e)} />
      </div>
      <div className="w-4/5 grid grid-cols-2 gap-5 lg:grid-cols-1">
        <div className="flex flex-col gap-y-4">
          <label htmlFor="name" className="text-2xl text-white">افزودن نام</label>
          <input type="text" id="name" placeholder="ساندویچ عباس"
            className="h-14 shadow-xl px-5 text-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none"
            value={title}
            onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="name" className="text-2xl text-white">افزودن قیمت</label>
          <input type="number" id="name" placeholder="12000 تومان"
            className="h-14 shadow-xl px-5 text-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none"
            value={price}
            onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="name" className="text-2xl text-white">دسته بندی</label>
          <select className="h-14 shadow-xl px-5 text-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none"
            onChange={e => setGroup(e.target.value)}>
            {
              groups.map(group =>
                <option value={group.id} key={group.id}>{group.title}</option>
              )
            }
          </select>
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="name" className="text-2xl text-white">افزودن تخفیف</label>
          <input type="number" id="name" placeholder="43٪"
            className="h-14 shadow-xl px-5 text-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none"
            value={off}
            onChange={e => setOff(e.target.value)} />
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="name" className="text-2xl text-white">تعداد محصول</label>
          <input type="number" id="name" placeholder="43"
            className="h-14 shadow-xl px-5 text-xl rounded-dashboarditem bg-dashboardItem text-white outline-none border-none"
            value={count}
            onChange={e => setCount(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end w-4/5 gap-x-5">
        <button className="h-12 w-24 bg-hoverBTN rounded-lg text-xl text-black">
          لغو
        </button>
        <button className="h-12 w-24 bg-primaryBTN rounded-lg text-xl text-white"
          onClick={sendToApi}>
          افزودن
        </button>
      </div>
    </div>
  )
}
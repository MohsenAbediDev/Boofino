import { Link } from "react-router-dom";

export default function EditProductCard({ _id, imgUrl, name, price, itemCount }) {
  console.log(itemCount);

  return (
    <>
      <Link to={`/edit-product/${name}`}>
        <div className="bg-secondary h-[170px] w-full rounded-2xl my-5 md:my-5 md:h-[200px]">
          <div className="h-full p-5 flex justify-between md:p-3 md:flex-col md:justify-around">
            <div className="flex items-center w-1/2 md:w-full">
              <input type="checkbox" className="w-6 h-6 md:h-5 md:w-5" />
              <img src={imgUrl} className={`w-32 h-32 rounded-lg mx-5
              md:w-24 md:h-24 md:mx-4`} />
              <p className="text-2xl md:text-xl">{name}</p>
            </div>
            <div className="grid grid-cols-3 justify-items-center items-center w-1/2 md:w-5/6 md:mx-auto">
              <p className="md:text-lg">1357/11/22</p>
              <p className={`w-20 h-10 flex justify-center items-center rounded-lg ${itemCount > 0 ? 'bg-green md:w-16' : 'bg-red md:w-[70px]'}
               md:h- md:text-lg`}>
                {
                  itemCount > 0 ? 'موجود' : 'ناموجود'
                }
              </p>
              <p className="md:text-lg">{price} تومان</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
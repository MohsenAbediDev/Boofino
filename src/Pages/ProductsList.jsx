import { useState } from 'react'
import { useEffect } from 'react'
import EditProductCard from '../Common/Components/EditProductCard'
import { selectedProduct } from '../Common/contexts/selectedProductsContext'
import { deleteProduct } from '../utils/utils'

export default function ProducstList() {
	const [datas, setDatas] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])

	useEffect(() => {
		getDatas()
	}, [])

	// remove products
	const removeHandler = async () => {

		console.log(selectedProducts);
		if (selectedProducts.length > 0) {
			// If it was a product
			if (selectedProducts.length === 1) {
				deleteProduct(selectedProducts[0])
				getDatas()
			} else {
				// If it was more than one product
				try {
					await fetch('http://localhost:3000/deleteproducts', {
						method: 'DELETE',
						body: JSON.stringify({ productNames: selectedProducts }),
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
					})
					getDatas()
				} catch (err) {
					console.log(err);
				}
			}
		}
	}

	const getDatas = async () => {
		try {
			const res = await fetch('http://localhost:3000/products', {
				method: 'GET',
				credentials: 'include',
			})

			const data = await res.json()
			setDatas(data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='w-full h-full flex flex-col relative text-xl text-white'>
				<div className='w-full h-[89%] overflow-y-auto scroll'>
					<div className='w-full h-16 dir-ltr flex md:h-10'>
						<div className='h-full w-1/2 grid grid-cols-3 justify-items-center items-center md:opacity-0'>
							<p>قیمت</p>
							<p>وضعیت</p>
							<p>تاریخ ایجاد</p>
						</div>
						<div className='h-full w-1/2 flex items-center gap-3 dir-rtl'>
							<input type='checkbox' id='select-all-products' className='w-6 h-6 md:w-5 md:h-5 cp' />
							<label htmlFor="select-all-products" className='cp select-none'>انتخاب همه</label>
						</div>
					</div>
					<div>
						{datas.map((data) => (
							<>
								<selectedProduct.Provider value={setSelectedProducts}>
									<EditProductCard {...data} />
								</selectedProduct.Provider>
							</>
						))}
					</div>
				</div>
				<div className='w-full h-20 bg-primary absolute bottom-0 flex items-center'>
					<button className='bg-red rounded-md w-20 h-12 text-2xl absolute left-16 md:left-5 md:text-xl md:h-[45px]'
						onClick={removeHandler}
					>
						حذف
					</button>
				</div>
			</div>
		</>
	)
}

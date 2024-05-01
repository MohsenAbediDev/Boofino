import { redirect } from 'react-router-dom'

//? Product function's

// add count funcrion
const addCount = (setCount, id) => {
	// get current datas
	const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
	const mainProductIndex = mainProductCart
		? mainProductCart.findIndex((product) => product.id === id)
		: -1

	// add count of product from Cart
	if (mainProductIndex !== -1) {
		const productData = JSON.parse(localStorage.getItem('productCart'))
		const mainDataInedx = productData.findIndex((product) => product.id === id)
		productData[mainDataInedx].count = productData[mainDataInedx].count + 1
		localStorage.setItem('productCart', JSON.stringify(productData))

		setCount(productData[mainDataInedx].count)
	}
}

// min count function
const minCount = (setCount, id) => {
	// get current datas
	const productData = JSON.parse(localStorage.getItem('productCart'))
	const mainDataInedx = productData.findIndex((product) => product.id === id)
	productData[mainDataInedx].count = productData[mainDataInedx].count - 1

	if (productData[mainDataInedx].count <= 0) {
		productData.splice(mainDataInedx, 1)
		localStorage.setItem('productCart', JSON.stringify(productData))
		setCount(0)
	} else {
		localStorage.setItem('productCart', JSON.stringify(productData))
		setCount(productData[mainDataInedx].count)
	}
}

const addToCart = (setCount, setId, id) => {
	// get current datas
	const mainProductCart = JSON.parse(localStorage.getItem('productCart'))
	setCount(1)

	const mainProductCartID = mainProductCart
		? mainProductCart.map((product) => product.id)
		: []

	if (!mainProductCartID.includes(id)) {
		if (!mainProductCart) {
			localStorage.setItem(
				'productCart',
				JSON.stringify([{ id: id, count: 1 }])
			)
			setId([id])
		} else {
			localStorage.setItem(
				'productCart',
				JSON.stringify([...mainProductCart, { id: id, count: 1 }])
			)
			setId([...mainProductCartID, id])
		}
	}
}

const removeProduct = (id) => {
	const productData = JSON.parse(localStorage.getItem('productCart'))
	const mainDataInedx = productData.findIndex((product) => product.id === id)

	productData.splice(mainDataInedx, 1)
	localStorage.setItem('productCart', JSON.stringify(productData))
}

//? Check user is login or not

const getUser = async () => {
	try {
		const response = await fetch('http://localhost:3000/user', {
			method: 'GET',
			credentials: 'include',
		})
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}

// Function for when the user is not logged in
const isNotLoggedIn = () => {
	return
}

// Function for when the user is logged in
const isLoggedIn = async () => {
	const user = await getUser()

	if (user[0].username) {
		window.location.href = '/'
	}
}

export {
	addCount,
	minCount,
	addToCart,
	removeProduct,
	isLoggedIn,
	isNotLoggedIn,
}

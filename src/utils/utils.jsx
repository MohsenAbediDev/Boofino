//? Global variable's
const host = 'http://localhost:3000'
const domain = 'http://localhost:5173'

//? Product function's

// add count funcrion
const addCount = (setCount, id) => {
	// Retrieve product data from `localStorage`
	const productData = JSON.parse(localStorage.getItem('productCart')) || []
	const mainDataIndex = productData.findIndex((product) => product.id === id)

	// Ensure the product exists in the cart
	if (mainDataIndex !== -1) {
		// Increase the product quantity
		productData[mainDataIndex].count += 1
		localStorage.setItem('productCart', JSON.stringify(productData))

		// Update the `setCount` state
		setCount(productData[mainDataIndex].count)
	}
}

// min count function
const minCount = (setCount, id) => {
	// get current datas
	const productData = JSON.parse(localStorage.getItem('productCart')) || []
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

//? Api function's

//? Check user is login or not
const getUser = async () => {
	try {
		const response = await fetch(`${host}/user`, {
			method: 'GET',
			credentials: 'include',
		})
		const data = await response.json()
		return data
	} catch (error) {
		error
	}
}

//? Update user information
const putUserData = async (data) => {
	try {
		const response = await fetch(`${host}/user`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
	} catch (error) {
		console.log(error)
	}
}

//? Delete product from database
const deleteProduct = async (product) => {
	try {
		const res = await fetch(`${host}/deleteproduct/${product}`, {
			method: 'DELETE',
			credentials: 'include',
		})

		return res
	} catch (error) {
		console.log(error)
	}
}

//? Get user isAdmin or No ?
const getUserAdmin = async () => {
	const user = await getUser()

	return user[0].is_admin
}
//? Get user isAdmin or No ?
const getUserWallet = async () => {
	const user = await getUser()

	return user[0].wallet
}

//? Function for when the user is not logged in
const isNotLoggedIn = async () => {
	const user = await getUser()

	if (!user[0]) {
		if (
			window.location.pathname != '/signup' &&
			window.location.pathname != '/login' &&
			window.location.pathname != '/school'
		) {
			window.location.href = '/login'
		}
	}
}

//? Function for when the user is logged in
const isLoggedIn = async () => {
	const user = await getUser()

	if (user[0] && user[0].username) {
		window.location.href = '/'
	}
}

//? Function for when the user is not admin
const isNotAdmin = async () => {
	const isUserAdmin = await getUserAdmin()

	if (!isUserAdmin) {
		if (
			window.location.pathname == '/dashboard/add-product' ||
			window.location.pathname == '/dashboard/product-list' ||
			window.location.pathname.includes('edit-product') ||
			window.location.pathname == '/dashboard/statistic' ||
			window.location.pathname == '/dashboard/admin-orders'
		) {
			window.location.href = '/'
		}
	}
}

export {
	host,
	domain,
	addCount,
	minCount,
	addToCart,
	removeProduct,
	isLoggedIn,
	isNotLoggedIn,
	getUserAdmin,
	getUser,
	putUserData,
	deleteProduct,
	isNotAdmin,
	getUserWallet,
}

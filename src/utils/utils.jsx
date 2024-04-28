import CryptoJS from 'crypto-js'

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

//? Data encryption

// Generate Secret Key
const generateSecretKey = () => {
	const randomString =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)

	const secretKey = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex)
	return secretKey
}

// Encrypt data
const encryptText = (text, secretKey) => {
	return CryptoJS.AES.encrypt(text, secretKey).toString()
}

// Decrypt data
const decryptText = (ciphertext, secretKey) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
	return bytes.toString(CryptoJS.enc.Utf8)
}

export {
	addCount,
	minCount,
	addToCart,
	removeProduct,
	generateSecretKey,
	encryptText,
	decryptText,
}

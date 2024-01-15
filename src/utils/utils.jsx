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
    } else {
        localStorage.setItem('productCart', JSON.stringify(productData))
        setCount(productData[mainDataInedx].count)
    }
}

export { addCount, minCount }
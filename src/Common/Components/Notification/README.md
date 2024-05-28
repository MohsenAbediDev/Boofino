<div style="direction: rtl;" >

# نحوه استفاده از کامپوننت نوتیفیکشن

این داکیومنت نحوه استفاده و فراخوانی کامپوننت `Notification` را توضیح می‌دهد.

### مرحله 1: ایمپورت کردن کامپوننت

ابتدا کامپوننت `Notification` را در فایل مربوطه ایمپورت کنید:

```jsx
import Notification from 'Notification/Notification'
```

### مرحله 2: فراخوانی نوتیفیکشن

کاستوم تگ زیر را فرا بخوانید

```jsx
{
	isShowNotification && (
		<Notification errorMessage={errorMessage} successMessage={successMessage} />
	)
}
```

### مرحله 3: تعریف States

در کد خود State های زیر را تعریف کنید

```jsx
//? Notification Variable's
const [successMessage, setSuccessMessage] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const [isShowNotification, setIsShowNotification] = useState(false)
```

### مرحله 3: توضیحات

`successMessage`: این State برای ثبت متن اعلان های موفق می‌باشد

`errorMessage`: این State برای ثبت متن اعلان های غیر موفق می‌باشد

`isShowNotification`: این State برای نمایش دادن یا ندادن نوتیفیکیشن می‌باشد

### مرحله 4: ثبت متن نوتیفیکیشن

```jsx
const showNotification = (response) => {
	const handleResponse = (data) => {
		if (response.ok) {
			setErrorMessage('')
			setSuccessMessage(data.message)
			setIsShowNotification(true)
		} else {
			setSuccessMessage('')
			setErrorMessage(data.message)
			setIsShowNotification(true)
		}
	}

	const handleFailure = (error) => {
		console.error('Error parsing JSON:', error)
	}

	response.json().then(handleResponse).catch(handleFailure)
}
```

ثبت متن اعلان در ورودی تابع showNotification

```jsx
const res = await fetch('http://localhost:3000/addproduct', {
	method: 'POST',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(productData),
}).then((res) => showNotification(res))
```

<style>
  body {
    background-color: #0d1117;
    color: white;
  }
  .rtl {
    direction: rtl;
    text-align: right;
  }
</style>

<div class="rtl">

# نحوه استفاده از مودال تایید

این داکیومنت نحوه استفاده و فراخوانی کامپوننت `ConfirmationModal` را توضیح می‌دهد.

### مرحله 1: ایمپورت کردن کامپوننت

ابتدا کامپوننت `ConfirmationModal` را در فایل مربوطه ایمپورت کنید:

```jsx
import ConfirmationModal from 'Modals/ConfirmationModal'
```

### مرحله 2: فراخوانی مودال

کاستوم تگ زیر را فرا بخوانید

```jsx
<ConfirmationModal
	isOpen={isModalOpen}
	onClose={CloseModal}
	onConfirm={handleConfirm}
	title='عنوان مودال'
>
	<p> متن مودال </p>
</ConfirmationModal>
```

### توضیحات

isOpen: این prop مشخص می‌کند که مودال باز یا بسته باشد. مقدار آن از state isModalOpen گرفته می‌شود.
onClose: این prop تابعی را دریافت می‌کند که هنگام کلیک بر روی دکمه لغو اجرا می‌شود.
onConfirm: این prop تابعی را دریافت می‌کند که هنگام کلیک بر روی دکمه تایید اجرا می‌شود.
title: این prop عنوان مودال را مشخص می‌کند.
children: این prop محتوای داخل مودال را مشخص می‌کند.

### نمونه استفاده

```jsx
import React, { useState } from 'react'
import Modal from './Modal'

export default function App() {
	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleConfirm = () => {
		console.log('تایید شد!')
		setModalOpen(false)
	}

	return (
		<div>
			<button onClick={handleOpenModal}>باز کردن مودال</button>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleConfirm}
				title='عنوان مودال'
			>
				<p>محتوای مودال اینجاست</p>
			</Modal>
		</div>
	)
}
```

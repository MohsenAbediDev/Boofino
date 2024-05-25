import React from 'react'

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title,
	children,
}) {
	return (
		<>
			{/* Wrapper */}
			<div
				className={`fixed w-full h-full top-0 left-0 bg-black/40 z-30 md:backdrop-blur transition-all ${
					isOpen ? 'show' : 'hide'
				}`}
			></div>

			<div
				className={`fixed flex items-center justify-center inset-0 z-50 transition-all ${
					isOpen ? 'show' : 'hide'
				}`}
			>
				<div className='font-shabnam bg-secondary dir-rtl rounded-lg shadow-lg p-6 w-96'>
					<h2 className='text-white text-xl font-bold mb-4'>{title}</h2>
					<div className='text-white mb-4'>{children}</div>
					<div className='flex justify-end gap-x-3'>
						<button className='bg-hoverBTN py-2 px-5 rounded' onClick={onClose}>
							لغو
						</button>
						<button
							className='bg-primaryBTN text-white py-2 px-4 rounded'
							onClick={onConfirm}
						>
							تایید
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

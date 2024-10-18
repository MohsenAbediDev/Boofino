import './Animations.css'

export default function Loader() {
	const randomAnimation = Math.floor(Math.random() * 8) + 1

	return (
		<div className='fixed bg-primary w-full h-full flex items-center justify-center flex-col z-[100]'>
			<div className={`loader-${randomAnimation}`}></div>
			
			<h1 className='mt-5 text-white text-2xl font-bold dir-rtl'>درحال بارگذاری ...</h1>
		</div>
	)
}
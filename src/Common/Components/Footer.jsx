import { FaInstagram, FaTelegram, FaTwitter, FaYoutube, FaPhone, FaMailBulk, FaLocationArrow } from "react-icons/fa";

export default function Footer() {
	return (
		<footer>
			<div className="h-80 w-full bg-footer flex dir-rtl p-11">
				<div className="h-full w-1/3 p-9">
					<div className="w-full h-full flex flex-col">
						<h1 className="text-white text-5xl">بوفینو</h1>
						<div className="flex w-44 justify-between mt-6">
							<a href="#">
								<FaInstagram className="text-white text-3xl"/>
							</a>
							<a href="#">
								<FaTelegram className="text-white text-3xl"/>
							</a>
							<a href="">
								<FaTwitter className="text-white text-3xl"/>
							</a>
							<a href="">
								<FaYoutube className="text-white text-3xl"/>
							</a>
						</div>
					</div>
				</div>
				<div className="h-full w-1/3">
					<h1 className="text-white text-2xl">تماس با ما</h1>
					<div className="w-[90%] flex flex-col gap-y-2">
						<div className="text-xl text-white p-2 flex gap-x-2">
							<FaPhone/> <span>090909090909</span>
						</div>
						<div className="text-xl text-white p-2 flex gap-x-2">
							<FaMailBulk/> <span>admin@boofino.co</span>
						</div>
						<div className="text-xl text-white p-2 flex gap-x-2">
							<span>ادرس دفتر: تهران، خیابون جانبازی، خیابون شهید جانبازی،‌ کوچه مادر جانبازی، پلاک ۴۳</span>
						</div>
					</div>
				</div>
				<div className="bg-primaryBTN h-full w-1/3"></div>
			</div>
		</footer>
	)
}

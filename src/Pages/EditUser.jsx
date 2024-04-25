import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";

import InputModal from "../Common/Components/InputModal";

export default function EditUser() {

	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowNameModal, setIsShowNameModal] = useState(false)
	const [isShowEmailModal, setIsShowEmailModal] = useState(false)
	const [isShowSchoolModal, setIsShowSchoolModal] = useState(false)
	const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
	const [isShowPictureModal, setIsShowPictureModal] = useState(false)
	const [filePath, setFilePath] = useState(null)
	const [selectedPic, setSelectedPic] = useState(null)

	return (
		<>
			<div className='flex flex-col w-full'>
				<div className="dashboard-container grid grid-cols-2 gap-4 lg:grid-cols-1">
					{/* name and profile box */}
					<div className="dashboard-item bg-hoverBTN min-h-[96px] flex-1">
						<div className="box">
							{/* user profile pic */}
							<img src="../images/blankUserProfile.png" alt="" className="w-full h-full" />
							{/* change profile pic button */}
							<div className="item" onClick={() => {
								setIsShowModal(true)
								setIsShowPictureModal(true)
							}}>
								<IoCameraOutline className="text-white text-3xl" />
								<span className="text-white text-sm">تغییر عکس</span>
							</div>
						</div>
						{/* user name */}
						<div className="flex-1 flex justify-between items-center px-3 h-full">
							<p className="text-2xl font-bold">یوسف حاجیپور</p>
							<LuPencil className="text-3xl cursor-pointer" onClick={() => {
								setIsShowNameModal(true)
								setIsShowModal(true)
							}} />
						</div>
					</div>
					{/* email box */}
					<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 dir-ltr relative">
						<div>
							<span className="text-white text-xl absolute top-3">email:</span>
							<p className="text-white text-2xl absolute top-10 left-7">qeileyiyeyye@gmail.com</p>
						</div>
						<LuPencil className="text-3xl cursor-pointer text-white" onClick={() => {
							setIsShowEmailModal(true)
							setIsShowModal(true)
						}} />
					</div>
					{/* school box */}
					<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 relative">
						<div>
							<span className="text-white text-xl absolute top-3">مدرسه:</span>
							<p className="text-white text-2xl absolute top-10 right-7">هنرستان فنی جابر ابن خنسضسم</p>
						</div>
						<LuPencil className="text-3xl cursor-pointer text-white" onClick={() => {
							setIsShowSchoolModal(true)
							setIsShowModal(true)
						}} />
					</div>
					{/* change password */}
					<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5">
						<div className="flex cursor-pointer justify-between w-full">
							<p className="text-2xl text-white">تغییر رمز عبور</p>
							<LuPencil className="text-3xl text-white" onClick={() => {
								setIsShowPasswordModal(true)
								setIsShowModal(true)
							}} />
						</div>
					</div>
				</div>
			</div>

			{/* Overlay in Backdrop Navbar */}
			<div
				className={`app-overlay fixed w-full h-full top-0 left-0 bg-black/40 z-30 md:backdrop-blur transition-all ${isShowModal ? 'show' : 'hide'}`}
			>
			</div>

			{/* show input modals */}
			{
				isShowNameModal ? (
					<InputModal>
						<h1 className="text-2xl text-white">نام جدید خود را وارد کنید</h1>
						<div className="w-52 flex justify-between absolute bottom-10 left-10">
							<button className="w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black"
								onClick={() => {
									setIsShowNameModal(false)
									setIsShowModal(false)
								}}>لغو</button>
							<button className="w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white">ارسال</button>
						</div>
					</InputModal>
				) : isShowEmailModal ? (
					<InputModal>
						<h1 className="text-2xl text-white">ایمیل جدید خود را وارد کنید</h1>
						<div className="w-52 flex justify-between absolute bottom-10 left-10">
							<button className="w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black"
								onClick={() => {
									setIsShowEmailModal(false)
									setIsShowModal(false)
								}}>لغو</button>
							<button className="w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white">ارسال</button>
						</div>
					</InputModal>
				) : isShowPasswordModal ? (
					<InputModal>
						<h1 className="text-2xl text-white">پسوزد جدید خود را وارد کنید</h1>
						<div className="w-52 flex justify-between absolute bottom-10 left-10">
							<button className="w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black"
								onClick={() => {
									setIsShowPasswordModal(false)
									setIsShowModal(false)
								}}>لغو</button>
							<button className="w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white">ارسال</button>
						</div>
					</InputModal>
				) : isShowSchoolModal ? (
					<InputModal>
						<h1 className="text-2xl text-white">مدرسه جدید خود را وارد کنید</h1>
						<div className="w-52 flex justify-between absolute bottom-10 left-10">
							<button className="w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black"
								onClick={() => {
									setIsShowSchoolModal(false)
									setIsShowModal(false)
								}}>لغو</button>
							<button className="w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white">ارسال</button>
						</div>
					</InputModal>
				) : isShowPictureModal ? (
					<InputModal>
						<h1 className="text-2xl text-white">عکس جدید خود را وارد کنید</h1>
						<form className="mx-auto h-2/3 flex justify-center items-center">
							<div className="text-white w-64 h-40 rounded-lg flex justify-center items-center">
								{
									filePath ? <img src={filePath} className="w-48 h-48" />
										: <input type="file" accept=".jpg,.png,.jpeg" onChange={(e) => {
											const selectedFile = e.target.files[0]
											const filePath = URL.createObjectURL(selectedFile)
											setFilePath(filePath)
											setSelectedPic(selectedFile)
										}} />
								}
							</div>
						</form>
						<div className="w-52 flex justify-between absolute bottom-10 left-10">
							<button className="w-24 h-12 text-lg bg-hoverBTN font-bold rounded-md text-black"
								onClick={() => {
									setIsShowPictureModal(false)
									setIsShowModal(false)
									setFilePath(null)
								}}>لغو</button>
								{/* چون ای پی آی یوخدی قعلا واسه ارسال کردنش چیزی نزدم */}
							<button className="w-24 h-12 text-lg bg-primaryBTN font-bold rounded-md text-white" onClick={() => console.log(selectedPic)}>اپلود</button>
						</div>
					</InputModal>) : ''
			}
		</>
	)
}
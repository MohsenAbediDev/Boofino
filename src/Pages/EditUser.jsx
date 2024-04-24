import { IoCameraOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";

export default function EditUser() {
	return (
		<div className='flex flex-col w-full'>
			<div className="dashboard-container grid grid-cols-2 gap-4 lg:grid-cols-1">
				{/* name and profile box */}
				<div className="dashboard-item bg-hoverBTN min-h-[96px] flex-1">
					<div className="box">
						{/* user profile pic */}
						<img src="../images/blankUserProfile.png" alt="" className="w-full h-full" />
						{/* change profile pic button */}
						<div className="item">
							<IoCameraOutline className="text-white text-3xl" />
							<span className="text-white text-sm">تغییر عکس</span>
						</div>
					</div>
					{/* user name */}
					<div className="flex-1 flex justify-between items-center px-3 h-full">
						<p className="text-2xl font-bold">یوسف حاجیپور</p>
						<LuPencil className="text-3xl cursor-pointer" />
					</div>
				</div>
				{/* email box */}
				<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 dir-ltr relative">
					<div>
						<span className="text-white text-xl absolute top-3">email:</span>
						<p className="text-white text-2xl absolute top-10 left-7">qeileyiyeyye@gmail.com</p>
					</div>
					<LuPencil className="text-3xl cursor-pointer text-white" />
				</div>
				{/* school box */}
				<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5 relative">
					<div>
						<span className="text-white text-xl absolute top-3">مدرسه:</span>
						<p className="text-white text-2xl absolute top-10 right-7">هنرستان فنی جابر ابن خنسضسم</p>
					</div>
					<LuPencil className="text-3xl cursor-pointer text-white" />
				</div>
				{/* change username */}
				<div className="dashboard-item min-h-[96px] flex-1 flex justify-between bg-dashboardItem px-5">
					<div className="flex cursor-pointer justify-between w-full">
						<p className="text-2xl text-white">تغییر رمز عبور</p>
						<LuPencil className="text-3xl text-white" />
					</div>
				</div>
			</div>
		</div>
	)
}

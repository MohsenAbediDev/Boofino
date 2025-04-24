import { useState } from 'react'
import BackToDashboard from '../Common/Components/BackToDashboard'
import SaleChart from '../Common/Components/Charts/SaleChart'

import { ImStatsBars } from 'react-icons/im'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { CgMoreO } from 'react-icons/cg'

export default function Statistic() {
	// Sale Data
	const saleData = [
	  {name: '1403/03/12', مقدار: 20},
	  {name: '1403/03/13', مقدار: 50},
	  {name: '1403/03/14', مقدار: 32},
	  {name: '1403/03/15', مقدار: 15},
	  {name: '1403/03/16', مقدار: 35},
	]

	// Income Stat Variable's
	const [incomePerDay, setIncomePerDay] = useState(0)
	const [incomePerWeak, setIncomePerWeak] = useState(0)
	const [incomePerMonth, setIncomePerMonth] = useState(0)
	const [totalIncome, setTotalIncome] = useState(0)

	// User Stat Variable's
	const [usersCount, setUsersCount] = useState(0)

	// Food Stat Variable's
	const [premierFood, setPremierFood] = useState('تست')

	// Function's

	return (
		<div className='w-full flex flex-col'>
			<BackToDashboard title='آمارهای من' />

			<div className='dashboard-container text-white h-fit py-5 px-5 sm:px-2 flex flex-col gap-y-9'>
				{/* Sale Stat */}
				<div className='flex items-center gap-x-2 sm:hidden'>
					<ImStatsBars />
					<p className='text-xl'>میزان فروش</p>
				</div>

				<div className='flex justify-center items-center sm:hidden'>
					<SaleChart data={saleData} dataKey='مقدار' grid />
				</div>

				{/* Income Stats */}
				<div className='flex items-center gap-x-2'>
					<FaMoneyBillTrendUp />
					<p className='text-xl'>میزان درآمد</p>
				</div>

				<div className='flex items-center justify-center flex-wrap gap-10'>
					<div className='bg-incomeStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'>میزان درآمد در روز</h3>

						<span className='font-bold text-xl'>{incomePerDay} تومان</span>
					</div>

					<div className='bg-incomeStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'>میزان درآمد در هفته</h3>

						<span className='font-bold text-xl'>{incomePerWeak} تومان</span>
					</div>

					<div className='bg-incomeStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'>میزان درآمد در ماه</h3>

						<span className='font-bold text-xl'>{incomePerMonth} تومان</span>
					</div>

					<div className='bg-incomeStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'>میزان درآمد در کل</h3>

						<span className='font-bold text-xl'>{totalIncome} تومان</span>
					</div>
				</div>

				{/* More Stats */}
				<div className='flex items-center gap-x-2'>
					<CgMoreO />
					<p className='text-xl'>آمارهای بیشتر</p>
				</div>

				<div className='flex items-center justify-center flex-wrap gap-10'>
					<div className='bg-userStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'> تعداد کاربران </h3>

						<span className='font-bold text-xl'>{usersCount} نفر</span>
					</div>

					<div className='bg-premierFoodStat shadow-xl w-80 h-32 rounded-dashboarditem flex items-center justify-center flex-col relative overflow-hidden'>
						<h3 className='absolute top-2'> محصول برتر </h3>

						<span className='font-bold text-xl'>{premierFood}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

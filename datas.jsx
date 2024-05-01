//? hotFood , coldFood , hotDrink , coldDrink , edible

const products = [
	{
		id: 1,
		group: 'hotFood',
		title: 'ساندویچ همبرگر',
		image: '/images/3.jpg',
		price: 40_000,
		isDiscount: false,
		oldPrice: null,
	},
	{
		id: 2,
		group: 'coldFood',
		title: 'ساندویچ کالباس',
		image: '/images/3.jpg',
		price: 30_000,
		isDiscount: false,
		oldPrice: null,
	},
	{
		id: 3,
		group: 'hotDrink',
		title: 'چای',
		image: '/images/2.jpg',
		price: 20_000,
		isDiscount: true,
		oldPrice: 30_000,
	},
	{
		id: 4,
		group: 'coldDrink',
		title: 'نوشابه کوکاکولا',
		image: '/images/1.jpg',
		price: 10_000,
		isDiscount: false,
		oldPrice: null,
	},
	{
		id: 5,
		group: 'edible',
		title: 'کیک تاینی',
		image: '/images/2.jpg',
		price: 5_000,
		isDiscount: false,
		oldPrice: null,
	},
	{
		id: 6,
		group: 'coldFood',
		title: 'اسنک نوتلا',
		image: '/images/3.jpg',
		price: 10_000,
		isDiscount: true,
		oldPrice: 100_000,
	},
	{
		id: 7,
		group: 'hotFood',
		title: 'ساندویچ ماکارانی',
		image: '/images/4.jpg',
		price: 50_000,
		isDiscount: false,
		oldPrice: null,
	},
	{
		id: 8,
		group: 'coldDrink',
		title: 'ماالشعیر جو',
		image: '/images/1.jpg',
		price: 60_000,
		isDiscount: false,
		oldPrice: null,
	},
]

const schools = [
	{ id: 1, name: 'هنرستان جابر ابن حیان', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'محسن کولی', city: 'tehran-teh' },
	{ id: 2, name: 'دبیرستان دولتی جابر', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'رنجبر', city: 'Azerbaijan-bos' },
	{ id: 3, name: 'هنرستان کار دانش جابر ابن حیان', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'طاهری', city: 'Azerbaijan-bos' },
	{
		id: 4, name: 'عجب وضعیتی', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'یوسف جاجیپور',
		city: 'tehran-teh'
	},
	{ id: 6, name: 'هوووووووو', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'مهرزاد چراغی خانقشلاقی', city: 'Azerbaijan-bos' },
	{ id: 7, name: 'هوووووووو', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'مهرزاد چراغی خانقشلاقی', city: 'Azerbaijan-bos' },
	{ id: 8, name: 'هوووووووو', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'مهرزاد چراغی خانقشلاقی', city: 'Azerbaijan-bos' },
	{ id: 9, name: 'هوووووووو', pic: '/images/1.jpg', address: 'تهران خیابان ولیعصر نرسیده به طلقانی کوچه کولیوند پلاک ۱۹۹۴', owner: 'مهرزاد چراغی خانقشلاقی', city: 'Azerbaijan-bos' },
]

const supportedCities = [
	{ state: 'tehran', title: 'تهران', cities: [{ city: 'tehran-teh', title: 'تهران' }, { city: 'karaj-teh', title: 'کرج🤝' }, { city: 'southsoodan-teh', title: 'سودان جنوبی' }] },
	{ state: 'bosnia', title: 'بوستی هرزگوین', cities: [{ city: 'tabriz-bos', title: 'تبریز' }, { city: 'yugoslavia-bos', title: 'یوگوسلاوی' }, { city: 'Azerbaijan-bos', title: 'تورک اوشاخلاری🇦🇿' }] },
]

const breakeTime = [
	{id: 1 , startHour: 9 , startMinutes : 15 , endHour: 9 , endMinutes: 45 , title: 'زنگ اول'} , 
	{id: 2 , startHour: 11 , startMinutes : 0 , endHour: 11 , endMinutes: 30 , title: 'زنگ دوم'} , 
	{id: 3 , startHour: 22 , startMinutes : 30 , endHour: 22 , endMinutes: 40 , title: 'زنگ سوم'} , 
]

export { schools, supportedCities, breakeTime }
export default products;
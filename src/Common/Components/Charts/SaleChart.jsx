import {
	LineChart,
	Line,
	XAxis,
  YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

export default function SaleChart({ data, dataKey, grid }) {
	return (
		<div className='w-full p-5'>
			<ResponsiveContainer width='100%' height='100%' aspect={3.5} >
				<LineChart data={data} >
					{grid && <CartesianGrid stroke='#646464'/>}
					<XAxis dataKey={'name'} stroke='#8884d8' />
          <YAxis stroke='#8884d8' />
					<Line type='monotone' dataKey={dataKey} stroke='#8884d8' />
					<Tooltip stroke='#adadad' />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
